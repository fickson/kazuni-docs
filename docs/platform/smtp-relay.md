---
sidebar_position: 4
title: SMTP Relay
description: Send through Kazuni from WordPress, Odoo, or any software you cannot change, using four settings instead of code
---

# SMTP Relay

Most software that sends email already knows how to speak SMTP: WordPress, Odoo, ERPNext, Moodle,
your accounting package, the office scanner, the server that emails you when a backup finishes.
None of them can be taught to call an API without a developer changing the code.

The SMTP relay is for exactly that situation. You paste four settings into the software you already
use, and it sends through Kazuni from then on, with the same delivery tracking, bounce handling and
dashboard history as everything else.

If you are writing the code yourself, you probably want the [API](/docs/sdk/quickstart) instead. It
gives you templates, scheduling and idempotency, none of which SMTP can carry.

## Before you start

Two things need to be true:

1. **Your sending domain is verified.** SMTP refuses mail from a domain you have not proved you
   own, the same as the API does. See [Sending Domains](/docs/platform/sending-domains).
2. **Your plan includes the relay.** It is included from Starter upward. On Sandbox you can connect
   and test, but delivery is limited to addresses you have verified.

## Your settings

Find these in the dashboard under **Settings, SMTP relay**. They are the same for every customer
except the password.

| Setting | Value |
|---|---|
| Server (or host) | `smtp.usekazuni.com` |
| Port | `465` |
| Encryption | `SSL/TLS` |
| Username | `kazuni` |
| Password | any Kazuni API key with the **send** permission |
| From address | any address at a domain you have verified |

Two of those surprise people, so they are worth spelling out.

**The username is literally `kazuni`.** Not your email address, not your company name. SMTP has no
way to send a password on its own, so the username field has to contain something; this is what it
contains.

**The password is an API key.** You do not create a separate SMTP password, and there is nothing
extra to store. Create or copy a key under **Settings, API keys**, and paste it into the password
field. Because it is the same credential, revoking that key also cuts off SMTP for anything using
it, which is exactly what you want if a server is lost or a contractor leaves.

## Choose SSL, not STARTTLS

Some applications ask you to choose between SSL/TLS and STARTTLS, or offer port 587 alongside 465.

Choose **SSL/TLS on port 465**. Port 587 and STARTTLS are not available yet. If your software only
offers STARTTLS, use the [API](/docs/sdk/quickstart) for now, or contact us and we will tell you
where 587 support has got to.

Port 25 is never used and never will be. Many networks and hosting providers block it outright.

## Setting it up in common software

### WordPress

Install any SMTP plugin (WP Mail SMTP, Easy WP SMTP, Post SMTP: they all have the same fields) and
choose the **Other SMTP** option rather than a named provider.

- SMTP Host: `smtp.usekazuni.com`
- Encryption: `SSL`
- SMTP Port: `465`
- Authentication: on
- SMTP Username: `kazuni`
- SMTP Password: your API key
- From Email: an address at your verified domain, for example `hello@mail.yourcompany.mw`

Send the plugin's test email to confirm it works, then check the Messages page in Kazuni. It should
appear there within a second or two.

### Odoo

Under **Settings, Technical, Outgoing Mail Servers**, create a server with:

- SMTP Server: `smtp.usekazuni.com`
- SMTP Port: `465`
- Connection Security: `SSL/TLS`
- Username: `kazuni`
- Password: your API key

Use **Test Connection** before saving.

### An application you deploy yourself

Most frameworks read these from environment variables:

```bash
MAIL_HOST=smtp.usekazuni.com
MAIL_PORT=465
MAIL_ENCRYPTION=ssl
MAIL_USERNAME=kazuni
MAIL_PASSWORD=cl_live_your_api_key_here
MAIL_FROM=hello@mail.yourcompany.mw
```

Keep the API key in whatever secret store you already use. It is a live credential, not a
configuration value.

## How sending to several people is counted

If one message goes to three people, whether they are on the To line, Cc or Bcc, that is three
sends and three credits. This is the same as calling the API three times, and it is what every
email service does, but Bcc makes it easy to forget: your software shows one message, and Kazuni
shows three.

In the dashboard those three appear grouped under a single delivery, so you can see one send, three
recipients, and what happened to each of them separately. One address bouncing does not affect the
other two.

A single message can go to at most 50 recipients. If you are mailing more people than that, you
want [Campaigns](/docs/platform/campaigns), which handle unsubscribes and list management properly.

## What your software will see when something is wrong

Kazuni refuses mail during the SMTP conversation rather than accepting it and failing quietly
afterwards, so your application reports the problem immediately instead of you finding out later.

| Your software reports | What it means | What to do |
|---|---|---|
| `535` authentication failed | The password is not a valid API key, or the key has been revoked, or it lacks the **send** permission | Check the key under Settings, API keys |
| `530` not permitted | Your plan does not include the SMTP relay | Choose a plan from Starter upward |
| `550` domain not verified | The From address is at a domain you have not verified | See [Sending Domains](/docs/platform/sending-domains) |
| `550` recipient not verified | You are on Sandbox, or using a test key, and this recipient is not on your verified list | Add the recipient, or use a live key on a paid plan |
| `452` allowance exhausted | You have used this month's credits | Upgrade, or wait for the monthly reset |
| `451` daily limit reached | You have hit the daily sending cap that protects delivery quality | Try again later, or contact us if you need it raised |
| `552` message too large | The message is over 10 MB, attachments included | Link to the file instead of attaching it |

Most applications show these codes somewhere in a mail log, sometimes with the explanatory text
alongside. If you can find the number, the table above tells you the rest.

## Attachments and formatting

Your message is relayed exactly as your software composed it. Attachments, inline images, HTML
formatting, Reply-To and any custom headers arrive as they left. Kazuni does not rewrite the body.

The practical consequence is that how the email looks is entirely down to the software sending it.
If a WordPress plugin produces an ugly email, it will arrive ugly. Kazuni's
[templates](/docs/platform/templates) are only available through the API and campaigns.

## What SMTP cannot do

These are API and dashboard features with no SMTP equivalent:

- **Stored templates and variables.** Your software composes the whole message.
- **Scheduled sending.** SMTP has no way to say "send this on Friday".
- **Idempotency keys.** If your application sends the same message twice, it is two messages.
- **Cancelling a queued message.** There is no message id to cancel it by until it is accepted.

Everything else is identical: delivery and bounce tracking, complaint handling, suppression,
dashboard history, and the credits it draws from.

## A note on deliverability

When you send through the API, Kazuni composes the message and controls its formatting. Over SMTP,
you control it, and that affects whether mailbox providers trust it.

Two things matter more than anything else:

**Only mail people who asked.** Complaints from recipients who never signed up damage delivery for
every message you send afterwards, including your invoices and password resets.

**Include an unsubscribe link in anything resembling marketing.** Transactional mail such as
receipts and password resets does not need one. Newsletters do, and mailbox providers increasingly
treat its absence as a spam signal on its own.

If you are sending marketing email, [Campaigns](/docs/platform/campaigns) handle both of these for
you and are a better tool for the job than SMTP.
