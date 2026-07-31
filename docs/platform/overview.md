---
sidebar_position: 1
title: Platform Overview
description: Kazuni is a unified notifications platform for African businesses
---

# Platform Overview

Kazuni is a unified notifications platform for African businesses. Today that means transactional
and campaign email, sent through your own domain and delivered on infrastructure you never have to
touch directly, plus SMS through a sender ID registered for the countries you send to. WhatsApp is
planned as an additional channel - not available yet. You pay
for Kazuni with mobile money in your own currency, billed through Chia, instead of needing a
foreign-currency card.

The dashboard is where most of the day-to-day work happens: verifying the domain you send from,
managing the contacts you send to, building the templates you send, and watching what happened
after you hit send. Everything the dashboard can do for email sending is also reachable
programmatically through the [SDK](/docs/sdk/overview) and the underlying REST API, for the parts
of your workflow you'd rather automate.

## What's in the dashboard

- **[Sending Domains](/docs/platform/sending-domains)** - verify a domain so you can send from an
  address on it. This is usually the first thing a new organization does, and the part most likely
  to need a technical colleague's help with DNS.
- **[SMTP Relay](/docs/platform/smtp-relay)** - connection settings for sending through Kazuni from
  software you cannot change, such as WordPress or Odoo. Four settings, no code.
- **[Contacts](/docs/platform/contacts)** - the people you send to, organized into lists.
- **[Templates](/docs/platform/templates)** - the emails you send, built once and reused.
- **[Campaigns](/docs/platform/campaigns)** - pairing a template with a contact list and sending it,
  either immediately or on a schedule.
- **[Delivery](/docs/platform/delivery)** - what happened to the emails you've sent: queued, sent,
  delivered, bounced, and so on.
- **API Keys** - under Settings, for programmatic access. See
  [Authentication](/docs/sdk/authentication) for the details.

## Three ways to send

You can do everything above by hand in the dashboard, drive it programmatically, or point existing
software at Kazuni over SMTP. They aren't mutually exclusive, and most organizations end up using
more than one.

- **The dashboard**, for marketing and lifecycle campaigns built against a contact list.
- **The [SDK](/docs/sdk/overview) and REST API**, for transactional email sent from code you
  control: password resets, receipts, notifications. This is the only route that gets stored
  templates, scheduled sending and idempotency keys.
- **The [SMTP relay](/docs/platform/smtp-relay)**, for software you cannot change. WordPress, Odoo,
  ERPNext, a monitoring agent, an office scanner: anything that already knows how to send mail but
  cannot be taught to call an API.

A common pattern is verifying a domain and building templates in the dashboard, then sending
transactional email from application code with the SDK, while campaigns stay in the dashboard's
campaign builder.

## Next steps

- [Getting Started](/docs/platform/getting-started) - set up your account and send your first email
- [SDK Overview](/docs/sdk/overview) - send programmatically from your own code
