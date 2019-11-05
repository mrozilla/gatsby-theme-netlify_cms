# [gatsby-theme-netlify_cms](https://github.com/mrozilla/gatsby-theme-netlify_cms/)

A [Gatsby](https://github.com/gatsbyjs/gatsby) theme using [Netlify CMS](https://github.com/netlify/netlify-cms) and [MDX](https://github.com/mdx-js/mdx). The theme uses [netlify-cms-backend-fs](https://github.com/adarta/netlify-cms-backend-fs) for local development.

## Install

```sh
npm install --save gatsby-theme-netlify_cms
```

## How to use

Add theme to the `plugins` field in your `gatsby-config.js`.

```js
module.exports = {
  //...
  plugins: [
    { resolve: '@mrozilla/gatsby-theme-netlify_cms' },
    //...
  ],
  //...
};
```

## CMS Configuration

You can extend the [Netlify CMS configuration options](https://www.netlifycms.org/docs/configuration-options/) by [shadowing](https://www.gatsbyjs.org/docs/themes/shadowing/#extending-shadowed-files) the `config.js` file. See the [default config set by the theme](https://github.com/mrozilla/gatsby-theme-netlify_cms/blob/master/src/config.js) to understand the existing structure.

```js
// src/gatsby-theme-netlify_cms/config.js

import config from '@mrozilla/gatsby-theme-netlify_cms/src/config';

// e.g. add a new block type

config.collections = [
  ...config.collections.map((collection) => {
    if (collection.name === 'pages') {
      return {
        ...collection,
        fields: collection.fields.map((field) => {
          if (field.name === 'blocks') {
            return { 
              ...field, 
              types: [
                ...field.types, 
                { name: 'New', fields: [{name: 'title'}] }
              ],
            };
          }
          return field;
        }),
      };
    }
    return collection;
  }),
];

export default config;

```

## Change Log

This project adheres to [Semantic Versioning](http://semver.org/). Every release is documented on the Github [Releases](https://github.com/mrozilla/gatsby-theme-netlify_cms/releases) page.

## License

[MIT (c) Jan Hrubý](https://github.com/mrozilla/gatsby-theme-netlify_cms/blob/master/LICENSE)