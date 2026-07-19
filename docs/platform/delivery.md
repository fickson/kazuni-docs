---
sidebar_position: 7
title: Delivery
description: What happens after you hit send, and how to check it
---

# Delivery

Sending an email doesn't mean it arrived - Kazuni tracks each send through its actual delivery
lifecycle so you can tell the difference between "accepted" and "delivered."

## Statuses

Every email you send moves through some subset of these statuses:

| Status | Meaning |
|---|---|
| `queued` | Accepted by Kazuni, not yet handed to the mail server. |
| `sending` | Being sent right now. |
| `sent` | Handed off to the mail server successfully. |
| `delivered` | Confirmed as delivered to the recipient's mail server. |
| `bounced` | Rejected by the recipient's mail server. A permanent bounce (e.g. the address doesn't exist) automatically unsubscribes that contact from future campaign sends; a temporary bounce (e.g. a full inbox) is recorded but doesn't unsubscribe them. |
| `complained` | The recipient marked the email as spam. The contact is automatically unsubscribed from future campaign sends. |
| `rejected` | Refused before delivery was attempted. |
| `failed` | Could not be sent for another reason. |

## Where to see this

The dashboard home page shows your send volume for the current month, how many were delivered, and
a live feed of recent activity - each recipient, its current status, whether it came from a
campaign or the API, and when it happened.

For a specific send, you can also look it up directly - see
[`GET /v1/emails/:id`](/docs/sdk/api-reference#get-v1emails) if you're checking status
programmatically.

## What's not tracked yet

Open and click tracking are not available yet. There's also no webhook mechanism that pushes
delivery events to your own application as they happen - if you need to know a send's status
programmatically, you currently have to look it up rather than being notified. Both are on the
roadmap, not available today.

## Next steps

- [Campaigns](/docs/platform/campaigns) - the stats view for a specific campaign
- [API Reference](/docs/sdk/api-reference) - looking up a single email's status
