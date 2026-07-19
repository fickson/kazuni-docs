---
sidebar_position: 5
title: Templates
description: Building the emails you send
---

# Templates

A template is an email you build once and reuse - for a campaign, or as the starting point for a
one-off send. Each template has a name, a subject line, and a content document built in Kazuni's
drag-and-drop editor.

## Building a template

The template editor works block by block: add sections like text, images, buttons, and dividers,
and arrange them into an email without writing HTML. Behind the scenes, Kazuni stores your template
as a structured document and renders it into both an HTML version (for clients that display it) and
a plain-text version (as a fallback), so you don't have to maintain both by hand.

Every time you save a template, Kazuni re-renders both versions, so what you see in the editor
preview matches what actually gets sent.

## Duplicating a template

If you want to reuse most of an existing template with small changes, duplicate it rather than
starting over - the duplicate is an independent copy you can edit freely without affecting the
original.

## Using a template

Templates are consumed by [campaigns](/docs/platform/campaigns): a campaign pairs one template with
one contact list and a from address. Templates aren't sent directly through the SDK - the SDK's
`send.email()` method takes raw HTML you provide yourself, for transactional sends where a
dashboard-built template usually isn't the right tool. See
[Sending Email](/docs/sdk/sending-email) for that path.

## Next steps

- [Campaigns](/docs/platform/campaigns) - send a template to a contact list
- [Contacts](/docs/platform/contacts) - build the list a template gets sent to
