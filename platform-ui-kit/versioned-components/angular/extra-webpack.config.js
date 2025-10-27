const componentsMapperList = require('./versioned-components-jit-loader')

module.exports = {
  module: {
    rules: [
      // aot compiler
      {
        test: /\.ts/,
        loader:
          '@wppopen/components-library/dist/platform-ui-kit/versioned-components/angular/versioned-components-aot-loader',
        enforce: 'post',
      },
      // jit compiler
      {
        test: /\.html/,
        resourceQuery: /\?ngResource/,
        enforce: 'post',
        use: {
          loader: 'string-replace-loader',
          options: {
            multiple: componentsMapperList,
          },
        },
      },
      {
        test: /\.html$/,
        type: 'asset/source', // Treat as raw string
        exclude: [/\.component\.html$/, /\?ngResource/], // Avoid clashing with Angular templates
      },
    ],
  },
}
