<script setup lang="ts">
import { ref } from 'vue'
import {
  WppAvatar,
  WppIconNavigationMenu,
  WppIconSearch,
  WppTypography,
  WppIconMore,
  WppBreadcrumb,
  WppTopbar,
  WppDivider,
  WppIconHelp,
  WppButton,
  WppBanner,
  WppCard,
} from '@platform-ui-kit/components-library-vue'

import { breadcrumb_items, topbar_items, cards } from './config'

const value = ref('marketOverview')
const isToShowBanner = ref(true)

const handleTopbarItemChange = (event: CustomEvent) => {
  value.value = event.detail.value
}

const handleBannerShowStateChange = (event: CustomEvent) => {
  isToShowBanner.value = event.detail.show
}

const handleShowBanner = () => {
  isToShowBanner.value = true
}

const handleCloseBanner = () => {
  isToShowBanner.value = false
}
</script>

<template>
  <div class="page">
    <div class="header">
      <div class="navigation">
        <div class="navigation-bar">
          <WppIconNavigationMenu class="icon-nav-menu" />
          <img
            src="https://easydrawingguides.com/wp-content/uploads/2018/09/Impossible-Triangle-09.png"
            class="image"
            alt=""
          />
          <WppBreadcrumb :items="breadcrumb_items" />
        </div>
        <div class="actions-row">
          <WppIconSearch class="icon-search" />
          <WppTypography type="s-midi">Help</WppTypography>
          <WppIconMore direction="horizontal" class="icon-more" />
          <WppAvatar name="Avatar" size="s" color="var(--wpp-dataviz-color-cat-dark-9)" />
        </div>
      </div>
      <WppDivider />
      <WppTopbar :value="value" :navigation="topbar_items" @wppChange="handleTopbarItemChange">
        <div slot="app" class="app">
          <WppTypography class="name" type="m-strong" tag="h3"> APP Name </WppTypography>
        </div>
      </WppTopbar>
    </div>
    <div class="container">
      <WppBanner
        type="information"
        :show="isToShowBanner"
        closable
        class="banner"
        @wppClose="handleBannerShowStateChange"
        data-testid="banner-with-top-bar"
      >
        Banners should be used thoughtfully for only the most important information and can contain maximum 1 line of
        text.
      </WppBanner>
      <div class="body">
        <div class="section">
          <WppTypography type="3xl-heading">Client images</WppTypography>
          <div class="actions-row">
            <WppIconHelp color="var(--wpp-brand-color)" />
            <WppTypography type="s-midi" class="helper"> Help </WppTypography>
            <WppButton variant="secondary" @click="handleShowBanner"> Show Banner </WppButton>
            <WppButton variant="primary" class="export-btn" @click="handleCloseBanner"> Close Banner </WppButton>
          </div>
        </div>
        <div class="cards-list">
          <WppCard v-for="card in cards" :key="card.title" class="card-item">
            <img :src="card.src" alt="" />
            <div class="content">
              <WppTypography type="xl-heading" class="title">
                {{ card.title }}
              </WppTypography>
              <WppTypography type="s-body" class="description">
                {{ card.description }}
              </WppTypography>
            </div>
          </WppCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px rgb(52 58 63 / 5%), 0 2px 8px rgb(52 58 63 / 12%);

  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;

    .navigation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 38px 16px 44px;
      overflow: auto;

      .navigation-bar {
        display: inline-flex;
        align-items: center;

        .icon-nav-menu {
          margin-right: 26px;
        }

        .image {
          display: flex;
          max-height: 32px;
          margin-right: 26px;
        }
      }

      .actions-row {
        display: flex;
        align-items: center;

        .icon-search {
          margin-right: 22px;
        }

        .icon-more {
          margin: 0 26px 0 30px;
        }
      }
    }

    .app {
      display: flex;
      align-items: center;
      margin-right: 32px;
    }

    .name {
      white-space: nowrap;
    }
  }

  .container {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    background-color: #f8f9fb;

    .banner {
      top: 112px;
    }

    .body {
      padding: 24px 38px;
      background: #f8f9fb;

      .section {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .actions-row {
          display: flex;
          align-items: center;

          .helper {
            margin: 0 12px 0 4px;
            color: var(--wpp-brand-color);
          }

          .export-btn {
            margin-left: 12px;
          }
        }
      }

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
            transition: opacity 0.3s ease-out;
          }

          .content {
            .title {
              position: absolute;
              margin: 0;
              transition: inset 0.3s 0.3s ease-out;
              inset: auto auto 30px 30px;
            }

            .description {
              position: absolute;
              max-width: 80%;
              opacity: 0;
              transition: opacity 0.3s ease-out;
              inset: auto auto 80px 30px;
            }
          }

          &:hover .title {
            transition: inset 0.3s ease-out;
            inset: auto auto 220px 30px;
          }

          &:hover .description {
            opacity: 1;
            transition: opacity 0.5s 0.1s ease-in;
          }

          &:hover img {
            opacity: 1;
            transition: opacity 0.3s ease-in;
          }
        }
      }
    }
  }
}
</style>
