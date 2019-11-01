// ─────────────────────────────────────────────────────────────────────────────
// primitives
// ─────────────────────────────────────────────────────────────────────────────

const primitives = {
  buttons: {
    name:   'buttons',
    widget: 'list',
    fields: [
      { name: 'title' },
      { name: 'url' },
      {
        name:    'look',
        widget:  'select',
        options: ['primary', 'secondary', 'tertiary', 'appStore', 'playStore'],
      },
    ],
  },
  image: {
    name:   'image',
    widget: 'object',
    fields: [{ name: 'src', widget: 'image' }, { name: 'alt' }, { name: 'ratio' }],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

const helpers = {
  createExtensionFormat: {
    create:    true,
    extension: 'mdx',
    format:    'frontmatter',
  },
  meta: {
    name:   'meta',
    widget: 'object',
    fields: [
      { name: 'title' },
      { name: 'description' },
      { name: 'permalink' },
      { name: 'ogImage', widget: 'image', default: '/assets/og.png' },
    ],
  },
  contentTypes: [
    { name: 'icon', label: 'Icon', fields: [{ name: 'icon' }] },
    { name: 'tagline', label: 'Tagline', fields: [{ name: 'tagline' }] },
    { name: 'title', label: 'Title', fields: [{ name: 'title' }] },
    { name: 'subtitle', label: 'Subtitle', fields: [{ name: 'subtitle' }] },
    { name: 'mdx', label: 'Mdx', fields: [{ name: 'mdx', widget: 'markdown' }] },
    { name: 'image', label: 'Image', fields: [primitives.image] },
    { name: 'buttons', label: 'Buttons', fields: [primitives.buttons] }, // TODO: test
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// collections
// ─────────────────────────────────────────────────────────────────────────────

const collections = [
  {
    label:          'Menus',
    label_singular: 'Menu',
    name:           'menus',
    folder:         'src/cms/menus',
    ...helpers.createExtensionFormat,
    fields:         [
      { name: 'title' },
      {
        name:   'announcement',
        widget: 'list',
        fields: [{ name: 'title' }, { name: 'url' }, { name: 'body' }],
      },
      {
        name:   'links',
        widget: 'list',
        types:  [
          {
            name:   'link',
            label:  'Link',
            fields: [{ name: 'title' }, { name: 'url' }, { name: 'badge', required: false }],
          },
          {
            name:   'nested',
            label:  'Nested',
            fields: [
              { name: 'title' },
              {
                name:   'links',
                widget: 'list',
                fields: [
                  { name: 'title' },
                  { name: 'url', required: false },
                  { name: 'badge', required: false },
                ],
              },
            ],
          },
          {
            name:   'button',
            label:  'Button',
            fields: [
              { name: 'title' },
              { name: 'url' },
              { name: 'look', widget: 'select', options: ['primary', 'secondary', 'tertiary'] },
            ],
          },
          {
            name:   'markdown',
            label:  'Markdown',
            fields: [{ name: 'title' }, { name: 'mdx', widget: 'markdown' }],
          },
        ],
      },
    ],
  },

  {
    label:          'Pages',
    label_singular: 'Page',
    name:           'pages',
    folder:         'src/cms/pages',
    ...helpers.createExtensionFormat,
    fields:         [
      { name: 'title' },
      { name: 'date', widget: 'datetime' },
      { ...helpers.meta },
      {
        name:           'blocks',
        label:          'Blocks',
        label_singular: 'Block',
        widget:         'list',
        types:          [
          {
            name:   'hero',
            label:  'Hero',
            fields: [
              {
                name:   'header',
                label:  'Header',
                widget: 'list',
                types:  [
                  {
                    name:   'announcement',
                    label:  'Announcement',
                    fields: [{ name: 'url' }, { name: 'title' }, { name: 'body' }],
                  },
                  ...helpers.contentTypes,
                ],
              },
              { name: 'backgroundImage', widget: 'image', required: false },
              { name: 'video', required: false },
            ],
          },
          {
            name:   'sidekick',
            label:  'Sidekick',
            fields: [
              {
                name:   'header',
                label:  'Header',
                widget: 'list',
                types:  [...helpers.contentTypes],
              },
              {
                name:           'columns',
                label:          'Columns',
                label_singular: 'Column',
                widget:         'list',
                fields:         [
                  { name: 'width', default: '1fr' },
                  {
                    name:           'blocks',
                    label:          'Blocks',
                    label_singular: 'Block',
                    widget:         'list',
                    types:          [
                      ...helpers.contentTypes,
                      {
                        name:   'map',
                        label:  'Map',
                        fields: [
                          {
                            name:   'map',
                            widget: 'object',
                            fields: [{ name: 'geo', widget: 'map' }, { name: 'zoom' }],
                          },
                        ],
                      },
                      {
                        name:   'grid',
                        label:  'Grid',
                        fields: [
                          {
                            name:   'grid',
                            widget: 'list',
                            fields: [
                              { name: 'icon', required: false },
                              { name: 'title', required: false },
                              { name: 'mdx', widget: 'markdown', required: false },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  { name: 'textAlign', required: false },
                ],
              },
            ],
          },
          {
            name:   'testimonials',
            label:  'Testimonials',
            fields: [
              { name: 'header', label: 'Header', widget: 'list', types: [...helpers.contentTypes] },
              {
                name:   'testimonials',
                widget: 'list',
                fields: [
                  { name: 'name' },
                  { name: 'position', required: false },
                  { name: 'company', required: false },
                  { name: 'testimonial', required: false },
                  { ...primitives.image, required: false },
                ],
              },
            ],
          },
          {
            name:   'logos',
            label:  'Logos',
            fields: [
              { name: 'header', label: 'Header', widget: 'list', types: [...helpers.contentTypes] },
              {
                name:   'logos',
                widget: 'list',
                fields: [{ name: 'title' }, { name: 'url' }, primitives.image],
              },
            ],
          },
          {
            name:   'pricing',
            label:  'Pricing',
            fields: [
              { name: 'header', label: 'Header', widget: 'list', types: [...helpers.contentTypes] },
              {
                name:   'pricing',
                widget: 'list',
                fields: [
                  { name: 'title' },
                  {
                    name:   'price',
                    widget: 'object',
                    fields: [
                      { name: 'monthly', widget: 'number' },
                      { name: 'yearly', widget: 'number' },
                    ],
                  },
                  { name: 'currency' },
                  { name: 'mdx', widget: 'markdown', required: false },
                ],
              },
            ],
          },
          {
            name:   'faq',
            label:  'FAQ',
            fields: [
              { name: 'header', label: 'Header', widget: 'list', types: [...helpers.contentTypes] },
              {
                name:   'faq',
                widget: 'list',
                fields: [
                  { name: 'title', label: 'Question' },
                  { name: 'mdx', label: 'Answer', widget: 'markdown' },
                ],
              },
            ],
          },
          {
            name:   'people',
            label:  'People',
            fields: [
              { name: 'header', label: 'Header', widget: 'list', types: [...helpers.contentTypes] },
              {
                name:   'people',
                widget: 'list',
                fields: [
                  { name: 'name' },
                  { name: 'position', required: false },
                  { name: 'company', required: false },
                  { name: 'mdx', label: 'Description', widget: 'markdown', required: false },
                  { ...primitives.image, required: false },
                  { name: 'contact', widget: 'list', fields: [{ name: 'icon' }, { name: 'url' }] },
                ],
              },
            ],
          },
          {
            name:   'jobs',
            label:  'Jobs',
            fields: [
              { name: 'header', label: 'Header', widget: 'list', types: [...helpers.contentTypes] },
              { name: 'jobs', widget: 'list', fields: [{ name: 'title' }, { name: 'url' }] },
            ],
          },
        ],
      },
    ],
  },

  {
    label:          'Posts',
    label_singular: 'Blog post',
    name:           'posts',
    folder:         'src/cms/posts',
    ...helpers.createExtensionFormat,
    fields:         [
      { name: 'title' },
      { name: 'subtitle', required: false },
      { name: 'date', widget: 'datetime' },
      { ...helpers.meta },
      { name: 'tags', required: false },
      { name: 'promoted', widget: 'boolean', default: false },
      { name: 'body', widget: 'markdown' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// config
// ─────────────────────────────────────────────────────────────────────────────

const config = {
  backend: {
    name:          'git-gateway',
    squash_merges: true,
  },
  site_url:              'https://www.example.com',
  media_folder:          'static/assets',
  media_folder_relative: true,
  public_folder:         '/assets',
  slug:                  { encoding: 'ascii', clean_accents: true },
  load_config_file:      false,

  collections,
};

// ─────────────────────────────────────────────────────────────────────────────
// export
// ─────────────────────────────────────────────────────────────────────────────

export default config;
