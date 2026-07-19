import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const STATUS_LINES = [
  { time: '06:16:37', to: 'chikondi@example.com' },
  { time: '06:16:37', to: 'k.banda@zamtel.zm' },
  { time: '06:16:38', to: 'amara.osei@ghanapost.gh' },
];

const PLATFORM_LINKS = [
  { label: 'Getting started', href: '/docs/platform/getting-started' },
  { label: 'Verifying a sending domain', href: '/docs/platform/sending-domains' },
  { label: 'Building a campaign', href: '/docs/platform/campaigns' },
];

const SDK_LINKS = [
  { label: 'Quickstart', href: '/docs/sdk/quickstart' },
  { label: 'Authentication', href: '/docs/sdk/authentication' },
  { label: 'API reference', href: '/docs/sdk/api-reference' },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Unified notifications platform for African businesses"
      description="Kazuni is a unified notifications platform for African businesses - email today, SMS and WhatsApp next. Send from the dashboard or from your code with the kazuni SDK."
    >
      <main>
        <section className={styles.hero}>
          <div>
            <h1 className={styles.heroTitle}>Notifications for African businesses.</h1>
            <p className={styles.heroDesc}>
              Send email today, SMS and WhatsApp next, through one API and one dashboard. Verify
              your domain once and start sending.
            </p>
            <div className={styles.paths}>
              <Link className={styles.btnPrimary} to="/docs/sdk/quickstart">
                Start sending
              </Link>
              <Link className={styles.btnGhost} to="/docs/platform/overview">
                Read the guides
              </Link>
            </div>
          </div>

          <div className={styles.demo}>
            <div className={styles.code}>
              <div className={styles.codeLang}>TypeScript</div>
              <pre className={styles.codePre}>
                <span className={styles.tokK}>await</span> kazuni.send.
                <span className={styles.tokF}>email</span>{'({\n'}
                {'  from: '}
                <span className={styles.tokS}>&quot;invoices@acme.mw&quot;</span>
                {',\n'}
                {'  to: '}
                <span className={styles.tokS}>&quot;chikondi@example.com&quot;</span>
                {',\n'}
                {'  subject: '}
                <span className={styles.tokS}>&quot;Your July invoice&quot;</span>
                {',\n'}
                {'  template: '}
                <span className={styles.tokS}>&quot;invoice-ready&quot;</span>
                {',\n});'}
              </pre>
            </div>
            <div className={styles.arrowline}>
              <span>produces</span>
              <span className={styles.arrowlineRule} />
            </div>
            <div className={styles.status}>
              {STATUS_LINES.map((line) => (
                <div key={line.to}>
                  {line.time} <b className={styles.statusOk}>delivered</b>{' '}
                  <span className={styles.statusTo}>{line.to}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.split}>
          <div className={styles.splitCol}>
            <h3>Platform</h3>
            <p>
              For anyone running sends from the dashboard: domains, contacts, templates and
              campaigns.
            </p>
            <div className={styles.lst}>
              {PLATFORM_LINKS.map((link) => (
                <Link key={link.href} className={styles.lstLink} to={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.splitColBordered}>
            <h3>SDK and API</h3>
            <p>
              For developers integrating Kazuni into an application, in TypeScript or over plain
              HTTP.
            </p>
            <div className={styles.lst}>
              {SDK_LINKS.map((link) => (
                <Link key={link.href} className={styles.lstLink} to={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
