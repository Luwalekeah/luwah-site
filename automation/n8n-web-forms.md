# n8n Web Forms Flow (Orders, Intakes, Reviews)

Handles the three web forms that post to `N8N_WEB_WEBHOOK_URL`: `/order`,
`/intake`, and `/review`. It mirrors your contact flow: verify the HMAC
signature, switch on `form_type`, insert into MySQL, and (for orders and
intakes) send the customer a Resend confirmation. Reviews are DB-only, because
the review form does not collect an email.

File: [n8n-web-forms.json](n8n-web-forms.json) — import it into n8n.

The app already emails you (the business) and stores everything in Sanity, so
this flow deliberately has no "Notify Daniel" node.

## Setup

1. Import `n8n-web-forms.json` into n8n.
2. It reuses your existing credentials by id: MySQL, Resend. Confirm they map.
3. The webhook path is `web-submissions`. Set `N8N_WEB_WEBHOOK_URL` in Render to
   the production URL n8n gives you, e.g.
   `https://api.luwahtechnologies.com/webhook/web-submissions`.
4. Create the three tables below.
5. Review each node in the n8n UI, then activate the workflow.

## Create the tables

The INSERT queries expect these columns. Adjust types to your preference.

```sql
CREATE TABLE web_orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  submission_id VARCHAR(64),
  created_at DATETIME,
  full_name VARCHAR(200),
  email VARCHAR(200),
  phone VARCHAR(50),
  business_name VARCHAR(200),
  tier VARCHAR(100),
  addons TEXT,
  extra_pages INT,
  support_plan VARCHAR(100),
  estimated_total INT,
  has_variable_items TINYINT,
  notes TEXT,
  ip_hash VARCHAR(64)
);

CREATE TABLE build_intakes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  submission_id VARCHAR(64),
  created_at DATETIME,
  business_name VARCHAR(200),
  contact_name VARCHAR(200),
  email VARCHAR(200),
  phone VARCHAR(50),
  industry VARCHAR(200),
  tier VARCHAR(100),
  timeline VARCHAR(100),
  budget VARCHAR(100),
  mission TEXT,
  target_audience TEXT,
  pages TEXT,
  ip_hash VARCHAR(64)
);

CREATE TABLE reviews (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  created_at DATETIME,
  reviewer_name VARCHAR(200),
  company VARCHAR(200),
  role VARCHAR(200),
  overall DECIMAL(2,1),
  communication TINYINT,
  expertise TINYINT,
  timeliness TINYINT,
  value_rating TINYINT,
  recommend TINYINT,
  quote TEXT,
  ip_hash VARCHAR(64)
);
```

## Payloads (what the site sends)

All arrive under `body` with a `form_type` discriminator and an
`X-Webhook-Signature` HMAC header (same scheme as the contact flow).

- **web-order:** `submission_id, fullName, email, phone, businessName, tierName,
  addonKeys[], extraPages, supportPlanKey, estimatedTotal, hasVariableItems,
  notes, metadata{submitted_at, ip_hash}`
- **build-intake:** `submissionId, businessName, contactName, email, phone,
  industry, tier, timeline, budget, mission, targetAudience, pages[], …, ipHash,
  submittedAt`
- **review:** `reviewerName, company, role, quote, overall,
  ratings{communication, expertise, timeliness, value, recommend},
  metadata{submitted_at, ip_hash}`

## Notes and things to verify

- The HMAC verify chain (Crypto + Verify Signature) is copied from your contact
  flow. Confirm it validates against the same `WEBHOOK_HMAC_SECRET`. The app
  signs `JSON.stringify(payload)`.
- The Resend confirmations for orders and intakes use a short branded template.
  Edit the copy in the "Confirm web-order" and "Confirm build-intake" nodes.
- This flow does not include the OneDrive Excel append or the execution log. Add
  those from your contact flow if you want them.
- The INSERT column lists are a starting point. Match them to your final table
  schema before activating.
