// Documentation site for Core, the Bitcoin Universe explorer, portfolio,
// activity, and marketplace application.
//
// Static build, deployed to GitHub Pages from main. Search is Pagefind,
// bundled by Starlight: it runs locally in the reader's browser and contacts
// no external service. Nothing on this site loads from a third-party origin.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import rehypeTableScroll from './scripts/rehype-table-scroll.mjs';

export default defineConfig({
  site: 'https://bitcoinuniverseio.github.io',
  base: '/docs-core',
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [rehypeTableScroll],
  },
  integrations: [
    starlight({
      title: 'Core docs',
      description:
        'Product documentation for Core, the Bitcoin Universe explorer, portfolio, activity, and marketplace application: what every screen reads, where each number comes from, and which of the 29 marketplace protocols can actually be traded.',
      logo: { src: './src/assets/mark.svg', alt: '' },
      favicon: '/favicon.svg',
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/bitcoinuniverseio/docs-core',
        },
      ],
      customCss: ['./src/styles/terminal.css'],
      editLink: {
        baseUrl: 'https://github.com/bitcoinuniverseio/docs-core/edit/develop/',
      },
      lastUpdated: true,
      pagination: true,
      credits: false,
      components: {
        Footer: './src/components/Footer.astro',
      },
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content:
              'https://bitcoinuniverseio.github.io/docs-core/social-card.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content:
              'https://bitcoinuniverseio.github.io/docs-core/social-card.png',
          },
        },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'color-scheme', content: 'dark light' } },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'What Core is', slug: 'start/what-core-is' },
            { label: 'Your first five minutes', slug: 'start/first-five-minutes' },
            { label: 'Safety in sixty seconds', slug: 'start/safety' },
            { label: 'Reading the numbers', slug: 'start/reading-the-numbers' },
            { label: 'Product tour', slug: 'start/product-tour' },
          ],
        },
        {
          label: 'Protocol support',
          items: [
            { label: 'The support matrix', slug: 'protocols/support-matrix' },
            { label: 'How to read a protocol row', slug: 'protocols/how-to-read' },
            { label: 'Confirmation and reorg policy', slug: 'protocols/confirmation-and-reorg' },
            { label: 'Indexer sources of truth', slug: 'protocols/indexer-sources' },
            { label: 'Coverage beyond the marketplace', slug: 'protocols/coverage' },
            {
              label: 'Every protocol',
              collapsed: true,
              autogenerate: { directory: 'protocols/detail' },
            },
          ],
        },
        {
          label: 'Explorer',
          items: [
            { label: 'Search', slug: 'explorer/search' },
            { label: 'Blocks', slug: 'explorer/blocks' },
            { label: 'Transactions', slug: 'explorer/transactions' },
            { label: 'Addresses', slug: 'explorer/addresses' },
            { label: 'UTXOs', slug: 'explorer/utxos' },
            { label: 'Protocol assets', slug: 'explorer/protocol-assets' },
            { label: 'Asset-bearing outputs', slug: 'explorer/asset-bearing-outputs' },
            { label: 'Protocol indexes', slug: 'explorer/protocol-indexes' },
          ],
        },
        {
          label: 'Portfolio and activity',
          items: [
            { label: 'Portfolio', slug: 'portfolio/portfolio' },
            { label: 'Activity', slug: 'portfolio/activity' },
            { label: 'Task: manage assets from Portfolio', slug: 'portfolio/manage-assets' },
          ],
        },
        {
          label: 'Markets',
          items: [
            { label: 'How a market works', slug: 'markets/how-markets-work' },
            { label: 'Browsing a market', slug: 'markets/browsing' },
            { label: 'Task: buy a listing', slug: 'markets/buy' },
            { label: 'Task: list an asset', slug: 'markets/list' },
            { label: 'Task: update or delist', slug: 'markets/update-and-delist' },
            { label: 'Collection markets', slug: 'markets/collection-markets' },
            { label: 'Task: add an Ordinals collection', slug: 'markets/collection-imports' },
            { label: 'Ordex', slug: 'markets/ordex' },
            { label: 'Atomicals', slug: 'markets/atomicals' },
            { label: 'Marketplace v1 gates', slug: 'markets/marketplace-v1' },
            { label: 'Collection media', slug: 'markets/collection-media' },
          ],
        },
        {
          label: 'Data and provenance',
          items: [
            { label: 'Where each number comes from', slug: 'data/provenance' },
            { label: 'Indexer freshness', slug: 'data/indexer-freshness' },
            { label: 'Bitcoin and Dogecoin data', slug: 'data/chain-data' },
            { label: 'The public reader boundary', slug: 'data/reader-boundary' },
            { label: 'Fiat prices', slug: 'data/fiat-prices' },
          ],
        },
        {
          label: 'Wallets and signing',
          items: [
            { label: 'Connecting a wallet', slug: 'wallets/connecting' },
            { label: 'Transaction safety', slug: 'wallets/transaction-safety' },
            { label: 'Market safety', slug: 'wallets/market-safety' },
            { label: 'Private chat verification', slug: 'wallets/chat-verification' },
          ],
        },
        {
          label: 'Public API',
          items: [
            { label: 'What is public', slug: 'api/overview' },
            { label: 'Health and readiness', slug: 'api/health' },
            { label: 'OpenAPI reference', slug: 'api/reference' },
            { label: 'Public integrations', slug: 'api/integrations' },
          ],
        },
        {
          label: 'Interface quality',
          items: [
            { label: 'Design and accessibility', slug: 'quality/design-and-accessibility' },
            { label: 'Responsive behaviour', slug: 'quality/responsive' },
            { label: 'Performance', slug: 'quality/performance' },
            { label: 'Release evidence', slug: 'quality/release-evidence' },
          ],
        },
        {
          label: 'Troubleshooting',
          items: [
            { label: 'Start here', slug: 'troubleshooting' },
            { label: 'Market and reader states', slug: 'troubleshooting/states' },
            { label: 'Wallet and signing problems', slug: 'troubleshooting/wallet' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Glossary', slug: 'reference/glossary' },
            { label: 'Changelog', slug: 'reference/changelog' },
            { label: 'Moved pages', slug: 'reference/moved-pages' },
            { label: 'Support', slug: 'reference/support' },
          ],
        },
      ],
    }),
    starlightLinksValidator({
      errorOnRelativeLinks: false,
      errorOnLocalLinks: false,
    }),
  ],
});
