---
sidebar_position: 3
title: Authentication
description: Live vs. test API keys, key format, and where to create one
---

# Authentication

Every request to the Kazuni API is authenticated with an API key, sent as a bearer token:

```
Authorization: Bearer cl_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

The SDK handles this header for you - you only need to pass the key to the `Kazuni` constructor:

```typescript
import { Kazuni } from "kazuni";

const kazuni = new Kazuni(process.env.KAZUNI_API_KEY!);
```

## Key format

A Kazuni API key looks like `cl_live_` or `cl_test_` followed by 32 random characters:

```
cl_live_aB3fQ7pKz9mWx2LhY8sT4uJc6NdRoEiV
cl_test_dF6hL2rWx8pQaZ9nMcJb4uYt1SkVoEiG
```

- **`cl_live_...`** keys operate against your organization's live environment. Emails sent with a
  live key are real deliveries.
- **`cl_test_...`** keys operate against your organization's sandbox environment. Use these for
  local development and CI so you don't need a separate account to avoid sending real email while
  testing.

The prefix tells you which mode a key is at a glance - useful when you're staring at a `.env` file
trying to remember which key is which.

## Where to create a key

In the Kazuni dashboard, go to **Settings > API Keys** and choose **Create key**. You'll be asked
for:

- A **name**, so you can tell keys apart later (e.g. "Production backend", "CI tests").
- An **environment** - Live or Test.
- **Permissions** - what the key is allowed to do. To use `kazuni.send.email()`, the key needs the
  **Send email** permission. A key can also be granted read/write access to contacts and read
  access to domains, for other parts of the Kazuni API the dashboard and future SDK versions use -
  this SDK does not call those endpoints yet, so a send-only key is all you need today.

The full key is shown **only once**, immediately after creation. Copy it somewhere safe (a secret
manager, your CI provider's encrypted secrets, a local `.env` file that's gitignored) - if you lose
it, you'll need to revoke it and create a new one. After that first reveal, the dashboard only ever
shows the key's prefix, never the full value.

## Revoking a key

Keys can be revoked from the same **Settings > API Keys** page. Revocation is immediate and
permanent - any request using a revoked key is rejected, and there's no way to un-revoke it. If a
key is compromised, revoke it and issue a new one; there is no way to rotate a key's value in
place.

## Next steps

- [Sending Email](/docs/sdk/sending-email) - what you can do with a send-permission key
- [Errors](/docs/sdk/errors) - what happens when a key is invalid, revoked, or under-permissioned
