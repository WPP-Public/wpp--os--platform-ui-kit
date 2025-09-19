import '@platform-ui-kit/components-library/dist/platform-ui-kit/wpp-theme.css'
import defineCustomElements from '@platform-ui-kit/components-library/dist/platform-ui-kit/versioned-components/pure-js/define-custom-elements'

defineCustomElements()

import header from './header.html'
import body from './body.html'

import './styles.css'

function renderComponent(componentContent) {
  const element = document.createElement('div');

  element.innerHTML = componentContent;

  document.body.appendChild(element);
}

renderComponent(header)
renderComponent(body)
