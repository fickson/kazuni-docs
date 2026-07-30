---
sidebar_position: 2
title: Quickstart
description: Install the Kazuni SDK and send your first email
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quickstart

## 1. Install the SDK

```bash
pnpm add @kazuni/sdk
```

```bash
npm i @kazuni/sdk
# or
yarn add @kazuni/sdk
```

## 2. Verify a sending domain

Before you can send, the `from` address must be on a domain you've verified with Kazuni. Do this
once, in the dashboard - see [Sending Domains](/docs/platform/sending-domains) for the full walk
through, including what the DNS records look like and how long they take to propagate.

## 3. Create an API key

In the Kazuni dashboard, go to **Settings > API Keys** and create a key with the **Send email**
permission. The full key is shown once, at creation - copy it somewhere safe. See
[Authentication](/docs/sdk/authentication) for the difference between live and test keys.

## 4. Send an email

<Tabs groupId="client">
<TabItem value="sdk" label="TypeScript">

```typescript
import { Kazuni } from "@kazuni/sdk";

const kazuni = new Kazuni(process.env.KAZUNI_API_KEY!);

const result = await kazuni.send.email({
  from: "Acme <hello@acme.example>",
  to: "customer@example.com",
  subject: "Welcome to Acme",
  html: "<p>Thanks for signing up.</p>",
  text: "Thanks for signing up.",
});

console.log(result.id, result.status); // "email_...", "queued"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://api.usekazuni.com/v1/emails/send \
  -H "Authorization: Bearer $KAZUNI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Acme <hello@acme.example>",
    "to": "customer@example.com",
    "subject": "Welcome to Acme",
    "html": "<p>Thanks for signing up.</p>",
    "text": "Thanks for signing up."
  }'
```

```json
{ "id": "3fa2e4c1-...", "status": "queued" }
```

</TabItem>
</Tabs>

`to` accepts exactly one recipient address per call. A `202` from the API, or a resolved promise
from the SDK, means Kazuni **accepted** the email for delivery, not that it has been delivered - see
[Sending Email](/docs/sdk/sending-email) for what `status: "queued"` does and doesn't mean.

## 5. Handle failures

Every failed request throws a `KazuniError`:

```typescript
import { Kazuni, KazuniError } from "@kazuni/sdk";

try {
  await kazuni.send.email({
    from: "hello@acme.example",
    to: "not-an-email",
    subject: "Hi",
    html: "<p>Hi</p>",
  });
} catch (error) {
  if (error instanceof KazuniError) {
    console.error(error.message, error.status, error.code, error.requestId);
  }
}
```

See [Errors](/docs/sdk/errors) for the full field reference and what triggers each status code.

## Next steps

- [Authentication](/docs/sdk/authentication) - live vs. test keys, and key format
- [Sending Email](/docs/sdk/sending-email) - the full `send.email()` reference
- [Idempotency and Retries](/docs/sdk/idempotency-and-retries) - making retries safe
- [API Reference](/docs/sdk/api-reference) - the raw REST surface
