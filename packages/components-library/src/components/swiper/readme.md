# Swiper (Carousel)

#### We use [Swiper](https://swiperjs.com/) to implement this kind of components. 
#### Refer to its original API documentation for information on available options and styling.

## Installation

#### Install Swiper
```shell
npm i swiper
```

#### Add these imports to your project
```ts
import 'swiper/swiper-element-bundle.js'
import '@platform-ui-kit/components-library/dist/collection/swiper.css'
```

## Usage

### Angular

#### html
```html
<h2>Regular</h2>
<swiper-container navigation pagination-clickable>
  <swiper-slide>
    <div class="slide" style="background-color: lightgray">Slide 1</div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide" style="background-color: lightsalmon">Slide 2</div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide" style="background-color: lightgreen">Slide 3</div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide" style="background-color: lightpink">Slide 4</div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide" style="background-color: lightskyblue">Slide 5</div>
  </swiper-slide>
</swiper-container>

<h2>Contrast to dark slides</h2>
<swiper-container class='contrast' navigation pagination-clickable>
  <swiper-slide>
    <div class="slide" style="background-color: black">Slide 1</div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide" style="background-color: darkred">Slide 2</div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide" style="background-color: darkgreen">Slide 3</div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide" style="background-color: purple">Slide 4</div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide" style="background-color: darkblue">Slide 5</div>
  </swiper-slide>
</swiper-container>
```

#### scss
```scss
.slide {
  width: 100%;
  padding: 300px 0;
  font-size: 64px;
  text-align: center;
}

swiper-container.contrast {
  --swiper-theme-color: var(--wpp-grey-color-000);
  --swiper-navigation-bg-color: var(--wpp-grey-color-000);
  --swiper-pagination-bullet-inactive-color: var(--wpp-grey-color-000);

  .slide {
    color: var(--wpp-grey-color-000)
  }
}
```

### React

#### tsx
```tsx
import styles from './Swiper.module.scss'

export const SwiperPage = () => (
  <>
    <h2>Regular</h2>
    <swiper-container navigation pagination pagination-clickable={true}>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'lightgray' }}>
          Slide 1
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'lightsalmon' }}>
          Slide 2
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'lightgreen' }}>
          Slide 3
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'lightpink' }}>
          Slide 4
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'lightskyblue' }}>
          Slide 5
        </div>
      </swiper-slide>
    </swiper-container>

    <h2>Contrast to dark slides</h2>
    <swiper-container class={styles.contrast} navigation pagination pagination-clickable={true}>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'black' }}>
          Slide 1
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'darkred' }}>
          Slide 2
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'darkgreen' }}>
          Slide 3
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'purple' }}>
          Slide 4
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'darkblue' }}>
          Slide 5
        </div>
      </swiper-slide>
    </swiper-container>
  </>
)
```

#### scss
```scss
.slide {
  width: 100%;
  padding: 300px 0;
  font-size: 64px;
  text-align: center;
}

.contrast {
  --swiper-theme-color: var(--wpp-grey-color-000);
  --swiper-navigation-bg-color: var(--wpp-grey-color-000);
  --swiper-pagination-bullet-inactive-color: var(--wpp-grey-color-000);

  .slide {
    color: var(--wpp-grey-color-000)
  }
}
```

### Vue

#### vue
```vue
<template>
  <h2>Regular</h2>
  <swiper-container :pagination="true" :navigation="true">
    <swiper-slide>
      <div class="slide" style="background-color: lightgray">Slide 1</div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide" style="background-color: lightsalmon">Slide 2</div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide" style="background-color: lightgreen">Slide 3</div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide" style="background-color: lightpink">Slide 4</div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide" style="background-color: lightskyblue">Slide 5</div>
    </swiper-slide>
  </swiper-container>

  <h2>Contrast to dark slides</h2>
  <swiper-container class="contrast" :pagination="true" :navigation="true">
    <swiper-slide>
      <div class="slide" style="background-color: black">Slide 1</div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide" style="background-color: darkred">Slide 2</div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide" style="background-color: darkgreen">Slide 3</div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide" style="background-color: purple">Slide 4</div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide" style="background-color: darkblue">Slide 5</div>
    </swiper-slide>
  </swiper-container>
</template>

<style scoped>
  .slide {
    width: 100%;
    padding: 300px 0;
    font-size: 64px;
    text-align: center;
  }

  swiper-container.contrast {
    --swiper-theme-color: var(--wpp-grey-color-000);
    --swiper-navigation-bg-color: var(--wpp-grey-color-000);
    --swiper-pagination-bullet-inactive-color: var(--wpp-grey-color-000);

    .slide {
      color: var(--wpp-grey-color-000);
    }
  }
</style>
```
