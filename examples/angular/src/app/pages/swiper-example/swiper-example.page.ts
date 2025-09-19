import { ChangeDetectionStrategy, Component } from '@angular/core'
import { register } from 'swiper/element/bundle'

// @ts-ignore Can't find file

import '@platform-ui-kit/components-library/dist/collection/swiper.css'

register()

@Component({
  selector: 'app-topbar-example',
  templateUrl: './swiper-example.page.html',
  styleUrls: ['./swiper-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwiperExamplePage {}
