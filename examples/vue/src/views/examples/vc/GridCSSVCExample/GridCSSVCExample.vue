<script setup lang="ts">
import {
  WppActionButton,
  WppInput,
} from "@platform-ui-kit/components-library-vue";

import "@platform-ui-kit/components-library/dist/collection/grid.css";

import img from "@/assets/google_img.jpeg";

const ids = [1, 2, 3];
</script>

<template>
  <div class="grids">
    <h2 class="mainTitle">Grid examples</h2>

    <div class="list">
      <div class="wpp-grid-container">
        <div class="wpp-grid-item-all-16">
          <div class="wpp-grid-container full-width">
            <div
              v-for="id in ids"
              :key="`grid-1-${id}`"
              class="wpp-grid-item-all-8"
            >
              <div class="item">
                <h3 class="cardTitle">Scale</h3>
                <p class="number">50,000</p>
                <h3 class="subtitle">Products on the platform</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="wpp-grid-item-all-8">
          <h3 class="title">Resources</h3>
          <p>Product summary</p>
        </div>

        <div class="wpp-grid-item-all-14">
          <div>
            <h3 class="title">Benefits</h3>
            <p>
              Manage interactive experiences with ease: combining human
              experience and technology effectively can help consumers learn and
              engage with content in new ways. However, these unique experiences
              can be hard to monitor, expensive to update, and difficult to
              track. By centralising experience management, Interactive
              Experience Management can make the process
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="wpp-grid-container">
        <div
          v-for="id in ids"
          :key="`grid-2-${id}`"
          class="wpp-grid-item-all-8"
        >
          <div class="card">
            <div class="image">
              <img
                src="https://mui.com/static/images/grid/complex.jpg"
                alt="image"
              />
            </div>
            <div class="body">
              <div class="description">
                <div>
                  <p>Standard license</p>
                  <p>Full resolution 1920x1080</p>
                  <p>ID: {{id}}</p>
                </div>
                <div class="price">
                  <p>$19.00</p>
                </div>
              </div>
              <div class="remove">
                <WppActionButton variant="secondary">Remove</WppActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />

    <div class="container">
      <h3 class="gridTitle">Current realisation with percent width</h3>
      <div class="gridWrapper">
        <div class="gridFullWidth wpp-grid-container">
          <div class="wpp-grid-item-all-6">
            <WppInput placeholder="Placeholder" />
          </div>
          <div class="wpp-grid-item-all-6">
            <WppInput placeholder="Placeholder" />
          </div>
          <div class="wpp-grid-item-all-6">
            <WppInput placeholder="Placeholder" />
          </div>
        </div>

        <br />

        <div class="gridFullWidth wpp-grid-container">
          <div class="wpp-grid-item-all-6">
            <WppInput placeholder="Placeholder" />
          </div>
          <div class="wpp-grid-item-all-6">
            <WppInput placeholder="Placeholder" />
          </div>
        </div>
      </div>
    </div>

    <br />
    <br />

    <div class="grid wpp-grid-container full-width">
      <div class="wpp-grid-item-all-6">
        <div class="wpp-grid-container fluid">
          <div class="wpp-grid-item-all-24">
            <div class="content">
              <h3>Scale</h3>
              <p>50,000</p>
              <h3>Products on the platform</h3>
              <h3>Scale</h3>
              <p>50,000</p>
            </div>
          </div>
          <div class="wpp-grid-item-all-24">
            <div class="content">
              <h3>Scale</h3>
              <p>50,000</p>
              <h3>Products on the platform</h3>
              <h3>Scale</h3>
              <p>50,000</p>
            </div>
          </div>
        </div>
      </div>

      <div class="wpp-grid-item-all-6">
        <div class="content">
          <h3>Resources</h3>
          <p>Product summary</p>
          <p>Product summary</p>
          <p>Product summary</p>
          <p>Product summary</p>
          <p>Product summary</p>
          <p>Product summary</p>
          <p>Product summary</p>
        </div>
      </div>

      <div class="wpp-grid-item-all-12">
        <div
          class="wpp-grid-container full-width"
          style="flex-direction: column"
        >
          <div class="wpp-grid-item-all-24">
            <div class="wpp-grid-container full-width">
              <div class="wpp-grid-item-all-16">
                <div class="content hidePadding">
                  <img :src="img" class="img" alt="" />
                </div>
              </div>
              <div class="wpp-grid-item-all-8">
                <div class="wpp-grid-container full-width">
                  <div class="wpp-grid-item-all-24">
                    <div class="content fixed">
                      <img :src="img" class="img" alt="" />
                    </div>
                  </div>
                  <div class="wpp-grid-item-all-24">
                    <div class="content fixed">
                      <img :src="img" class="img" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="wpp-grid-item-all-24">
            <div class="wpp-grid-container full-width">
              <div class="wpp-grid-item-all-8">
                <div class="content small">
                  <img :src="img" class="img" alt="" />
                </div>
              </div>
              <div class="wpp-grid-item-all-16">
                <div class="content small">
                  <img :src="img" class="img" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainTitle {
  text-align: center;
}

.list {
  padding: 20px;
  font-family: var(--wpp-font-family);
  border-radius: 10px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
}

.list:last-child {
  margin-top: 60px;
}

.card {
  display: flex;
  align-items: center;
  padding: 20px;
  color: var(--wpp-grey-color-1000);
  font-weight: 400;
  font-size: 14px;
  font-family: var(--wpp-font-family);
  text-align: center;
  background-color: var(--wpp-grey-color-300);
  border-radius: 4px;
  transition: background-color 0.3s;
}

.card:hover {
  background: var(--wpp-grey-color-400);
  cursor: pointer;
}

.body {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 20px;
}

.description {
  display: flex;
  width: 100%;
  text-align: start;
}

.image {
  width: 50%;
}

img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}

.price {
  font-weight: bold;
  text-align: end;
}

.remove {
  display: flex;
  flex-direction: row-reverse;
}

.cards {
  box-sizing: border-box;
  height: 96px;
  border: 1px solid var(--wpp-grey-color-300);
  border-radius: 4px;
}

.cardTitle {
  margin: 0;
  color: var(--wpp-grey-color-600);
  font-size: 10px;
  text-transform: uppercase;
}

.title {
  margin: 0;
}

.number {
  margin: 0;
  color: var(--wpp-grey-color-1000);
  font-size: 16px;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 96px;
  text-align: center;
  border: 1px solid var(--wpp-grey-color-600);
  border-radius: 4px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
}

.subtitle {
  margin: 0;
  color: #121619;
  font-size: 14px;
}

.container {
  padding: 20px 0;
  background-color: var(--wpp-grey-color-300);
  border-radius: 10px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
}

.container .gridFullWidth {
  width: 100%;
  margin: 0;

  --wpp-grid-row-spacing: 2;
  --wpp-grid-column-spacing: 2;
}

.gridWrapper {
  padding: 0 20px;
}

.gridTitle {
  margin: 0 0 20px;
  padding: 0 20px;
}

.grid {
  height: 100%;
}

.content {
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  border: 1px solid black;
  border-radius: 6px;
}

.hidePadding {
  padding: 0;
}

.fixed {
  height: 290px;
  padding: 0;
}

.small {
  height: 250px;
  padding: 0;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
