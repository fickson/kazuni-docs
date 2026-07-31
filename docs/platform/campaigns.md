---
sidebar_position: 7
title: Campaigns
description: Sending a template to a contact list
---

# Campaigns

A campaign is what actually sends email to more than one person. It pairs one
[template](/docs/platform/templates) with one [contact list](/docs/platform/contacts) and a from
address, and sends the template to every subscribed contact on that list.

## Creating a campaign

Choose a template, a contact list, and a verified from address (see
[Sending Domains](/docs/platform/sending-domains) if you haven't verified one yet). A campaign
starts as a **draft**, which you can edit freely until you send it.

## Sending immediately or on a schedule

You can send a draft campaign right away, or schedule it for a future time. A scheduled campaign
moves through statuses as it progresses:

| Status | Meaning |
|---|---|
| `draft` | Being edited, not yet scheduled or sent. |
| `scheduled` | Will send automatically at a future time. |
| `sending` | Actively sending to its contact list right now. |
| `sent` | Finished sending. |
| `paused` | A send in progress was paused, and can be resumed. |
| `failed` | The campaign could not complete. |

If you edit a scheduled campaign - or change its template, list, or from address on any campaign -
Kazuni re-checks that the template has content and the from domain is still verified before
allowing the change, so a campaign can't drift into an unsendable state without you noticing.

## Pausing and resuming

A campaign that's actively sending can be paused, and resumed later from where it left off.

## Tracking results

Each campaign has a stats view showing how many contacts it reached and how many sends succeeded
or failed so far. See [Delivery](/docs/platform/delivery) for what the underlying delivery statuses
mean.

## Deleting a campaign

Only campaigns still in `draft` can be deleted. Once a campaign has been scheduled or sent, it's
part of your organization's send history and stays visible even if you no longer want to send it.

## Next steps

- [Delivery](/docs/platform/delivery) - what happens after you hit send
- [Templates](/docs/platform/templates) - build what a campaign sends
