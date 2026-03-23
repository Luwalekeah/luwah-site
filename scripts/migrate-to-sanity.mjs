#!/usr/bin/env node

/**
 * One-time migration: push all static posts and projects into Sanity.
 *
 * Usage:  node scripts/migrate-to-sanity.mjs
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * and SANITY_API_TOKEN in .env.local.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env.local ──────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const envFile = readFileSync(envPath, "utf-8");
const env = {};
for (const line of envFile.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [key, ...rest] = trimmed.split("=");
  env[key.trim()] = rest.join("=").trim();
}

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ── Static data (inlined to avoid TS import issues) ──────────────────

const POSTS = [
  {
    slug: "future-of-workflow-automation-2026",
    title: "The Future of Workflow Automation in 2026",
    date: "Nov 20, 2025",
    category: "Automation",
    readTime: "7 min read",
    image: "/images/imaginium-ai-generated-8761977.jpg",
    excerpt: "The automation landscape is shifting fast. Here\u2019s what small businesses should watch for in 2026 \u2014 and how to stay ahead.",
    content: [
      "Workflow automation isn\u2019t new. But the way businesses are adopting it in 2026 is fundamentally different from even two years ago. The tools are cheaper, the integrations are deeper, and the barrier to entry has dropped to nearly zero.",
      "## AI-Native Workflows Are the New Default",
      "The biggest shift is that AI is no longer an add-on \u2014 it\u2019s baked into the workflow itself. Tools like n8n, Make, and even Google Apps Script now support native LLM calls. That means you can build a workflow that doesn\u2019t just move data from point A to point B \u2014 it reads, interprets, and makes decisions along the way.",
      "For small businesses, this changes the game. A staffing firm can have resumes automatically reformatted and anonymized. A property manager can have tenant inquiries triaged by urgency. A marketing agency can have client reports drafted from raw analytics data \u2014 all without a human touching it.",
      "## No-Code and Low-Code Are Converging",
      "The line between no-code and low-code is blurring. Platforms that used to be drag-and-drop only are adding scripting capabilities. And developer-first tools are adding visual builders. The result is a middle ground where someone with basic technical literacy can build surprisingly powerful systems.",
      "n8n is a perfect example. It\u2019s visual enough for non-developers to understand the flow, but powerful enough to run custom JavaScript, make API calls, and handle complex branching logic. This convergence means more businesses can own their automations instead of outsourcing them entirely.",
      "## The Rise of Self-Hosted Automation",
      "Cloud-hosted automation platforms charge per execution, per task, or per workflow. For businesses running automations at scale, those costs add up fast. That\u2019s why self-hosted solutions are gaining traction. Running n8n on your own server \u2014 whether that\u2019s a cloud VM or a Raspberry Pi in your office \u2014 eliminates per-execution costs entirely.",
      "The trade-off is maintenance responsibility, but for businesses with even basic technical support, the cost savings are significant. We\u2019ve seen clients cut their automation costs by 80% or more by moving to self-hosted infrastructure.",
      "## What This Means for Small Businesses",
      "If you\u2019re a small business owner reading this, the takeaway is simple: automation is no longer a luxury reserved for enterprise companies with six-figure budgets. The tools exist today to automate your lead follow-ups, your data entry, your reporting, your client communications \u2014 and most of it can be done for a fraction of what it cost even a year ago.",
      "The question isn\u2019t whether you should automate. It\u2019s what you should automate first.",
    ],
  },
  {
    slug: "ai-chatbots-customer-experience",
    title: "How AI Chatbots Are Redefining Customer Experience",
    date: "Nov 29, 2025",
    category: "AI",
    readTime: "6 min read",
    image: "/images/cdubby-arm-7014655.jpg",
    excerpt: "AI chatbots have moved beyond scripted responses. Here\u2019s how they\u2019re transforming customer support for small businesses.",
    content: [
      "The chatbots of 2020 were frustrating. They followed rigid decision trees, couldn\u2019t handle nuance, and usually ended with \"Let me connect you to a human agent.\" The chatbots of 2026 are a different species entirely.",
      "## Trained on Your Business, Not Generic Data",
      "Modern AI chatbots can be trained on your specific business documentation \u2014 your FAQ, your product catalog, your policies, your past support tickets. That means when a customer asks a question, the chatbot doesn\u2019t give a generic answer. It gives your answer, in your voice, with your specific details.",
      "For a small business, this is transformative. You can provide 24/7 support without hiring a night shift. You can handle the 80% of questions that are repetitive (\"What are your hours?\" \"Do you offer refunds?\" \"How do I book an appointment?\") and only escalate the truly complex issues to a human.",
      "## The Cost Equation Has Flipped",
      "Building a custom chatbot used to require a development team and months of work. Today, you can deploy one in an afternoon using tools like n8n connected to an LLM. The ongoing cost is pennies per conversation \u2014 far less than the salary of a full-time support agent.",
      "We\u2019ve built chatbots for small businesses that handle hundreds of conversations per month at a total cost of under $20. Compare that to the cost of even one part-time employee dedicated to answering the same questions repeatedly.",
      "## Beyond Support: Chatbots as Sales Tools",
      "The most underutilized capability of AI chatbots is lead qualification. A well-built chatbot can ask the right questions, gauge intent, capture contact information, and even book appointments \u2014 all before a human ever gets involved. It\u2019s like having a sales assistant who never sleeps, never takes a break, and never forgets to follow up.",
      "## Getting Started",
      "The best approach is to start with your most common customer questions. Document them, write ideal answers, and use that as training data. Deploy a chatbot on your website or WhatsApp, monitor the conversations for the first week, and refine. Within a month, you\u2019ll wonder how you ever operated without one.",
    ],
  },
  {
    slug: "ai-boosts-lead-generation",
    title: "5 Ways AI Boosts Lead Generation & Outreach",
    date: "Jan 7, 2026",
    category: "Sales",
    readTime: "6 min read",
    image: "/images/geralt-ai-10171006_1920.jpg",
    excerpt: "From automated prospecting to personalized outreach at scale \u2014 five practical ways AI transforms your sales pipeline.",
    content: [
      "Lead generation is one of the most time-consuming parts of running a business. Finding prospects, verifying contact info, writing outreach emails, following up \u2014 it\u2019s a full-time job. AI doesn\u2019t replace the relationship-building part of sales, but it can eliminate the grunt work that precedes it.",
      "## 1. Automated Prospecting",
      "AI-powered scrapers can pull business listings from Google Maps, industry directories, and public records \u2014 then cross-reference them to build enriched lead profiles with owner names, emails, phone numbers, and business details. What used to take a full day of manual research now runs in the background while you focus on closing deals.",
      "## 2. Intelligent Lead Scoring",
      "Not every lead is worth pursuing equally. AI can analyze lead data \u2014 company size, industry, location, engagement history \u2014 and assign a priority score. Your sales team focuses on the leads most likely to convert, instead of working through a list from top to bottom.",
      "## 3. Personalized Outreach at Scale",
      "Generic cold emails get ignored. AI can generate personalized outreach based on each prospect\u2019s business, industry, and pain points. The email reads like it was written specifically for them \u2014 because it was. But instead of spending 10 minutes per email, you generate hundreds in minutes.",
      "## 4. Automated Follow-Up Sequences",
      "Most deals are lost not because of a bad pitch, but because of a missed follow-up. Automated sequences ensure every lead gets a timely, relevant follow-up \u2014 whether it\u2019s a second email, a LinkedIn message, or a text. The system tracks opens, clicks, and replies, and adjusts the sequence accordingly.",
      "## 5. Real-Time Data Enrichment",
      "Lead data decays fast. People change jobs, companies rebrand, phone numbers go stale. AI-powered enrichment tools continuously validate and update your lead database, so you\u2019re never working with outdated information.",
      "## The Bottom Line",
      "AI doesn\u2019t make sales less personal \u2014 it makes it more efficient. You spend less time on research and data entry, and more time on the conversations that actually close deals. That\u2019s the real competitive advantage.",
    ],
  },
  {
    slug: "data-to-decisions-ai-insights",
    title: "From Data to Decisions: How AI Unlocks Business Insights",
    date: "Jan 20, 2026",
    category: "Analytics",
    readTime: "7 min read",
    image: "/images/rawpixel-desk-3139127_1920.jpg",
    excerpt: "You\u2019re sitting on more data than you think. Here\u2019s how AI turns raw numbers into actionable business decisions.",
    content: [
      "Every small business generates data \u2014 sales figures, customer interactions, website analytics, email open rates, inventory levels. The problem isn\u2019t a lack of data. It\u2019s that most of it sits in spreadsheets, dashboards, and inboxes without ever being turned into action.",
      "## The Spreadsheet Trap",
      "Most small businesses run on spreadsheets. And spreadsheets are great \u2014 until they\u2019re not. When your sales data is in one sheet, your expenses in another, your customer feedback in a Google Form, and your website analytics in a separate dashboard, getting a unified view of your business requires manual work that nobody has time for.",
      "AI-powered data processing changes this by connecting your data sources, normalizing the information, and surfacing the patterns you\u2019d miss manually.",
      "## Automated Reporting",
      "Imagine starting every Monday with a report that shows last week\u2019s revenue, top-performing services, customer acquisition cost, and pipeline status \u2014 generated automatically from your existing tools. No analyst required. No manual exports. Just a clean summary delivered to your inbox or Slack.",
      "We build these kinds of automated reports for small businesses using n8n workflows connected to Google Sheets, Stripe, CRMs, and email platforms. The data is already there. It just needs to be collected and presented.",
      "## Sentiment and Trend Analysis",
      "AI can read customer reviews, support tickets, and survey responses to identify trends in sentiment. Are customers increasingly mentioning slow response times? Is a particular service getting more complaints than usual? These signals often appear in the data long before they show up in your revenue numbers.",
      "## Predictive Insights",
      "The next frontier is predictive analytics \u2014 using historical data to forecast future trends. Which customers are at risk of churning? When should you increase inventory? What\u2019s the projected revenue for next quarter based on current pipeline? These aren\u2019t questions reserved for enterprise BI teams anymore. The tools exist for businesses of every size.",
      "## Start Simple",
      "You don\u2019t need a data warehouse to get started. Pick one business question you wish you had a better answer to, identify where the relevant data lives, and build an automated pipeline to answer it. That single insight often pays for the entire automation investment.",
    ],
  },
  {
    slug: "real-roi-ai-automation-small-business",
    title: "The Real ROI of AI Automation for Small Businesses",
    date: "Feb 5, 2026",
    category: "Education",
    readTime: "7 min read",
    image: "/images/rupixen-desk-4505087_1920.jpg",
    excerpt: "Automation isn\u2019t just about saving time. Here\u2019s how to measure the real return on investment for your business.",
    content: [
      "When we talk to small business owners about automation, the first question is almost always: \"What\u2019s the ROI?\" It\u2019s a fair question. Automation has a cost \u2014 consulting time, tool subscriptions, setup effort. The return needs to justify it.",
      "## Time Savings Are Just the Beginning",
      "The most obvious ROI is time saved. If an employee spends 10 hours a week on manual data entry and you automate that to zero, you\u2019ve freed up 10 hours for higher-value work. At $25/hour, that\u2019s $250/week, $13,000/year. Most automations pay for themselves within the first month.",
      "But time savings are just the surface. The deeper ROI comes from things that are harder to quantify but equally important.",
      "## Consistency and Error Reduction",
      "Manual processes have error rates. Someone transposes a number, forgets a follow-up, copies the wrong field. Automations run the same way every time. For a staffing firm processing 100 resumes a week, eliminating formatting errors means fewer rejected submissions and faster placements. That\u2019s revenue impact.",
      "## Speed to Action",
      "When a lead comes in, how fast does your team respond? Studies show that responding within 5 minutes increases conversion rates by 8x compared to responding within an hour. Automated lead capture and notification ensures no inquiry sits unanswered.",
      "## Employee Satisfaction",
      "This one rarely makes it into ROI calculations, but it should. Nobody enjoys manual data entry. Nobody wants to spend their day copying information between systems. Automating tedious work improves job satisfaction, reduces burnout, and helps with retention. The cost of replacing an employee \u2014 recruiting, hiring, training \u2014 is typically 50-200% of their annual salary.",
      "## How We Calculate ROI for Clients",
      "For every project, we map out the current cost of the manual process (time, errors, missed opportunities) and compare it against the automation cost (build + maintain). In our experience, most automations deliver 3-10x ROI within the first year. Some, like our lead generation pipeline, pay for themselves within the first week.",
      "## The Cost of Not Automating",
      "Here\u2019s the ROI metric that gets overlooked: what does it cost to keep doing things manually? As your business grows, manual processes don\u2019t scale. What works for 10 clients breaks down at 50. What one employee can handle becomes a bottleneck at 100. Automation isn\u2019t just about today\u2019s efficiency \u2014 it\u2019s about building the infrastructure for tomorrow\u2019s growth.",
    ],
  },
  {
    slug: "why-your-small-business-needs-automation",
    title: "Why Your Small Business Needs Automation (And Where to Start)",
    date: "Mar 10, 2026",
    category: "Automation",
    readTime: "7 min read",
    image: "/images/imaginium-ai-generated-8761975.jpg",
    excerpt: "Still doing everything manually? Here\u2019s why automation isn\u2019t optional anymore \u2014 and the best place to start.",
    content: [
      "If you\u2019re running a small business in 2026 and you\u2019re still manually entering data, sending follow-up emails one by one, or copying information between apps \u2014 you\u2019re leaving money on the table. Automation isn\u2019t just for enterprise companies anymore. The tools are accessible, the costs are low, and the impact is immediate.",
      "## The Manual Tax",
      "Every manual task in your business carries a hidden cost. It\u2019s not just the time spent doing the task \u2014 it\u2019s the cognitive load of remembering to do it, the errors that creep in when humans do repetitive work, and the opportunity cost of not spending that time on growth activities. We call this the \"manual tax,\" and most small businesses are paying far more of it than they realize.",
      "Think about your week. How many hours do you or your team spend on tasks that follow the same pattern every time? Data entry. Email follow-ups. Report generation. Invoice creation. Appointment reminders. Each of these is a candidate for automation.",
      "## You Don\u2019t Need to Automate Everything",
      "One of the biggest misconceptions about automation is that it\u2019s all or nothing. It\u2019s not. The best approach is to identify the tasks that are high-frequency, low-complexity, and high-impact \u2014 and automate those first.",
      "High-frequency means you do it daily or weekly. Low-complexity means the logic is straightforward (if X happens, do Y). High-impact means it either saves significant time, reduces errors, or directly affects revenue.",
      "## Where to Start: The Top 5 Automations for Small Businesses",
      "**1. Lead capture and notification.** When someone fills out a form on your website, automatically capture their info in a spreadsheet or CRM and send yourself an instant notification. Response time matters \u2014 this alone can increase conversion rates.",
      "**2. Email follow-up sequences.** After a consultation or inquiry, automatically send a series of follow-up emails at timed intervals. No more forgetting to follow up.",
      "**3. Invoice and payment reminders.** Automate the awkward \"just checking in on that invoice\" email. Set it and forget it.",
      "**4. Appointment reminders.** Reduce no-shows by automatically sending SMS or email reminders 24 hours and 1 hour before scheduled appointments.",
      "**5. Weekly reporting.** Pull data from your tools automatically and generate a summary report every Monday morning. Know where your business stands without manual spreadsheet work.",
      "## The First Step",
      "Pick one task. Just one. The one that annoys you most, or the one you forget to do most often. Automate that. See the result. Then do the next one. Automation is a compounding investment \u2014 each workflow you build frees up time and mental space for the next.",
      "Ready to figure out what to automate first? That\u2019s exactly what our [free consultation](/consultation) is for.",
    ],
  },
  {
    slug: "n8n-vs-zapier-honest-comparison",
    title: "n8n vs. Zapier: An Honest Comparison from Someone Who Uses Both",
    date: "Mar 14, 2026",
    category: "Automation",
    readTime: "9 min read",
    image: "/images/thedigitalartist-tech-trends-1674575_1920.jpg",
    excerpt: "Both tools have their place. Here\u2019s an honest breakdown of when to use n8n, when to use Zapier, and why it matters.",
    content: [
      "I use both n8n and Zapier in my consulting practice. I\u2019ve built production workflows on both platforms for real clients. And I\u2019m going to give you the honest comparison that most \"vs\" articles don\u2019t \u2014 because most of them are written by people trying to sell you one or the other.",
      "## Zapier: The Strengths",
      "Zapier is unmatched in ease of use. If you\u2019ve never built an automation before, Zapier is the fastest path from zero to working workflow. The interface is intuitive, the app directory is massive (6,000+ integrations), and the templates library means you can often find a pre-built workflow for your exact use case.",
      "For simple, linear automations \u2014 \"when this happens in App A, do this in App B\" \u2014 Zapier is hard to beat. It\u2019s reliable, well-documented, and the support team is responsive.",
      "## Zapier: The Weaknesses",
      "Zapier\u2019s pricing model is its biggest limitation for growing businesses. You pay per task (each action in a workflow counts), and those costs scale linearly. A workflow that processes 1,000 records a month might cost $50 on Zapier. Scale that to 10,000 records and you\u2019re looking at $200-400/month \u2014 for a single workflow.",
      "Complex logic is also harder on Zapier. Branching, looping, error handling, and custom code are possible but feel bolted on rather than native. If your workflow needs to make decisions, process arrays, or handle edge cases, you\u2019ll hit friction.",
      "## n8n: The Strengths",
      "n8n is where things get interesting for businesses that need more power. It\u2019s open-source, self-hostable, and has no per-execution pricing. You can run it on a $5/month cloud server or a Raspberry Pi and process unlimited workflows.",
      "The visual builder is surprisingly approachable \u2014 not as simple as Zapier, but intuitive enough that non-developers can understand the flow. And when you need power, n8n delivers: custom JavaScript/Python nodes, complex branching, sub-workflows, error handling, and native AI integration.",
      "For our consulting practice, n8n is the default choice for any workflow that involves data transformation, complex logic, or high volume. The resume formatting pipeline we built for a staffing firm runs entirely on n8n \u2014 processing hundreds of documents a week with zero per-execution cost.",
      "## n8n: The Weaknesses",
      "n8n has a steeper learning curve. The documentation is good but not as polished as Zapier\u2019s. The app integration library is smaller (though it covers most major platforms and has an HTTP node for everything else). And if you self-host, you\u2019re responsible for maintenance, updates, and uptime.",
      "## When to Use Which",
      "**Use Zapier when:** you need a simple A-to-B automation, you want zero maintenance overhead, your volume is low (under 1,000 tasks/month), or you need an integration with a niche app that only Zapier supports.",
      "**Use n8n when:** you need complex logic or data transformation, your volume is high, you want to control costs at scale, you need AI/LLM integration in your workflow, or you want full ownership of your automation infrastructure.",
      "## The Real Answer",
      "The best tool is the one that solves your problem reliably. For many small businesses, that\u2019s Zapier for simple workflows and n8n for everything else. We often use both in the same client engagement \u2014 Zapier for quick wins, n8n for the heavy lifting. The goal isn\u2019t tool loyalty. It\u2019s getting the job done.",
    ],
  },
  {
    slug: "automated-resume-formatter-case-study",
    title: "How We Built a Resume Formatter That Saves 20 Hours a Week",
    date: "Mar 18, 2026",
    category: "Case Study",
    readTime: "8 min read",
    image: "/images/pexels-thirdman-5256521.jpg",
    excerpt: "A staffing firm was drowning in manual resume formatting. Here\u2019s how we automated it with n8n and Claude AI.",
    content: [
      "A staffing firm came to us with a problem that\u2019s common in the industry but rarely talked about: resume formatting. Every candidate submission had to be reformatted into the firm\u2019s branded template before being sent to clients. One person was spending 25+ hours a week doing nothing but copying, pasting, and reformatting resumes.",
      "## The Problem",
      "The manual process looked like this: receive a resume (PDF, DOCX, or even plain text), read through it, extract relevant information, remove personally identifiable information (PII) like Social Security numbers and home addresses, restructure the content into the firm\u2019s branded template, and export as a clean DOCX file.",
      "Each resume took 15-20 minutes. With 80-100 resumes per week, one full-time employee was dedicated entirely to this task. It was tedious, error-prone, and a bottleneck in the candidate submission pipeline.",
      "## The Solution",
      "We built an automated pipeline using n8n (self-hosted) and Claude AI that handles the entire process in under 60 seconds per resume.",
      "**Step 1: File Upload Trigger.** Resumes are uploaded to a watched Google Drive folder. n8n detects the new file and kicks off the workflow.",
      "**Step 2: Document Parsing.** The resume is parsed \u2014 whether it\u2019s a PDF, DOCX, or text file \u2014 and the raw content is extracted.",
      "**Step 3: AI Processing.** Claude AI receives the raw content with specific instructions: extract the candidate\u2019s professional experience, education, skills, and certifications. Identify and remove any PII. Restructure the content according to the firm\u2019s template format.",
      "**Step 4: PII Scrubbing.** A dedicated validation step scans the AI output for any remaining PII patterns (SSN formats, full addresses, dates of birth) as a safety net.",
      "**Step 5: Template Generation.** The structured content is injected into a branded DOCX template with the firm\u2019s logo, fonts, and formatting standards.",
      "**Step 6: Output.** The finished resume is saved to an output folder and the team is notified via email.",
      "## The Results",
      "The numbers speak for themselves. Processing time went from 15-20 minutes per resume to under 60 seconds. The employee who was dedicated to formatting was reassigned to candidate sourcing \u2014 a revenue-generating activity. PII compliance improved because the scrubbing is consistent and automated, not dependent on a human catching every instance.",
      "Weekly time savings: 20+ hours. Monthly cost savings: approximately $3,000 in labor reallocation. The automation paid for itself in the first week.",
      "## Lessons Learned",
      "AI is excellent at content extraction and restructuring, but it needs clear instructions. The quality of the output is directly proportional to the quality of the prompt. We iterated on the prompt engineering for about a week before the output consistently matched the firm\u2019s standards.",
      "The PII scrubbing safety net turned out to be essential. AI catches most PII, but having a regex-based validation layer as a backup provides the compliance confidence the firm needed.",
      "Want to see the full project details? Check out the [case study](/work/doyle-group-resume-formatter).",
    ],
  },
  {
    slug: "5-signs-your-business-is-ready-for-automation",
    title: "5 Signs Your Business Is Ready for Automation",
    date: "Mar 22, 2026",
    category: "Education",
    readTime: "6 min read",
    image: "/images/pexels-brett-sayles-2881227.jpg",
    excerpt: "Not sure if automation is right for your business yet? These five signals say yes.",
    content: [
      "Not every business is ready for automation on day one. But there are clear signals that indicate you\u2019ve reached the point where manual processes are holding you back. Here are the five most common signs we see in businesses that are ready to make the leap.",
      "## 1. You\u2019re Doing the Same Task More Than Three Times a Week",
      "If you or your team perform the same sequence of steps \u2014 copy this data here, send this email there, update this spreadsheet \u2014 more than three times a week, it\u2019s a candidate for automation. The rule of three is a good heuristic: if it happens three times, it\u2019ll happen three hundred times. Build the automation now while the process is fresh in your mind.",
      "## 2. You\u2019ve Missed Follow-Ups or Deadlines Because of Manual Processes",
      "Forgetting to follow up with a lead. Missing an invoice payment reminder. Sending a report a day late because you forgot to pull the numbers. If human forgetfulness is causing business impact, automation removes the variable entirely. Automated workflows don\u2019t forget, don\u2019t get busy, and don\u2019t take sick days.",
      "## 3. You\u2019re Spending Money on Tasks That Don\u2019t Require Human Judgment",
      "Data entry. File formatting. Copy/paste between systems. These tasks require attention but not judgment. If you\u2019re paying someone $20-40/hour to do work that a $5/month automation could handle, your labor budget is misallocated. Free your team for the work that actually requires human creativity, empathy, and decision-making.",
      "## 4. Your Business Has Grown But Your Processes Haven\u2019t",
      "This is the most common sign. What worked when you had 10 clients doesn\u2019t work at 50. What one person could manage becomes a bottleneck at scale. If you\u2019re feeling the strain of growth \u2014 more emails, more data, more tasks, same team size \u2014 automation is how you scale your operations without scaling your headcount proportionally.",
      "## 5. You\u2019ve Said \"There Has to Be a Better Way\" More Than Once",
      "Trust that instinct. If a process feels unnecessarily manual, clunky, or fragile, it probably is. The technology to fix it almost certainly exists. The gap is usually awareness \u2014 knowing what\u2019s possible and what it takes to implement. That\u2019s what a [free consultation](/consultation) is for.",
      "## What Comes Next",
      "If two or more of these signs resonate, your business is ready. The next step isn\u2019t to automate everything at once. It\u2019s to identify the single highest-impact automation \u2014 the one that saves the most time or eliminates the most friction \u2014 and start there.",
      "For a deeper dive into where to start, check out our guide: [Why Your Small Business Needs Automation (And Where to Start)](/blog/why-your-small-business-needs-automation).",
    ],
  },
  {
    slug: "small-business-email-deliverability",
    title: "The Small Business Email Problem Nobody Talks About",
    date: "Mar 26, 2026",
    category: "Education",
    readTime: "7 min read",
    image: "/images/pexels-computer-accessories-1841254_1920.jpg",
    excerpt: "Your emails might be going to spam and you don\u2019t even know it. Here\u2019s how to fix it with SPF, DKIM, and DMARC.",
    content: [
      "Here\u2019s a scenario that plays out every day: a small business owner sends an important email \u2014 a proposal, an invoice, a follow-up to a hot lead \u2014 and it lands in the recipient\u2019s spam folder. The recipient never sees it. The business owner assumes they were ignored. The deal dies quietly.",
      "Email deliverability is one of the most overlooked infrastructure problems in small business. And the fix isn\u2019t complicated \u2014 it just requires understanding three acronyms: SPF, DKIM, and DMARC.",
      "## Why Your Emails Go to Spam",
      "Email providers like Gmail, Outlook, and Yahoo use authentication protocols to verify that an email actually came from the domain it claims to come from. Without proper authentication, your emails look suspicious \u2014 even if they\u2019re completely legitimate.",
      "If you\u2019re sending emails from yourname@yourdomain.com but your domain\u2019s DNS doesn\u2019t have the right records, email providers have no way to verify that the email is really from you. So they err on the side of caution and flag it as potential spam.",
      "## SPF: Who\u2019s Allowed to Send",
      "SPF (Sender Policy Framework) is a DNS record that tells email providers which servers are authorized to send email on behalf of your domain. Without it, anyone could send an email pretending to be you \u2014 and email providers know that.",
      "Setting up SPF is as simple as adding a TXT record to your domain\u2019s DNS. If you use Google Workspace, the record includes Google\u2019s mail servers. If you use multiple email services (your website\u2019s contact form, a marketing platform, a CRM), each one needs to be included in your SPF record.",
      "## DKIM: Proving the Email Wasn\u2019t Tampered With",
      "DKIM (DomainKeys Identified Mail) adds a digital signature to every email you send. The receiving server checks this signature against a public key published in your DNS. If the signature matches, the email is verified as authentic and unaltered.",
      "Most email providers generate DKIM keys for you \u2014 you just need to add the corresponding DNS records. It takes about 5 minutes per service.",
      "## DMARC: What to Do When Authentication Fails",
      "DMARC (Domain-based Message Authentication, Reporting, and Conformance) ties SPF and DKIM together and tells email providers what to do when an email fails authentication. Should it be quarantined? Rejected? DMARC also sends you reports so you can see who\u2019s trying to send email as your domain.",
      "A basic DMARC policy is another DNS TXT record. Start with a monitoring policy (p=none) to see what\u2019s happening, then tighten it to quarantine or reject as you gain confidence.",
      "## The Business Impact",
      "Proper email authentication doesn\u2019t just prevent spam classification \u2014 it builds your domain\u2019s reputation over time. Email providers track sender reputation, and domains with consistent SPF, DKIM, and DMARC records earn higher trust scores. Your emails land in inboxes, not spam folders.",
      "We\u2019ve helped clients go from a 60% inbox placement rate to 95%+ just by configuring these three records. No new email platform. No expensive tools. Just DNS records that should have been set up from day one.",
      "## Get It Fixed",
      "If you\u2019re not sure whether your domain has proper email authentication, check it. Tools like MXToolbox and Google\u2019s Check MX can audit your DNS records in seconds. If you need help setting it up, that\u2019s one of the services we offer \u2014 check our [services page](/services) for details.",
    ],
  },
];

const PROJECTS = [
  {
    slug: "eloquence-wax-skin",
    category: "Web Design & Infrastructure",
    title: "Full Digital Presence for a Premium Waxing & Skincare Studio",
    description: "Custom Next.js website, business email, self-hosted link hub, and Cloudflare infrastructure \u2014 delivered end-to-end for a beauty brand launching from scratch.",
    image: "/images/pexels-sejio402-6704970.jpg",
    client: "Kany Kante \u2014 Eloquence Wax & Skin",
    location: "Arvada, Colorado",
    industry: "Beauty & Wellness \u2014 Waxing, Facials, Intimate Care",
    completed: "2026",
    metrics: [{ value: "Sub-second", label: "Load time" }, { value: "$0/mo", label: "Email cost" }, { value: "~150ms", label: "LinkStack TTFB" }],
    overview: "Eloquence Wax & Skin is a premium waxing and skincare studio offering hair removal, facial treatments, and intimate care services. The client needed a complete digital presence built from scratch \u2014 a professional website, business email, a link-in-bio page for social media, and reliable hosting infrastructure to support her growing clientele. Luwah Technologies delivered a full end-to-end solution: from domain and DNS configuration to a custom-built website, self-hosted link management, and secure cloud-based infrastructure.",
    challenge: ["A professional website that reflected her brand\u2019s warm, elevated aesthetic", "A business email address to communicate with clients professionally", "A central link hub for social media profiles and booking", "A reliable, cost-effective hosting solution that she could own and control"],
    solution: ["Custom website built with Next.js 16, Tailwind CSS v4, and Framer Motion \u2014 featuring animated hero, services pages, bundles, gallery, FAQ, booking integration, and legal pages", "Business email (info@eloquencewaxskin.com) configured through Cloudflare Email Routing at zero cost", "Self-hosted LinkStack instance on Raspberry Pi 5 running Proxmox, containerized with Docker and MariaDB, exposed via Cloudflare Tunnel", "Full DNS management through Cloudflare with SSL/TLS encryption, cache rules, and security headers"],
    technologies: ["Next.js 16", "Tailwind CSS v4", "Framer Motion", "Docker", "MariaDB", "LinkStack", "Cloudflare DNS, Tunnel, Email Routing", "Render", "Proxmox", "Raspberry Pi 5"],
  },
  {
    slug: "denver-racquet-club-gmail-automation",
    category: "Operations",
    title: "Gmail to Google Sheets: A Racquet Club\u2019s Contact Forms on Autopilot",
    description: "A native Google Apps Script pipeline that monitors Gmail for Wix form submissions, parses contact fields, flags profanity, and analyzes sentiment \u2014 twice daily, zero dependencies.",
    image: "/images/pexels-brett-sayles-4520560.jpg",
    client: "Sean Naegeli \u2014 Denver Racquet Club",
    location: "Denver, Colorado",
    industry: "Sports & Recreation",
    completed: "2026",
    metrics: [{ value: "2x/day", label: "Auto-runs" }, { value: "0", label: "Manual entry" }, { value: "100%", label: "Native Google" }],
    overview: "Denver Racquet Club needed a way to automatically capture website contact form submissions arriving via Gmail and store them in a structured Google Sheet \u2014 eliminating manual copy/paste data entry. The request was to use Google Apps Script only (no third-party tools, no n8n, no Zapier) to keep it native to the Google ecosystem with zero external dependencies.",
    challenge: ["Manual copy/paste of contact form submissions from Gmail into spreadsheets", "No visibility into message sentiment or urgency", "No profanity detection for incoming messages", "Requirement to stay fully within the Google ecosystem \u2014 no third-party tools"],
    solution: ["Automated Gmail monitoring with label-based query filtering and duplicate prevention", "Field parsing from Wix form emails \u2014 First Name, Last Name, Email, Phone, Message", "Profanity detection with punctuation-aware regex boundaries to avoid false positives", "Sentiment analysis with priority levels (HIGH / MEDIUM / LOW / Neutral) and color-coded rows", "Execution logging to a dedicated Log tab with timestamped status entries", "Runs automatically at 7:00 AM and 7:00 PM daily via time-based triggers", "Auto-built Sentiment Reference sheet for staff training"],
    technologies: ["Google Apps Script", "Gmail API", "Google Sheets", "PropertiesService", "Regex-based NLP"],
  },
  {
    slug: "automated-lead-generation-pipeline",
    category: "Sales & Marketing",
    title: "How I Turned Google Maps Into a Statewide Sales Machine",
    description: "An automated pipeline scrapes emails, pulls owner names from public records, and exports ready-to-contact leads \u2014 90% faster.",
    image: "/images/geralt-ai-10171006_1920.jpg",
    completed: "2025",
    metrics: [{ value: "60%", label: "Hours saved" }, { value: "Daily", label: "Automated outreach" }, { value: "90%", label: "Faster sourcing" }],
    overview: "Small businesses spend hours manually searching for leads on Google Maps, copying contact info, and cross-referencing public records. This automation replaced that entire workflow with a pipeline that scrapes business listings, enriches them with owner names and emails from public records, and exports structured lead sheets ready for outreach.",
    challenge: ["Manual lead research taking a full day per batch", "Inconsistent data quality from manual copy-paste", "No enrichment \u2014 missing owner names, emails, and phone numbers", "Outreach delayed by slow lead sourcing"],
    solution: ["Automated Google Maps scraping for business listings by category and location", "Public records cross-referencing for owner names and contact details", "Email and phone number extraction and validation", "Structured CSV export with pre-enriched, ready-to-contact leads", "Daily automated runs to keep the pipeline fresh"],
    technologies: ["Python", "Selenium", "BeautifulSoup", "Google Maps API", "CSV/Excel export"],
  },
  {
    slug: "doyle-group-resume-formatter",
    category: "Staffing & Operations",
    title: "Automated Resume Formatting Saves a Staffing Firm 20+ Hours a Week",
    description: "n8n + Claude AI pipeline: resumes upload, PII is scrubbed, content restructures into branded DOCX templates \u2014 in under 60 seconds.",
    image: "/images/pexels-thirdman-5256521.jpg",
    completed: "2025",
    metrics: [{ value: "<60s", label: "Per resume" }, { value: "20+ hrs", label: "Saved weekly" }, { value: "100%", label: "PII scrubbed" }],
    overview: "A staffing firm was spending 20+ hours per week manually reformatting candidate resumes into their branded template. Each resume required reading the original, extracting relevant information, scrubbing personal identifiable information, and rebuilding the content in a Word document. This automation reduced that process to under 60 seconds per resume.",
    challenge: ["20+ hours per week spent manually reformatting resumes", "Inconsistent formatting across team members", "PII compliance risk from manual handling", "Bottleneck in candidate submission pipeline"],
    solution: ["n8n workflow triggered by file upload to a watched folder", "Claude AI extracts and restructures resume content into standardized sections", "Automated PII scrubbing \u2014 removes SSN, address, date of birth", "Branded DOCX template generation with consistent formatting", "Processed resumes delivered to output folder, ready for submission"],
    technologies: ["n8n", "Claude AI", "Node.js", "DOCX templating", "File system triggers"],
  },
  {
    slug: "automated-community-messaging",
    category: "Communications",
    title: "This iPhone Automation Runs a Chess Club (Without the Organizer)",
    description: "An Apple Shortcut reads the schedule, writes personalized messages, and posts to WhatsApp. Zero cost. 100% hands-free.",
    image: "/images/pexels-computer-accessories-1841254_1920.jpg",
    completed: "2025",
    metrics: [{ value: "100%", label: "Consistency" }, { value: "0", label: "Manual effort" }, { value: "$0", label: "Total cost" }],
    overview: "A chess club organizer was manually writing and sending daily WhatsApp messages to coordinate meeting times, locations, and attendance. The messages needed to be personalized based on the day\u2019s schedule. This automation eliminated all manual effort using only native Apple tools \u2014 no subscriptions, no third-party apps.",
    challenge: ["Daily manual message writing and sending", "Messages needed to vary based on the day\u2019s schedule", "Organizer unavailability caused missed communications", "No budget for third-party automation tools"],
    solution: ["Apple Shortcut that reads a schedule spreadsheet to determine the day\u2019s event details", "Dynamic message composition with personalized content based on schedule data", "Automated posting to WhatsApp group \u2014 no manual intervention required", "Runs daily whether the organizer is at their desk, on vacation, or asleep"],
    technologies: ["Apple Shortcuts", "iCloud Spreadsheet", "WhatsApp", "iOS Automation"],
  },
  {
    slug: "zero-cost-business-infrastructure",
    category: "Operations",
    title: "I Got Quoted $600 for a Website. I Built One in 3 Days for $0.",
    description: "Deployed a fully branded landing page with legal docs, contact forms, and a resource hub \u2014 all self-hosted, zero monthly fees.",
    image: "/images/rupixen-desk-4505087_1920.jpg",
    completed: "2025",
    metrics: [{ value: "$0/mo", label: "Recurring costs" }, { value: "100%", label: "Ownership" }, { value: "3 days", label: "Time to launch" }],
    overview: "After being quoted $600 for a basic business website, the decision was made to build one in-house. The result was a fully branded landing page with legal documentation, contact forms, and a resource hub \u2014 deployed and self-hosted with zero monthly fees and complete ownership of the code and infrastructure.",
    challenge: ["High cost quotes from web agencies for a simple business site", "Need for legal pages, contact forms, and a resource hub", "Desire for full ownership with no recurring platform fees", "Tight timeline \u2014 needed to launch quickly"],
    solution: ["Custom-built landing page with modern design and responsive layout", "Legal documentation pages (Terms & Conditions, Privacy Policy)", "Integrated contact form with email delivery", "Resource hub for client materials and documentation", "Self-hosted deployment with zero monthly recurring costs"],
    technologies: ["Next.js", "Tailwind CSS", "Cloudflare", "Self-hosted infrastructure"],
  },
  {
    slug: "self-hosted-cloud-storage",
    category: "Cloud & Backup",
    title: "I Canceled iCloud, Google Drive, and Arlo \u2014 Here\u2019s What Replaced Them",
    description: "Photos, files, and security footage on my own server with full 3-2-1 backups. $40+/month gone.",
    image: "/images/pexels-brett-sayles-2881227.jpg",
    completed: "2025",
    metrics: [{ value: "85%", label: "Cost reduction" }, { value: "3-2-1", label: "Backup redundancy" }, { value: "$40+/mo", label: "Subscriptions canceled" }],
    overview: "Three paid cloud subscriptions \u2014 iCloud, Google Drive, and Arlo camera storage \u2014 were replaced with a self-hosted solution running on personal hardware. Photos, files, and security footage now live on a private server with full 3-2-1 backup redundancy, eliminating over $40/month in recurring fees while maintaining complete data ownership and privacy.",
    challenge: ["Over $40/month in cloud storage subscriptions", "Data spread across multiple providers with no unified access", "Privacy concerns \u2014 personal photos and footage stored on third-party servers", "No control over data retention policies or AI training usage"],
    solution: ["Centralized file and photo storage on self-hosted infrastructure", "Security camera footage stored locally with remote access", "Full 3-2-1 backup strategy \u2014 local, offsite, and cloud cold storage", "Unified access across all devices with private sync"],
    technologies: ["Proxmox", "Nextcloud", "Frigate NVR", "Raspberry Pi", "Cloudflare Tunnel", "Backblaze B2"],
  },
];

// ── Migration ────────────────────────────────────────────────────────

async function migrate() {
  const transaction = client.transaction();

  console.log(`Migrating ${POSTS.length} posts...`);
  for (const post of POSTS) {
    const doc = {
      _id: `post-${post.slug}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      date: post.date,
      category: post.category,
      readTime: post.readTime,
      // Store image path as a string field — images are local, not Sanity assets
      image: post.image,
      excerpt: post.excerpt,
      content: post.content,
    };
    transaction.createOrReplace(doc);
  }

  console.log(`Migrating ${PROJECTS.length} projects...`);
  for (const project of PROJECTS) {
    const doc = {
      _id: `project-${project.slug}`,
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      category: project.category,
      description: project.description,
      image: project.image,
      client: project.client || "",
      location: project.location || "",
      industry: project.industry || "",
      completed: project.completed || "",
      metrics: (project.metrics || []).map((m, i) => ({
        _key: `metric-${i}`,
        value: m.value,
        label: m.label,
      })),
      overview: project.overview || "",
      challenge: project.challenge || [],
      solution: project.solution || [],
      technologies: project.technologies || [],
    };
    transaction.createOrReplace(doc);
  }

  console.log("Committing transaction...");
  const result = await transaction.commit();
  console.log(`Done! ${result.documentIds.length} documents created/updated.`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
