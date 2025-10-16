import { Config } from '@stencil/core'
import { angularOutputTarget } from '@stencil/angular-output-target'
import { reactOutputTarget } from '@stencil/react-output-target'
import { vueOutputTarget } from '@stencil/vue-output-target'
import { sass } from '@stencil/sass'
import { inlineSvg } from 'stencil-inline-svg'
// @ts-ignore no-declaration
import jestConfig from './jest.config.js'
import { angularValueAccessorBindings } from './framework-bindings/angular-bindings'

export const config: Config = {
  namespace: 'platform-ui-kit',
  autoprefixCss: true,
  extras: {
    tagNameTransform: true,
  },
  sourceMap: false,
  transformAliasedImportPaths: false,
  testing: {
    ...jestConfig,
    testRegex: '(/test/.*|\\.?(test|spec|e2e))\\.(ts|tsx|js|mjs|jsx)$',
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/global/breakpoint.scss',
        'src/global/button.scss',
        'src/global/tabFocus.scss',
        'src/global/mathFunctions.scss',
        'src/global/menuList.scss',
        'src/global/scrollbar.scss',
        'src/global/slots.scss',
        'src/global/tableCell.scss',
        'src/global/iconChevron.scss',
        'src/global/input.scss',
        'src/global/typography.scss',
      ],
    }),
    inlineSvg(),
  ],
  outputTargets: [
    // @ts-ignore
    reactOutputTarget({
      componentCorePackage: '@wppopen/components-library',
      proxiesFile: '../components-library-react/src/index.ts',
      includeImportCustomElements: true,
      includePolyfills: false,
      includeDefineCustomElements: false,
    }),
    // @ts-ignore
    angularOutputTarget({
      componentCorePackage: '@wppopen/components-library',
      outputType: 'standalone',
      directivesProxyFile: '../components-library-angular/src/directives/proxies.ts',
      directivesArrayFile: '../components-library-angular/src/directives/proxies-list.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    // @ts-ignore
    vueOutputTarget({
      componentCorePackage: '@wppopen/components-library',
      proxiesFile: '../components-library-vue/src/components.ts',
      includeImportCustomElements: true,
    }),
    {
      type: 'dist',
      transformAliasedImportPathsInCollection: false,
      esmLoaderPath: '../loader',
      copy: [
        {
          src: '../../../node_modules/marked/lib/marked.umd.js.map',
          dest: '../../components/marked.umd.js.map',
        },
        {
          src: 'datepicker.css',
          dest: 'datepicker.css',
        },
        {
          src: 'themes/wpp.css',
          dest: 'wpp-theme.css',
        },
        {
          src: 'themes/wpp.json',
          dest: 'wpp-theme.json',
        },
        {
          src: 'reset.css',
          dest: 'reset.css',
        },
        {
          src: 'ag-theme-wpp.css',
          dest: 'ag-theme-wpp.css',
        },
        {
          src: 'types/theme.js',
          dest: 'types/theme.js',
        },
        {
          src: 'types/theme.d.ts',
          dest: 'types/theme.d.ts',
        },
        {
          src: 'global.css',
          dest: 'global.css',
        },
        {
          src: 'global/typography.scss',
          dest: 'typography.scss',
        },
        {
          src: 'global/scrollbar.scss',
          dest: 'scrollbar.scss',
        },
        {
          src: 'shared/styles/grid.css',
          dest: 'grid.css',
        },
        {
          src: 'components/swiper/swiper.css',
          dest: 'swiper.css',
        },
        {
          src: '../versioned-components/components-list.js',
          dest: 'versioned-components/components-list.js',
        },
        {
          src: '../versioned-components/version.js',
          dest: 'versioned-components/version.js',
        },
        {
          src: '../versioned-components/angular/extra-webpack.config.js',
          dest: 'versioned-components/angular/extra-webpack.config.js',
        },
        {
          src: '../versioned-components/angular/versioned-components-aot-loader.js',
          dest: 'versioned-components/angular/versioned-components-aot-loader.js',
        },
        {
          src: '../versioned-components/angular/versioned-components-jit-loader.js',
          dest: 'versioned-components/angular/versioned-components-jit-loader.js',
        },
        {
          src: '../versioned-components/pure-js/versioned-html-loader.js',
          dest: 'versioned-components/pure-js/versioned-html-loader.js',
        },
        {
          src: '../versioned-components/pure-js/define-custom-elements.js',
          dest: 'versioned-components/pure-js/define-custom-elements.js',
        },
        {
          src: '../../../node_modules/parchment/dist/parchment.js.map',
          dest: '../../components/parchment.js.map',
        },
      ],
    },
    {
      type: 'dist-custom-elements',
      dir: 'components',
      copy: [
        {
          src: '../scripts/custom-elements',
          dest: 'components',
          warn: true,
        },
      ],
      generateTypeDeclarations: false,
      includeGlobalScripts: false,
      customElementsExportBehavior: 'single-export-module',
    },
  ],
}
