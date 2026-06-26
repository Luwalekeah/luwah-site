# Automation

Runbooks for the automations that feed the Luwah Technologies site.

- [n8n-ai-blog.md](n8n-ai-blog.md) — weekly AI-written blog posts, human-vetted in Sanity before they go live.
- [n8n-web-forms.md](n8n-web-forms.md) — order, intake, and review submissions to MySQL (+ customer confirmations). Flow: [n8n-web-forms.json](n8n-web-forms.json).
- `Resend _ Website to Email Contact.json` — live contact/consultation flow (customer confirmation + DB). Business notification removed; the app sends that now.

These are operational docs. They describe how the n8n workflows talk to the
site and to Sanity. No secrets live here. Store all tokens in n8n credentials.
