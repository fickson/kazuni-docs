---
sidebar_position: 7
title: API Reference
description: The raw REST surface behind the Kazuni SDK
---

# API Reference

This page documents the Kazuni REST API directly, for cases where you're not using the SDK - a
different language, a serverless function that wants to avoid a dependency, or curiosity about
what the SDK is doing under the hood.

**The public API surface today is intentionally small: three endpoints.** This page documents
exactly those three and nothing else. If you're looking for webhooks, scheduled sends, SMS,
WhatsApp, or contact management via the API - none of that exists yet. See
[SDK Overview](/docs/sdk/overview#whats-not-here-yet) for the full list of what's not here yet.

## Endpoints

<div className="kz-endpoints">
<div className="kz-endpoint">
<span className="kz-endpoint-verb kz-endpoint-verb--post">POST</span>
<div>
<div className="kz-endpoint-path">/v1/emails/send</div>
<div className="kz-endpoint-desc">Queue a single email for delivery. Returns immediately with an id and a status of <code>queued</code>.</div>
</div>
</div>
<div className="kz-endpoint">
<span className="kz-endpoint-verb kz-endpoint-verb--get">GET</span>
<div>
<div className="kz-endpoint-path">/v1/emails/:id</div>
<div className="kz-endpoint-desc">Retrieve one email and its current delivery status.</div>
</div>
</div>
<div className="kz-endpoint">
<span className="kz-endpoint-verb kz-endpoint-verb--get">GET</span>
<div>
<div className="kz-endpoint-path">/v1/me</div>
<div className="kz-endpoint-desc">Return the organization and permissions attached to the API key in use.</div>
</div>
</div>
</div>

## Base URL

```
https://api.kazuni.io
```

## Authentication

Every request needs an `Authorization` header with your API key:

```
Authorization: Bearer cl_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

See [Authentication](/docs/sdk/authentication) for the key format and where to create one.

## Rate limiting

Every response includes rate-limit headers:

| Header | Meaning |
|---|---|
| `X-RateLimit-Limit` | The maximum number of emails your organization can send per day, based on your plan. |
| `X-RateLimit-Remaining` | How many sends are left in the current rolling 24-hour window. |
| `X-RateLimit-Reset` | Unix timestamp (seconds) for when the current hourly bucket rolls off the window. |

Exceeding the limit returns `429` with:

```json
{ "error": "Rate limit exceeded" }
```

## POST /v1/emails/send

Send a single transactional email. Requires an API key with the **Send email** permission, and a
`from` address on a domain your organization has verified (see
[Sending Domains](/docs/platform/sending-domains)).

**Request body**

```json
{
  "from": "Acme <hello@acme.example>",
  "to": "customer@example.com",
  "subject": "Welcome to Acme",
  "html": "<p>Thanks for signing up.</p>",
  "text": "Thanks for signing up."
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `from` | `string` | Yes | `addr@domain` or `Name <addr@domain>`. Domain must be verified. |
| `to` | `string` | Yes | A single recipient address. No `cc`, `bcc`, or multiple recipients. |
| `subject` | `string` | Yes | Max 998 characters. |
| `html` | `string` | Yes | The HTML body. |
| `text` | `string` | No | Plain-text fallback. |

**Success response** - `202 Accepted`

```json
{ "id": "3fa2e4c1-...", "status": "queued" }
```

`202` and `"queued"` mean Kazuni accepted the request for delivery, not that it has been
delivered. Poll `GET /v1/emails/:id` (below) to see what actually happened.

**Error responses**

| Status | Body | Cause |
|---|---|---|
| `400` | `{ "error": "<first validation issue>" }` | Malformed request body. |
| `401` | `{ "error": "Invalid API key" }` | Missing, malformed, or revoked key. |
| `403` | `{ "error": "API key lacks required permission: send" }` | Key doesn't have the send permission. |
| `403` | `{ "error": "Domain <domain> is not verified for sending. Verify it in the dashboard first." }` | `from` domain isn't verified. |
| `429` | `{ "error": "Rate limit exceeded" }` | Daily send quota exceeded. |

## GET /v1/emails/:id

Look up the status of a previously sent email. `id` is the value returned by
`POST /v1/emails/send`. This endpoint is not yet wrapped by the SDK - call it directly with
`fetch` or your HTTP client of choice, or check status from the
[Kazuni dashboard](/docs/platform/delivery).

**Success response** - `200 OK`

```json
{
  "id": "3fa2e4c1-...",
  "from": "Acme <hello@acme.example>",
  "to": "customer@example.com",
  "subject": "Welcome to Acme",
  "status": "delivered",
  "error": null,
  "queuedAt": "2026-07-19T09:00:00.000Z",
  "sentAt": "2026-07-19T09:00:01.000Z",
  "deliveredAt": "2026-07-19T09:00:04.000Z"
}
```

`status` is one of: `queued`, `sending`, `sent`, `delivered`, `bounced`, `complained`, `rejected`,
`failed`. See [Delivery](/docs/platform/delivery) for what each of these means.

**Error responses**

| Status | Body | Cause |
|---|---|---|
| `401` | `{ "error": "Invalid API key" }` | Missing, malformed, or revoked key. |
| `404` | `{ "error": "Email not found" }` | No email with that id belongs to your organization. |

## GET /v1/me

Returns information about the API key making the request - useful for confirming which
organization and mode (live/test) a key belongs to, and what it's allowed to do, without hard
-coding that information in your application.

**Success response** - `200 OK`

```json
{
  "organizationId": "org_2abc...",
  "mode": "live",
  "permissions": {
    "send": true,
    "contactsRead": false,
    "contactsWrite": false,
    "domainsRead": false
  }
}
```

**Error responses**

| Status | Body | Cause |
|---|---|---|
| `401` | `{ "error": "Invalid API key" }` | Missing, malformed, or revoked key. |

## Next steps

- [Sending Email](/docs/sdk/sending-email) - the SDK method that wraps `POST /v1/emails/send`
- [Errors](/docs/sdk/errors) - the SDK's typed error shape
- [Idempotency and Retries](/docs/sdk/idempotency-and-retries) - which of these are safe to retry
