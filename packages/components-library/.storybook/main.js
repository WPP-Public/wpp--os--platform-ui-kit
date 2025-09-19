module.exports = {
  stories: [
    // This is the simplest way how to make Welcome page default page in storybook
    '../src/**/welcome.stories.mdx',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
        backgrounds: false,
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-notes/register',
    '@etchteam/storybook-addon-css-variables-theme',
    // 'storybook-theme-css-vars'
  ],
  framework: '@storybook/web-components',
}
