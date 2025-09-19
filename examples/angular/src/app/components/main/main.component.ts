import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createTheme } from '@platform-ui-kit/components-library'
import themeJson from '@platform-ui-kit/components-library/dist/collection/wpp-theme.json'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  applyTheme(theme: Record<string, string>) {
    Object.entries(theme).forEach(([key, value]) => {
      document.body.style.setProperty(key, value)
    })
  }

  ngOnInit() {
    console.log('Theme', themeJson)
    const theme = createTheme(themeJson)

    const style = document.createElement('style')

    style.innerHTML = `body { ${Object.entries(theme)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ')} }`
    document.head.appendChild(style)
  }
}
