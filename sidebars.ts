import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  platformSidebar: [
    {
      type: 'html',
      value: 'Get started',
      className: 'menu-group-label',
      defaultStyle: true,
    },
    {
      type: 'doc',
      id: 'platform/overview',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'platform/getting-started',
      label: 'Getting Started',
    },
    {
      type: 'category',
      label: 'Guides',
      link: {
        type: 'generated-index',
        title: 'Platform Guides',
        description: 'How to configure sending, manage contacts, build templates, run campaigns, and track delivery in the Kazuni dashboard.',
      },
      items: [
        'platform/sending-domains',
        'platform/smtp-relay',
        'platform/contacts',
        'platform/templates',
        'platform/campaigns',
        'platform/delivery',
      ],
    },
  ],
  sdkSidebar: [
    {
      type: 'html',
      value: 'SDK',
      className: 'menu-group-label',
      defaultStyle: true,
    },
    {
      type: 'doc',
      id: 'sdk/overview',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'sdk/quickstart',
      label: 'Quickstart',
    },
    {
      type: 'doc',
      id: 'sdk/authentication',
      label: 'Authentication',
    },
    {
      type: 'doc',
      id: 'sdk/sending-email',
      label: 'Sending Email',
    },
    {
      type: 'doc',
      id: 'sdk/errors',
      label: 'Errors',
    },
    {
      type: 'doc',
      id: 'sdk/idempotency-and-retries',
      label: 'Idempotency and Retries',
    },
    {
      type: 'html',
      value: 'Reference',
      className: 'menu-group-label',
      defaultStyle: true,
    },
    {
      type: 'doc',
      id: 'sdk/api-reference',
      label: 'API Reference',
    },
  ],
};

export default sidebars;
