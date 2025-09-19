<script setup lang="ts">
import { WppTypography, WppBackToTopButton, WppCard } from '@platform-ui-kit/components-library-vue'
import { cards } from '../BannerExample/config'
import { onMounted, ref } from 'vue'
import { debounce } from '@platform-ui-kit/react-example/src/utils'

const showBackToTop = ref(false)

onMounted(() => {
  const debouncedScrollHandler = debounce(() => {
    showBackToTop.value = (window.scrollY > 200)
  }, 50)

  window.addEventListener('scroll', debouncedScrollHandler)

  return () => {
    window.removeEventListener('scroll', debouncedScrollHandler)
  }
})

const handleBackToTopClick = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div class="page">
    <div class="cards-list">
      <WppCard v-for="card in cards" class="card-item" key={title}>
        <img :src="card.src" alt="" />
        <div class="content">
          <WppTypography type="xl-heading" class="title">
            {{ card.title }}
          </WppTypography>
        </div>
      </WppCard>
    </div>
    <WppBackToTopButton @click="handleBackToTopClick" data-testid="backToTopButton" v-if="showBackToTop"/>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px rgb(52 58 63 / 5%), 0 2px 8px rgb(52 58 63 / 12%);

  .cards-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    margin-top: 24px;

    .card-item {
      position: relative;
      width: 400px;
      height: 600px;
      margin: 50px 10px 0;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: 0 10px 30px 5px rgb(0 0 0 / 20%);
      cursor: pointer;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.6;
      }

      .content {
        .title {
          position: absolute;
          margin: 0;
          transition: inset 0.3s 0.3s ease-out;
          inset: auto auto 30px 30px;
        }
      }
    }
  }

  .wpp-back-to-top-button {
    position: fixed;
    right: 16px;
    bottom: 16px;
  }
}
</style>
