---
sidebar_position: 5
title: Errors
description: The KazuniError shape and what triggers it
---

# Errors

Every failed SDK call - a bad request, an authentication problem, a network failure, a timeout -
throws a single error type: `KazuniError`.

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

## Fields

| Field | Type | Description |
|---|---|---|
| `message` | `string` | A human-readable description. For API error responses, this is the server's error message. For network failures and timeouts, it's an SDK-generated message (e.g. `"Request timed out"`, `"Network request failed"`). |
| `status` | `number \| undefined` | The HTTP status code, when the failure came from a response. `undefined` for network errors and timeouts, since no response was ever received. |
| `code` | `string \| undefined` | A machine-readable error code. The Kazuni API doesn't populate this field today, so it's currently always `undefined` - the field exists so a future API version can add codes without a breaking SDK change. |
| `requestId` | `string \| undefined` | A request identifier for support, read from an `x-request-id` response header. The API doesn't send this header today, so this is currently always `undefined`, for the same forward-compatibility reason as `code`. |
| `cause` | `unknown` | The underlying error (via the standard `Error.cause`), when the failure originated from a network error, an abort, or a JSON parse failure. |

`code` and `requestId` are honest gaps, not bugs: the SDK reads them if the API sends them, but the
API doesn't send them yet. Don't build logic that depends on either field being populated.

## What triggers each status

These are the failure conditions you'll actually see calling `send.email()` today, based on the
current API implementation:

| Status | When | Example message |
|---|---|---|
| `400` | The request body fails validation (e.g. malformed `from`, missing `subject`, invalid recipient email). | The first validation error found, e.g. `"Invalid from address, expected addr@domain or Name <addr@domain>"` |
| `401` | The API key is missing, malformed, or invalid/revoked. | `"Invalid API key"` |
| `403` | The key is valid but lacks the `send` permission, or the `from` domain isn't verified for your organization. | `"API key lacks required permission: send"` or `"Domain acme.example is not verified for sending. Verify it in the dashboard first."` |
| `404` | You looked up an email by an id that doesn't exist (or belongs to a different organization) via the raw status endpoint. | `"Email not found"` |
| `429` | Your organization has exceeded its daily send quota for its plan. | `"Rate limit exceeded"` |
| `5xx` | An unexpected server-side failure. | Varies |
| _(none)_ | A network failure or a request that exceeded the configured `timeout`. `status` is `undefined` here. | `"Request timed out"` / `"Network request failed"` |

For `400` responses specifically, the API returns only the first validation issue's message, not
a full list of every field that failed - fix the first one and resend.

## Next steps

- [Idempotency and Retries](/docs/sdk/idempotency-and-retries) - which of these are retried, and how
- [Authentication](/docs/sdk/authentication) - avoiding `401`/`403` in the first place
