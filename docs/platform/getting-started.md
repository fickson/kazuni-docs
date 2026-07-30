---
sidebar_position: 2
title: Getting Started
description: Set up your Kazuni account and send your first email
---

# Getting Started

This is the shortest path from a new Kazuni account to a delivered email. It touches every part of
the dashboard once; each step links to a fuller guide if you need more detail.

## 1. Create your account and organization

Sign up at [usekazuni.com](https://usekazuni.com). Everything in Kazuni - domains, contacts, templates,
campaigns, API keys - belongs to an organization, so you'll create one as part of sign-up.

## 2. Verify a sending domain

Go to **Domains** and add the domain (or subdomain) you want to send from. You'll be given a set
of DNS records to add wherever that domain's DNS is managed. Verification typically completes
within an hour of adding the records correctly.

This step is usually the one that needs a technical colleague's help, and it's worth doing early
since it can't be rushed - see [Sending Domains](/docs/platform/sending-domains) for the full guide,
written so you can hand it directly to whoever manages your DNS.

## 3. Decide how you'll send

- **From the dashboard** - build a [template](/docs/platform/templates), add
  [contacts](/docs/platform/contacts), and send a [campaign](/docs/platform/campaigns). No code
  required.
- **From your code** - create an API key (next step) and use the
  [SDK](/docs/sdk/overview) to send transactional email, like password resets or order
  confirmations, directly from your application.

Most organizations end up doing both: campaigns from the dashboard, transactional sends from code.

## 4. Create an API key (for programmatic sending)

If you're sending from code, go to **Settings > API Keys** and create a key with the **Send
email** permission. Use a `cl_test_...` key while you're developing, and a `cl_live_...` key in
production. The full key is shown once - copy it into your secrets manager or environment
configuration immediately. See [Authentication](/docs/sdk/authentication) for the full key
lifecycle.

## 5. Send your first email

With the SDK:

```typescript
import { Kazuni } from "@kazuni/sdk";

const kazuni = new Kazuni(process.env.KAZUNI_API_KEY!);

await kazuni.send.email({
  from: "Acme <hello@acme.example>",
  to: "you@example.com",
  subject: "Hello from Kazuni",
  html: "<p>It works.</p>",
});
```

Or from the dashboard, build a campaign and send it to a small test list first.

## 6. Watch what happens

Go to **Delivery** (or the dashboard home) to see the send move from queued to sent to delivered -
or to see it bounce or fail, with a reason. See [Delivery](/docs/platform/delivery) for what each
status means.

## Next steps

- [Sending Domains](/docs/platform/sending-domains) - the full DNS/DKIM walkthrough
- [SDK Quickstart](/docs/sdk/quickstart) - sending from code, step by step
