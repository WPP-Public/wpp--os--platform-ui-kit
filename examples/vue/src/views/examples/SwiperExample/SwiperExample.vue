<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import '@platform-ui-kit/components-library/dist/collection/swiper.css'

register()
</script>

<template>
  <div>
    <div data-testid="regular-carousel">
      <h2>Regular</h2>
      <swiper-container :navigation="true" :pagination="true" :pagination-clickable="true">
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
    </div>

    <div data-testid="gallery-carousel">
      <h2>Gallery</h2>
      <swiper-container
        class="gallerySwiper"
        :slides-per-view="1.8"
        :space-between="0"
        :centered-slides="true"
        :coverflow-effect-depth="800"
        :coverflow-effect-rotate="0"
        :coverflow-effect-slide-shadows="false"
        :effect="'coverflow'"
        :navigation="true"
        :pagination="true"
        :pagination-clickable="true"
      >
        <swiper-slide>
          <div class="slide" style="background-color: #e7eaee"></div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide" style="background-color: #e7eaee"></div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide" style="background-color: #e7eaee"></div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide" style="background-color: #e7eaee"></div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide" style="background-color: #e7eaee"></div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide" style="background-color: #e7eaee"></div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide" style="background-color: #e7eaee"></div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide" style="background-color: #e7eaee"></div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide" style="background-color: #e7eaee"></div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide" style="background-color: #e7eaee"></div>
        </swiper-slide>
      </swiper-container>
    </div>

    <h2>Contrast to dark slides</h2>
    <swiper-container class="contrast" :navigation="true" :pagination="true" :pagination-clickable="true">
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

    <h2>Gallery</h2>
    <swiper-container
      class="gallerySwiper contrast"
      :slides-per-view="1.8"
      :space-between="0"
      :centered-slides="true"
      :coverflow-effect-depth="800"
      :coverflow-effect-rotate="0"
      :coverflow-effect-slide-shadows="false"
      :effect="'coverflow'"
      :navigation="true"
      :pagination="true"
      :pagination-clickable="true"
    >
      <swiper-slide>
        <div class="slide" style="background-color: #8508e8"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide" style="background-color: #8508e8"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide" style="background-color: #8508e8"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide" style="background-color: #8508e8"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide" style="background-color: #8508e8"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide" style="background-color: #8508e8"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide" style="background-color: #8508e8"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide" style="background-color: #8508e8"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide" style="background-color: #8508e8"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide" style="background-color: #8508e8"></div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style scoped>
.slide {
  width: 100%;
  padding: 300px 0;
  font-size: 64px;
  text-align: center;
}

.gallerySwiper {
  --swiper-pagination-bottom: 26px;

  margin-top: 20px;
  height: 450px;
  width: 90%;
  overflow-y: hidden;
  overflow-x: auto;

  .slide {
    height: 97%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--wpp-border-radius-m);
    box-shadow: var(--wpp-box-shadow-m);
  }
}

swiper-container.contrast {
  --swiper-theme-color: var(--wpp-grey-color-000);
  --swiper-pagination-bullet-inactive-color: var(--wpp-grey-color-000);
  --swiper-pagination-bullet-active-color: var(--wpp-grey-color-000);

  .slide {
    color: var(--wpp-grey-color-000);
  }
}
</style>
