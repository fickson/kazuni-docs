import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const PATHS = [
  {
    label: 'Platform',
    title: 'Send from the dashboard',
    desc: 'Verify a sending domain, build templates, manage contacts, and run campaigns without writing code. Built for the person on your team who owns customer communication, not the codebase.',
    href: '/docs/platform/overview',
    links: [
      { label: 'Getting started', href: '/docs/platform/getting-started' },
      { label: 'Sending domains and DKIM', href: '/docs/platform/sending-domains' },
      { label: 'Campaigns', href: '/docs/platform/campaigns' },
    ],
  },
  {
    label: 'SDK',
    title: 'Send from your code',
    desc: 'Install the kazuni package, authenticate with an API key, and call one method to send a transactional email. Typed end to end, with a clear error hierarchy and safe retries.',
    href: '/docs/sdk/overview',
    links: [
      { label: 'Quickstart', href: '/docs/sdk/quickstart' },
      { label: 'Authentication', href: '/docs/sdk/authentication' },
      { label: 'API reference', href: '/docs/sdk/api-reference' },
    ],
  },
];

const CAPABILITIES = [
  {
    title: 'Email today',
    desc: 'Transactional email sending is live: verify a domain, get an API key, send. SMS and WhatsApp are planned, not yet available.',
  },
  {
    title: 'Your own domain',
    desc: 'Send from an address on a domain you control. Kazuni walks you through the DNS records and checks propagation for you.',
  },
  {
    title: 'Mobile money billing',
    desc: 'Pay for Kazuni in your own currency via mobile money, billed through Chia - no foreign card required.',
  },
  {
    title: 'Built for African businesses',
    desc: 'Priced and designed for teams who need reliable notifications without a Silicon Valley budget or a foreign bank account.',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Unified notifications platform for African businesses"
      description="Kazuni is a unified notifications platform for African businesses - email today, SMS and WhatsApp next. Send from the dashboard or from your code with the kazuni SDK."
    >
      <main>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Documentation</p>
          <h1 className={styles.heroTitle}>Notifications for African businesses</h1>
          <p className={styles.heroDesc}>
            Kazuni is a unified notifications platform - email today, with SMS and WhatsApp
            planned. Send from the dashboard, or send from your own code with the{' '}
            <code>kazuni</code> SDK.
          </p>
        </section>

        <section className={styles.pathsSection}>
          <div className={styles.pathsGrid}>
            {PATHS.map((path, i) => (
              <div key={path.label} className={i === 0 ? styles.pathCol : styles.pathColBordered}>
                <p className={styles.pathLabel}>{path.label}</p>
                <Link to={path.href} className={styles.pathTitleLink}>
                  <h2 className={styles.pathTitle}>{path.title}</h2>
                </Link>
                <p className={styles.pathDesc}>{path.desc}</p>
                <ul className={styles.pathLinks}>
                  {path.links.map((link) => (
                    <li key={link.href}>
                      <Link to={link.href} className={styles.pathLink}>
                        {link.label} &rarr;
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.capabilitiesSection}>
          <p className={styles.eyebrow}>What Kazuni does</p>
          <dl className={styles.capabilitiesList}>
            {CAPABILITIES.map((item) => (
              <div key={item.title} className={styles.capabilityRow}>
                <dt className={styles.capabilityTitle}>{item.title}</dt>
                <dd className={styles.capabilityDesc}>{item.desc}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.codeSection}>
          <p className={styles.eyebrow}>Two calls to send an email</p>
          <pre className={styles.codeBlock}>
            <code>{`import { Kazuni } from "kazuni";

const kazuni = new Kazuni(process.env.KAZUNI_API_KEY!);

const result = await kazuni.send.email({
  from: "Acme <hello@acme.example>",
  to: "customer@example.com",
  subject: "Welcome to Acme",
  html: "<p>Thanks for signing up.</p>",
});

console.log(result.id, result.status); // "email_...", "queued"`}</code>
          </pre>
          <div className={styles.codeCta}>
            <Link className={styles.btnPrimary} to="/docs/sdk/quickstart">
              SDK quickstart
            </Link>
            <Link className={styles.btnGhost} to="/docs/platform/getting-started">
              Platform getting started
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
