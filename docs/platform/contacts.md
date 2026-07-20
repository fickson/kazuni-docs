---
sidebar_position: 4
title: Contacts
description: Managing the people you send to, across channels
---

# Contacts

A contact is a person your organization sends to. Rather than being tied to a single email
address, a contact holds one or more **identifiers** - the addresses and numbers that reach them -
and a separate **consent** decision for each channel.

That separation is what lets one contact record serve email today and SMS or WhatsApp later,
without maintaining a second list of people.

## Identifiers

Each identifier has a type (`email` or `phone`) and a value. A contact needs at least one, and can
have several - a work address and a personal one, an email and a phone number.

One identifier of each type is marked **primary**. The primary email is the address campaigns send
to. Phone numbers are normalized to E.164 on the way in, so `0991 234 567` and `+265991234567` are
stored identically and won't create a duplicate contact.

Identifiers are unique within an organization. Attaching an identifier that already belongs to a
different contact is rejected rather than silently reassigned - see [Merging](#merging) for how to
combine two records deliberately.

## Consent

Consent is tracked per channel, not per contact. A contact can be subscribed to email and
unsubscribed from SMS at the same time.

| Channel | Default for new contacts |
|---|---|
| `email` | Subscribed |
| `sms` | Unsubscribed |
| `whatsapp` | Unsubscribed |

SMS and WhatsApp default to unsubscribed because consent for those channels should be collected
explicitly rather than inherited from an email signup.

Unsubscribing happens from the dashboard, through the unsubscribe link in a campaign, or over the
API. Unsubscribing from one channel leaves the others untouched.

:::note
You can record SMS and WhatsApp consent today, but Kazuni cannot send on those channels yet.
Consent captured now applies when they ship.
:::

## Suppression

Suppression is separate from unsubscribing, and stronger.

When an email hard-bounces or a recipient marks a message as spam, Kazuni suppresses that address
automatically. Suppression is a deliverability protection - it records that an address is
undeliverable or has complained, rather than a preference the recipient chose.

Transient failures such as a full mailbox or a temporary greylist are logged but do not suppress.

:::warning
Suppression currently applies to campaign sends. Transactional email sent through
`POST /v1/emails/send` does **not** yet consult the suppression list, so a previously bounced
address will still be attempted on that route.
:::

## Adding contacts

Add contacts one at a time from the **Contacts** page, or import many at once from CSV. An import
row needs an `email` column, a `phone` column, or both; name columns are optional.

Rows that cannot be used - an unparseable phone number, or an identifier already belonging to
another contact - come back in a `skipped` list with a reason. The rest of the batch still
imports, so a single bad row does not cost you the file.

You can attach arbitrary key/value metadata to a contact (a plan tier, a signup source) to have
that information available when building campaigns later.

## Lists

Contacts can be organized into named lists such as "Newsletter" or "Beta users". A contact can
belong to multiple lists. Lists exist so a [campaign](/docs/platform/campaigns) can target a group
rather than every contact in your organization.

Each list shows its total contacts and how many are currently reachable by email. That second
count excludes both unsubscribed and suppressed addresses, so it reflects who would actually
receive a send.

## Merging

When two records turn out to be the same person, merging moves all identifiers and list
memberships from a source contact onto a target contact, fills in any name fields the target is
missing, and deletes the source.

Where the two disagree on consent for a channel, the more restrictive value wins: if either side
is unsubscribed, the merged contact is unsubscribed. An unsubscribe is never lost to a merge.

## Managing contacts over the API

Everything above is available to API-key clients under `/v1/contacts` - listing, creating,
upserting by identifier, adding and removing identifiers, and setting per-channel consent. See the
[API Reference](/docs/sdk/api-reference#contacts) for request and response shapes.

Reading requires a key with the **Contacts read** permission; anything that writes requires
**Contacts write**.

## Next steps

- [Templates](/docs/platform/templates) - build the email you'll send to a list
- [Campaigns](/docs/platform/campaigns) - send a template to a list
- [API Reference](/docs/sdk/api-reference#contacts) - manage contacts programmatically
