# n8n AI Blog Pipeline

Goal: one AI-written tech article per week, reviewed and approved by you before
it appears on the site. Nothing publishes without your sign-off.

## How the approval works

The site already uses Sanity for blog posts. Sanity has a built-in draft state.
A document with an id like `drafts.post-xyz` is a draft and is invisible to the
public site. When you press **Publish** in Studio, Sanity promotes it to the
published id `post-xyz` and it goes live. We use that, so no custom approval
flow is needed.

```
n8n (weekly cron)
  -> pick a topic (tech news of the week)
  -> generate the article with the Claude API
  -> create a DRAFT post in Sanity (drafts.<id>)
  -> notify you (email / Slack) that a draft is ready
        |
        v
You open Studio -> read the draft -> edit if needed -> Publish (or delete)
        |
        v
Sanity webhook -> POST /api/revalidate -> /blog and /blog/<slug> refresh
        |
        v
Article is live
```

## Prerequisite (done in code)

The public read client now uses `perspective: "published"` in
[src/lib/sanity.ts](../src/lib/sanity.ts). Without this, drafts would leak onto
the live site and defeat the whole point of vetting. Do not remove it.

## n8n workflow

Nodes, in order:

1. **Schedule Trigger** — weekly, e.g. Monday 07:00.
2. **Topic source** (pick one):
   - An RSS Read node over a few tech feeds (The Verge, Ars Technica, Hacker
     News front page RSS), then pick the top item, or
   - An HTTP node hitting a news API, or
   - A static list you rotate through.
3. **Claude API** (HTTP Request node) — generate the article. See the prompt
   below. Model: `claude-opus-4-8` for best quality, or `claude-sonnet-4-6`
   for cheaper runs.
4. **Function node** — shape the Claude output into the Sanity post fields
   (slug, date, excerpt, content array). See "Post fields".
5. **HTTP Request to Sanity** — create the draft (see "Create the draft").
6. **Notify** — Gmail or Slack node: "New blog draft ready for review:
   <title>. Open Studio to approve."

## Create the draft in Sanity

Sanity mutation endpoint:

```
POST https://<projectId>.api.sanity.io/v2024-01-01/data/mutate/<dataset>
Authorization: Bearer <SANITY_WRITE_TOKEN>
Content-Type: application/json
```

Body (the `drafts.` prefix is what makes it a draft):

```json
{
  "mutations": [
    {
      "create": {
        "_id": "drafts.post-{{ $json.slug }}",
        "_type": "post",
        "title": "{{ $json.title }}",
        "slug": { "_type": "slug", "current": "{{ $json.slug }}" },
        "date": "{{ $json.date }}",
        "category": "{{ $json.category }}",
        "readTime": "{{ $json.readTime }}",
        "excerpt": "{{ $json.excerpt }}",
        "content": {{ $json.contentJsonArray }}
      }
    }
  ]
}
```

Use a Sanity token with **Editor** (write) scope. Store it as an n8n credential,
never in the workflow JSON.

## Post fields

The `post` schema is in [src/sanity/schemas/post.ts](../src/sanity/schemas/post.ts).
Populate:

- `title` — string.
- `slug.current` — kebab-case, derived from the title. Keep it stable.
- `date` — display string like `"Jun 18, 2026"`.
- `category` — one of: Automation, AI, Integration, Infrastructure, Strategy,
  Sales, Analytics, Education, Case Study.
- `readTime` — e.g. `"6 min read"`. Estimate at ~200 words/min.
- `excerpt` — 1 to 2 sentence summary.
- `content` — an **array of strings**. Each item is a paragraph, or a markdown
  heading like `"## Section title"`. Have Claude return this as a JSON array so
  the Function node can pass it straight through.
- `image` — optional. A `/images/...` path or an external URL. Leave blank and
  add one in Studio during review if you want a specific image.

## Revalidation

Already wired. The Sanity webhook fires on publish and calls `/api/revalidate`,
which refreshes `/blog` and `/blog/<slug>`. Confirm the webhook filter includes
`post`:

```
_type in ["siteSettings", "webCatalog", "post", "project"]
```

No n8n step is needed for revalidation. Publishing in Studio is the trigger.

## Sample Claude prompt

```
You are writing a blog post for Luwah Technologies, a small-business automation
and web consultancy. Audience: small business owners, non-technical. Tone:
clear, practical, no hype. No em dashes. Short sentences.

Topic: {{ topic }}

Write a 600 to 900 word post that explains what happened, why a small business
owner should care, and one concrete action they could take. Avoid jargon.

Return ONLY valid JSON in this exact shape:
{
  "title": "string, under 70 chars",
  "slug": "kebab-case-of-title",
  "category": "one of: Automation, AI, Integration, Infrastructure, Strategy, Sales, Analytics, Education",
  "readTime": "N min read",
  "excerpt": "1-2 sentence summary",
  "content": ["paragraph or '## heading' string", "..."]
}
```

Parse that JSON in the Function node. Reject and retry if it does not parse.

## Security and quality notes

- The write token lives only in n8n credentials. If it leaks, anyone can write
  to your dataset. Rotate it if exposed.
- Drafts never reach the public site because of the published perspective. Test
  this once: create a draft, confirm it is NOT on `/blog`, then publish and
  confirm it appears.
- Always read the draft before publishing. AI can get facts, dates, and company
  names wrong. You are the editor.
- Keep one category per post so the blog filters stay clean.
- If you want a second pair of eyes, add a step where Claude critiques its own
  draft for accuracy before you review.

## Going live checklist

1. Sanity Editor token created and stored in n8n.
2. Workflow built with the nodes above.
3. Run once manually. Confirm a draft appears in Studio under Blog Posts.
4. Confirm the draft is NOT visible on the live `/blog`.
5. Publish it. Confirm it appears on `/blog` within a minute.
6. Enable the weekly schedule.
