---
sidebar_position: 1
title: SDK Overview
description: The official JavaScript/TypeScript SDK for the Kazuni notifications API
---

# Kazuni SDK

import Version from '@site/src/components/Version';

<Version pkg="sdk" />

The Kazuni SDK (`@kazuni/sdk` on npm) is the official JavaScript/TypeScript client for the Kazuni
notifications API. Kazuni is a unified notifications platform for African businesses - email and
SMS today, with WhatsApp planned. The v1 API surface the SDK talks to covers **transactional
email and SMS sending**.

Construct one `Kazuni` client per API key and reuse it across requests:

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

console.log(result.id, result.status); // "9f2c1a84-...", "queued"
```

## Features

- **Typed end to end** - full TypeScript definitions for every request and response, with JSDoc
  on every exported symbol so your editor's hover/autocomplete doubles as documentation.
- **Two send methods today** - `kazuni.send.email()` and `kazuni.send.sms()`. As Kazuni adds
  WhatsApp support to the API, this SDK will grow a matching method; it does not have one yet.
- **A typed error hierarchy** - every failure, from a bad API key to a network timeout, throws a
  `KazuniError` with a consistent shape. See [Errors](/docs/sdk/errors).
- **Safe-by-default retries** - transient failures are retried with backoff, but a `POST` is only
  ever retried when you opt in with an idempotency key, so the SDK never silently double-sends.
  See [Idempotency and Retries](/docs/sdk/idempotency-and-retries).

## What's not here yet

To keep this documentation honest about the current state of the product:

- No WhatsApp sending. The platform is described as "email and SMS today, WhatsApp next" - next
  means not yet.
- No webhook support in the SDK or the API. Delivery outcomes (sent, bounced, complained) are not
  pushed to your application; see [Sending Email](/docs/sdk/sending-email) for how to check status
  instead.
- No scheduled sends or template rendering in the SDK. Those exist in the
  [Kazuni dashboard](/docs/platform/overview) today, not as SDK methods.
- `send.sms()`, `messages.get()` and `contacts.*` ship in the published package but do not have
  guide pages here yet. The REST endpoints behind them are documented in the
  [API Reference](/docs/sdk/api-reference), and every method carries JSDoc in your editor.
- SMS sends need a sender ID registered for the destination country, the way email needs a
  verified domain. An unregistered sender ID is rejected at send time.

## Next steps

- [Quickstart](/docs/sdk/quickstart) - install the SDK and send your first email
- [Authentication](/docs/sdk/authentication) - live vs. test keys, and where to create one
- [Sending Email](/docs/sdk/sending-email) - the full `send.email()` reference
- [Errors](/docs/sdk/errors) - the `KazuniError` shape and what triggers it
- [Idempotency and Retries](/docs/sdk/idempotency-and-retries) - what gets retried, and when
- [API Reference](/docs/sdk/api-reference) - the raw REST surface, if you're not using the SDK
