// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: { path: 'static/assets', name: 'assets' },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: { path: 'src/cms', name: 'cms' },
    },

    { resolve: 'gatsby-transformer-sharp' },

    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src`, // loading from theme folder structure
        manualInit: true,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 590 },
          },
        ],
      },
    },
    { resolve: 'gatsby-plugin-sharp' },
  ],
};
