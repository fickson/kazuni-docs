---
sidebar_position: 6
title: Idempotency and Retries
description: What the SDK retries automatically, and how to make POST requests safe to retry
---

# Idempotency and Retries

The SDK retries some failures automatically. The rule that matters most: **a `POST` request, like
`send.email()`, is only retried if you opt in with an idempotency key.** This is deliberate - the
SDK never wants to silently send the same email twice just because a response was slow to arrive.

## What gets retried

| Method | Retried automatically? |
|---|---|
| `GET` requests | Yes, always. |
| `POST` requests (e.g. `send.email()`) | Only when you pass `idempotencyKey`. |

A retry is attempted on:

- A network failure (the request never got a response).
- A `429` (rate limited) response.
- A `5xx` (server error) response.

A `4xx` response other than `429` (bad request, invalid key, forbidden, not found) is **never**
retried - retrying a request that's wrong won't make it right.

## Opting in with an idempotency key

```typescript
await kazuni.send.email(
  {
    from: "hello@acme.example",
    to: "customer@example.com",
    subject: "Hi",
    html: "<p>Hi</p>",
  },
  { idempotencyKey: `welcome-email-${userId}` },
);
```

Use a value that's unique per logical send and stable across retries of that same send - for
example, a value derived from the user id and the type of email, not a random value generated
fresh on every call (that would defeat the purpose).

### What this guarantees today - and what it doesn't yet

The SDK sends `idempotencyKey` as an `Idempotency-Key` header on every retry attempt. Today, the
Kazuni API does not use that header to deduplicate requests server-side - there's no
request-level dedup yet. In practice, this still makes retries meaningfully safer for the failure
modes an idempotency key is meant to cover: rate limiting and timeouts before a response was ever
received, where the original request most likely wasn't processed. What it does **not** yet
guarantee is protection against the request having actually reached the server and been processed,
with only the response getting lost - in that specific case, a retry today could still result in a
second send. Passing an `idempotencyKey` costs nothing and future-proofs your calls for when the
API adds server-side dedup; it isn't a complete guarantee yet.

If you can't tolerate any risk of a duplicate send, don't rely on automatic retries for `send.email()`
- catch the error, and decide for yourself whether to resend based on your own knowledge of whether
the original attempt likely succeeded.

## Backoff and Retry-After

Retries use exponential backoff with jitter, starting at 250ms and doubling each attempt. If the
API responds with a `Retry-After` header (either seconds or an HTTP date), the SDK waits that long
instead of using its own backoff calculation.

## Configuring retry count

```typescript
const kazuni = new Kazuni({
  apiKey: process.env.KAZUNI_API_KEY!,
  maxRetries: 3, // default is 2 (so 3 total attempts by default: the original plus 2 retries)
});
```

## Timeouts

Each request attempt is bound by `timeout` (default 30 seconds). A request that doesn't complete
in that window is aborted and surfaces as a `KazuniError` with the message `"Request timed out"`
and no `status` - see [Errors](/docs/sdk/errors).

## Next steps

- [Errors](/docs/sdk/errors) - the full error shape and what each status code means
- [API Reference](/docs/sdk/api-reference) - headers and status codes from the raw REST API
