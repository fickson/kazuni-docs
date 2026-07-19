---
sidebar_position: 4
title: Contacts
description: Managing the people you send email to
---

# Contacts

Contacts are the people you send email to. Every contact belongs to your organization and has an
email address, an optional first and last name, and a `subscribed` state that controls whether
they can receive campaign email.

## Adding contacts

You can add contacts one at a time from the **Contacts** page, or import many at once from a CSV
file. During import, Kazuni matches columns in your file to contact fields - email is required,
name fields are optional.

You can also attach arbitrary key/value metadata to a contact (for example, a plan tier or signup
source) if you want that information available when building campaigns later.

## Lists

Contacts can be organized into named lists - for example, "Newsletter" or "Beta users." A contact
can belong to multiple lists. Lists exist so a [campaign](/docs/platform/campaigns) can target a
specific group rather than every contact in your organization. Each list shows how many contacts
belong to it and how many of those are currently subscribed.

## Subscription state

A contact is either subscribed or unsubscribed. Unsubscribing can happen automatically - for
example, when an email to that address bounces permanently or the recipient marks a message as
spam - or manually, from the dashboard. Unsubscribed contacts are excluded from campaign sends
automatically; you don't need to filter them out yourself when building a campaign.

## What this page doesn't cover yet

Contact management in Kazuni is still evolving - in particular, how subscription state is tracked
across channels as SMS and WhatsApp are added is being actively redesigned. This page describes
current behavior, not a stable long-term data model. If you're building an integration that
depends on specific contact fields beyond what's described above, expect that shape to change.

## Next steps

- [Templates](/docs/platform/templates) - build the email you'll send to a list
- [Campaigns](/docs/platform/campaigns) - send a template to a list
