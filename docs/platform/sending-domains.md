---
sidebar_position: 3
title: Sending Domains
description: Verify your domain with DKIM, SPF, and DMARC so you can send email that actually arrives
---

# Sending Domains

Before Kazuni can send email on your behalf, you need to prove that you own the domain you're
sending from. This page explains what that means, what you'll be asked to do, and how to hand the
technical part off to a colleague if DNS isn't something you deal with yourself.

If you only remember one thing from this page: **you don't need to understand DNS to get this
right. You need to find whoever manages it, and give them this page.**

## Why verification is required

Anyone can put anything in the "From" field of an email. Mailbox providers (Gmail, Outlook, and the
rest) know this, and they don't trust the "From" field on its own - they check whether the
organization sending the email actually has permission to send on behalf of that domain. Without
that proof, your email is far more likely to land in spam, or not arrive at all.

Kazuni proves this on your behalf by adding a small number of records to your domain's DNS - the
public settings that control how your domain behaves on the internet. Once those records are in
place, mailbox providers can confirm "yes, Kazuni is allowed to send as `yourcompany.com`," and
your email is treated as legitimate.

## What DNS and "your DNS provider" mean

Every domain (`yourcompany.com`, `yourcompany.mw`, and so on) has DNS settings that live wherever
you registered or manage that domain - this could be your domain registrar (where you bought the
domain), or a separate DNS host if someone set one up. Common places this lives: GoDaddy, Namecheap,
Cloudflare, Google Domains, your web host's control panel, or an IT department's internal system.
If you don't know which one applies to you, that's completely normal - it's exactly what to ask
whoever set up your company's website or email.

Adding a DNS record means logging into that DNS provider's dashboard and adding an entry with a
specific type, name, and value. It's a few minutes of copy-pasting, not a technical project - but
it does require access to an account you may not personally have.

## Adding your domain in Kazuni

In the dashboard, go to **Domains** and add the domain you want to send from. Kazuni will generate
the exact records you need to add and show them to you.

**Use a subdomain if you can** - something like `mail.yourcompany.com` rather than
`yourcompany.com` itself. This keeps the records Kazuni asks for separate from any existing email
setup on your root domain (like your company's normal inbox), so there's no risk of the two
interfering with each other.

## The DNS records, explained in plain language

Kazuni will ask you to add five records in total: three for DKIM, one for SPF, and one for DMARC.
None of them require you to understand what the values mean - just to copy them exactly.

### DKIM (three CNAME records)

**What it is:** DKIM is a digital signature. When Kazuni sends an email on your behalf, it signs
the email with a private key. The DNS record you add publishes the matching public key, so
receiving mail servers can check "was this email really signed by someone with the private key
that belongs to this domain?" It's the same idea as a wax seal on a letter, except nobody can forge
it.

You'll be given three records that look like this:

| Type | Name | Value |
|---|---|---|
| CNAME | `<token1>._domainkey.yourdomain.com` | `<token1>.dkim.amazonses.com` |
| CNAME | `<token2>._domainkey.yourdomain.com` | `<token2>.dkim.amazonses.com` |
| CNAME | `<token3>._domainkey.yourdomain.com` | `<token3>.dkim.amazonses.com` |

The `<token>` values are unique to your domain and generated automatically - you'll copy the exact
values shown in your dashboard, not the placeholders above. Add all three; they work together.

### SPF (one TXT record)

**What it is:** SPF is a list of who's allowed to send email claiming to be from your domain. It
answers a simpler question than DKIM: "is this specific mail server on the approved list for this
domain?"

| Type | Name | Value |
|---|---|---|
| TXT | `yourdomain.com` (the root domain itself) | `v=spf1 include:amazonses.com ~all` |

If your domain already has an SPF record (for example, because you use Google Workspace or
Microsoft 365 for your regular email), don't add a second one - SPF only works correctly with one
record per domain. Whoever manages your DNS will need to merge the two into a single record. This
is a good moment to loop in a technical colleague if you're not sure whether one already exists.

### DMARC (one TXT record)

**What it is:** DMARC tells receiving mail servers what to do if an email fails the DKIM or SPF
checks above - and gives you visibility into how your domain's mail is behaving. The value Kazuni
provides starts you at the least strict policy, so nothing existing gets rejected while you get set
up.

| Type | Name | Value |
|---|---|---|
| TXT | `_dmarc.yourdomain.com` | `v=DMARC1; p=none;` |

## Adding the records

For each record, your DNS provider's dashboard will ask for a **type** (CNAME or TXT), a **name**
(sometimes called "host" or "record name"), and a **value** (sometimes called "content" or
"target"). Copy each field exactly as shown in the Kazuni dashboard - a single missing character
will cause verification to fail. Some DNS providers automatically append your domain name to
whatever you type in the "name" field; if your provider does this, you may need to enter only the
part before your domain name rather than the full name shown above. When in doubt, save the record
and check whether it appears correctly using a DNS lookup tool, or ask your provider's support.

## How long it takes

DNS changes aren't instant - they need to "propagate," meaning the update spreads across the
internet's DNS servers. This is usually fast (minutes), but can occasionally take longer depending
on your provider. Kazuni checks your records automatically every five minutes, so you don't need to
do anything after adding them - verification usually completes within an hour.

## Checking your status

Your domain will show one of these statuses in the dashboard:

| Status | Meaning |
|---|---|
| **Pending** | The domain was just added; no verification check has run yet. |
| **Verifying** | Kazuni is checking for the records automatically, every five minutes. |
| **Verified** | All records were found and confirmed. You can send from this domain now. |
| **Failed** | Kazuni checked and didn't find the records as expected. |

If a domain shows **Failed**, double-check that each record was added exactly as shown - a common
cause is a DNS provider trimming or auto-completing part of the name field differently than
expected. Fix the record, then press **Verify now** in the dashboard to check again immediately,
rather than waiting for the next automatic check.

Once verified, don't remove or change these records - doing so will stop delivery from this domain
immediately, with no separate warning.

## Handing this off to a technical colleague

If DNS isn't something you handle yourself, the cleanest way to get this done is to send whoever
does the following, in order:

1. **Which domain (or subdomain) to use** - decide this first. If in doubt, ask them whether a
   subdomain like `mail.yourcompany.com` makes sense, so nothing about your existing email breaks.
2. **A link to this page**, so they have the full context - not just a list of records with no
   explanation.
3. **The exact records from your Domains page in the Kazuni dashboard** - these are unique to your
   domain, so add the domain in the dashboard first, then share what it generates.

They don't need a Kazuni account to add DNS records - just the values. Once they confirm the
records are added, the dashboard will show **Verified** automatically within about an hour.

## Next steps

- [Getting Started](/docs/platform/getting-started) - the full account setup walkthrough
- [Sending Email](/docs/sdk/sending-email) - send from a verified domain via the SDK
