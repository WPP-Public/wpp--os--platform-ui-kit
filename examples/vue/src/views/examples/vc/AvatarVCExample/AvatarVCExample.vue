<script setup lang="ts">
import { WppAvatar, WppAvatarGroup } from '@platform-ui-kit/components-library-vue'

const logoLink = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU'
const users = [
  {
    name: 'Citlalli Tuva',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU',
  },
  {
    name: 'Nicte Lalawethika',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
  },
  {
    name: 'Wickaninnish Harald',
    src: '',
  },
  {
    name: 'Gustaf Marcus',
    src: '',
  },
  {
    name: 'Helga Karla',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU',
  },
  {
    name: 'Rikard Linn',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTXXnMACt3bMOQZHKpikVvGoepV47RtMwTO7PMtquzKEGgcH7dx1YWuUjvbmq7TYJf3SQ&usqp=CAU',
  },
  {
    name: 'Andrea Sawayn',
    src: '',
  },
  {
    name: 'Antonia Stoltenberg',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNcHLXeAdAZw7zgMneKviIMbyN9iu-XPByGg&usqp=CAU',
  },
  {
    name: 'Edmond Schaefer',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
  },
  {
    name: 'Lynda Lynch',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPrWps2upGevuvXZxkp1g52wwo0C00x6BZFKk-hJV5SQvcylGNjr0hnDgO0btsRBnWwuc&usqp=CAU',
  },
  {
    name: 'Rose Langworth MD',
    src: '',
  },
  {
    name: 'Ryan Kozey',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmijLXXeVuoV8O4bTS2DTFK1e8zsIeo_7H8w&usqp=CAU',
  },
  {
    name: 'Citlalli Tuva',
    src: '',
  },
  {
    name: 'Nicte Lalawethika',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
  },
  {
    name: 'Wickaninnish Harald',
    src: '',
  },
  {
    name: 'Gustaf Marcus',
    src: '',
  },
  {
    name: 'Helga Karla',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU',
  },
  {
    name: 'Rikard Linn',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTXXnMACt3bMOQZHKpikVvGoepV47RtMwTO7PMtquzKEGgcH7dx1YWuUjvbmq7TYJf3SQ&usqp=CAU',
  },
  {
    name: 'Andrea Sawayn',
    src: '',
  },
  {
    name: 'Antonia Stoltenberg',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNcHLXeAdAZw7zgMneKviIMbyN9iu-XPByGg&usqp=CAU',
  },
  {
    name: 'Edmond Schaefer',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
  },
  {
    name: 'Lynda Lynch',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPrWps2upGevuvXZxkp1g52wwo0C00x6BZFKk-hJV5SQvcylGNjr0hnDgO0btsRBnWwuc&usqp=CAU',
  },
  {
    name: 'Rose Langworth MD',
    src: '',
  },
  {
    name: 'Ryan Kozey',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmijLXXeVuoV8O4bTS2DTFK1e8zsIeo_7H8w&usqp=CAU',
  },
]

const interactableUsers = [
  {
    name: 'Citlalli Tuva',
    src: '',
    interactable: true,
  },
  {
    name: 'Nicte Lalawethika',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
  },
  {
    name: 'Wickaninnish Harald',
    src: '',
    interactable: true,
  },
  {
    name: 'Gustaf Marcus',
    src: '',
    interactable: true,
  },
  {
    name: 'Helga Karla',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Rikard Linn',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTXXnMACt3bMOQZHKpikVvGoepV47RtMwTO7PMtquzKEGgcH7dx1YWuUjvbmq7TYJf3SQ&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Andrea Sawayn',
    src: '',
    interactable: true,
  },
  {
    name: 'Antonia Stoltenberg',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNcHLXeAdAZw7zgMneKviIMbyN9iu-XPByGg&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Edmond Schaefer',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Lynda Lynch',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPrWps2upGevuvXZxkp1g52wwo0C00x6BZFKk-hJV5SQvcylGNjr0hnDgO0btsRBnWwuc&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Rose Langworth MD',
    src: '',
    interactable: true,
  },
  {
    name: 'Ryan Kozey',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmijLXXeVuoV8O4bTS2DTFK1e8zsIeo_7H8w&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Citlalli Tuva',
    src: '',
    interactable: true,
  },
  {
    name: 'Nicte Lalawethika',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Wickaninnish Harald',
    src: '',
    interactable: true,
  },
  {
    name: 'Gustaf Marcus',
    src: '',
    interactable: true,
  },
  {
    name: 'Helga Karla',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Rikard Linn',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTXXnMACt3bMOQZHKpikVvGoepV47RtMwTO7PMtquzKEGgcH7dx1YWuUjvbmq7TYJf3SQ&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Andrea Sawayn',
    src: '',
    interactable: true,
  },
  {
    name: 'Antonia Stoltenberg',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNcHLXeAdAZw7zgMneKviIMbyN9iu-XPByGg&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Edmond Schaefer',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Lynda Lynch',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPrWps2upGevuvXZxkp1g52wwo0C00x6BZFKk-hJV5SQvcylGNjr0hnDgO0btsRBnWwuc&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Rose Langworth MD',
    src: '',
    interactable: true,
  },
  {
    name: 'Ryan Kozey',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmijLXXeVuoV8O4bTS2DTFK1e8zsIeo_7H8w&usqp=CAU',
    interactable: true,
  },
]

const onClick = (event: CustomEvent) => {
  console.log('Event', event)
}
</script>

<template>
  <div class="container" data-testid="avatars-container">
    <div>
      <h3>Avatars</h3>
      <div class="items">
        <div class="stack">
          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="xs"
            name="John Doe"
            withTooltip
            color="var(--wpp-dataviz-color-cat-dark-1)"
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="s"
            name="John Doe"
            color="var(--wpp-dataviz-color-cat-dark-1)"
          />

          <WppAvatar
            @wppClick="onClick"
            size="m"
            name="John Doe"
            withTooltip
            :tooltipConfig="{ placement: 'top' }"
            color="var(--wpp-dataviz-color-cat-dark-1)"
            data-testid="hover-avatar"
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="l"
            name="John Doe"
            color="var(--wpp-dataviz-color-cat-dark-1)"
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="xl"
            name="John Doe"
            color="var(--wpp-dataviz-color-cat-dark-1)"
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="2xl"
            name="John Doe"
            color="var(--wpp-dataviz-color-cat-dark-1)"
          />
        </div>
        <div class="stack">
          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="xs"
            name="John Doe"
            withTooltip
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="s"
            name="John Doe"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="m"
            name="John Doe"
            withTooltip
            :tooltipConfig="{ placement: 'top' }"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="l"
            name="John Doe"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="xl"
            name="John Doe"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
          />

          <WppAvatar
            class="item"
            size="2xl"
            name="John Doe"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
          />
        </div>

        <div class="stack">
          <WppAvatar @wppClick="onClick" class="item" size="xs" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" size="s" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" size="m" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" size="l" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" size="xl" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" size="2xl" :amountOfHiddenAvatars="5" />
        </div>
      </div>
    </div>

    <div>
      <h3>Logos</h3>
      <div class="items">
        <div class="stack">
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="xs" :src="logoLink" />
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="s" :src="logoLink" />
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="m" :src="logoLink" />
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="l" :src="logoLink" />
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="xl" :src="logoLink" />
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="2xl" :src="logoLink" />
        </div>

        <div class="stack">
          <WppAvatar
            @wppClick="onClick"
            class="item"
            variant="square"
            size="xs"
            name="linkedIn"
            color="var(--wpp-dataviz-color-cat-dark-3)"
            withTooltip
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            variant="square"
            size="s"
            name="linkedIn"
            color="var(--wpp-dataviz-color-cat-dark-3)"
            withTooltip
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            variant="square"
            size="m"
            name="linkedIn"
            color="var(--wpp-dataviz-color-cat-dark-3)"
            withTooltip
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            variant="square"
            size="l"
            name="linkedIn"
            color="var(--wpp-dataviz-color-cat-dark-3)"
            withTooltip
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            variant="square"
            size="xl"
            name="linkedIn"
            color="var(--wpp-dataviz-color-cat-dark-3)"
            withTooltip
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            variant="square"
            size="2xl"
            name="linkedIn"
            color="var(--wpp-dataviz-color-cat-dark-3)"
            withTooltip
          />
        </div>

        <div class="stack">
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="xs" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" variant="square" size="s" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" variant="square" size="m" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" variant="square" size="l" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" variant="square" size="xl" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" variant="square" size="2xl" :amountOfHiddenAvatars="5" />
        </div>
      </div>
    </div>

    <div>
      <h3>Icons</h3>
      <div class="items">
        <div class="stack">
          <WppAvatar @wppClick="onClick" class="item" size="xs" icon="wpp-icon-premium" />
          <WppAvatar @wppClick="onClick" class="item" size="s" icon="wpp-icon-premium" />
          <WppAvatar @wppClick="onClick" class="item" size="m" icon="wpp-icon-premium" />
          <WppAvatar @wppClick="onClick" class="item" size="l" icon="wpp-icon-premium" />
          <WppAvatar @wppClick="onClick" class="item" size="xl" icon="wpp-icon-premium" />
          <WppAvatar @wppClick="onClick" class="item" size="2xl" icon="wpp-icon-premium" />
        </div>
      </div>
    </div>

    <div class="groups">
      <h3>Avatar Groups</h3>
      <div class="group">
        <WppAvatarGroup size="xs" :avatars="users" :maxAvatarsToDisplay="5" withTooltip @wppSelectItem="onClick" />
      </div>

      <div class="group">
        <WppAvatarGroup
          size="s"
          :avatars="users"
          :maxAvatarsToDisplay="6"
          withTooltip
          :tooltipConfig="{ placement: 'top' }"
          @wppSelectItem="onClick"
        />
      </div>

      <h3>Logo Groups</h3>
      <div class="group">
        <WppAvatarGroup
          size="s"
          variant="square"
          :avatars="users"
          :maxAvatarsToDisplay="6"
          withTooltip
          :tooltipConfig="{ placement: 'top' }"
          @wppSelectItem="onClick"
        />
      </div>
    </div>
  </div>

  <div class="container" data-testid="avatars-container">
    <div>
      <h3>Interactable Avatars</h3>
      <div class="items">
        <div class="stack">
          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="xs"
            name="John Doe"
            withTooltip
            color="var(--wpp-dataviz-color-cat-dark-1)"
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="s"
            name="John Doe"
            color="var(--wpp-dataviz-color-cat-dark-1)"
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            size="m"
            name="John Doe"
            withTooltip
            :tooltipConfig="{ placement: 'top' }"
            color="var(--wpp-dataviz-color-cat-dark-1)"
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="l"
            name="John Doe"
            color="var(--wpp-dataviz-color-cat-dark-1)"
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="xl"
            name="John Doe"
            color="var(--wpp-dataviz-color-cat-dark-1)"
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="2xl"
            name="John Doe"
            color="var(--wpp-dataviz-color-cat-dark-1)"
            interactable
          />
        </div>
        <div class="stack">
          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="xs"
            name="John Doe"
            withTooltip
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="s"
            name="John Doe"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="m"
            name="John Doe"
            withTooltip
            :tooltipConfig="{ placement: 'top' }"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="l"
            name="John Doe"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            size="xl"
            name="John Doe"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
            interactable
          />

          <WppAvatar
            class="item"
            size="2xl"
            name="John Doe"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
            interactable
          />
        </div>

        <div class="stack">
          <WppAvatar @wppClick="onClick" class="item" size="xs" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" size="s" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" size="m" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" size="l" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" size="xl" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" size="2xl" :amountOfHiddenAvatars="5" />
        </div>
      </div>
    </div>

    <div>
      <h3>Logos</h3>
      <div class="items">
        <div class="stack">
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="xs" :src="logoLink" interactable />
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="s" :src="logoLink" interactable />
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="m" :src="logoLink" interactable />
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="l" :src="logoLink" interactable />
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="xl" :src="logoLink" interactable />
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="2xl" :src="logoLink" interactable />
        </div>

        <div class="stack">
          <WppAvatar
            @wppClick="onClick"
            class="item"
            variant="square"
            size="xs"
            name="linkedIn"
            color="var(--wpp-dataviz-color-cat-dark-3)"
            withTooltip
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            variant="square"
            size="s"
            name="linkedIn"
            color="var(--wpp-dataviz-color-cat-dark-3)"
            withTooltip
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            variant="square"
            size="m"
            name="linkedIn"
            color="var(--wpp-dataviz-color-cat-dark-3)"
            withTooltip
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            variant="square"
            size="l"
            name="linkedIn"
            color="var(--wpp-dataviz-color-cat-dark-3)"
            withTooltip
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            variant="square"
            size="xl"
            name="linkedIn"
            color="var(--wpp-dataviz-color-cat-dark-3)"
            withTooltip
            interactable
          />

          <WppAvatar
            @wppClick="onClick"
            class="item"
            variant="square"
            size="2xl"
            name="linkedIn"
            color="var(--wpp-dataviz-color-cat-dark-3)"
            withTooltip
            interactable
          />
        </div>

        <div class="stack">
          <WppAvatar @wppClick="onClick" class="item" variant="square" size="xs" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" variant="square" size="s" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" variant="square" size="m" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" variant="square" size="l" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" variant="square" size="xl" :amountOfHiddenAvatars="5" />

          <WppAvatar @wppClick="onClick" class="item" variant="square" size="2xl" :amountOfHiddenAvatars="5" />
        </div>
      </div>
    </div>

    <div>
      <h3>Icons</h3>
      <div class="items">
        <div class="stack">
          <WppAvatar @wppClick="onClick" class="item" size="xs" icon="wpp-icon-premium" interactable />
          <WppAvatar @wppClick="onClick" class="item" size="s" icon="wpp-icon-premium" interactable />
          <WppAvatar @wppClick="onClick" class="item" size="m" icon="wpp-icon-premium" interactable />
          <WppAvatar @wppClick="onClick" class="item" size="l" icon="wpp-icon-premium" interactable />
          <WppAvatar @wppClick="onClick" class="item" size="xl" icon="wpp-icon-premium" interactable />
          <WppAvatar @wppClick="onClick" class="item" size="2xl" icon="wpp-icon-premium" interactable />
        </div>
      </div>
    </div>

    <div class="groups">
      <h3>Avatar Groups</h3>
      <div class="group">
        <WppAvatarGroup size="xs" :avatars="interactableUsers" :maxAvatarsToDisplay="5" withTooltip @wppSelectItem="onClick" />
      </div>

      <div class="group">
        <WppAvatarGroup
          size="s"
          :avatars="interactableUsers"
          :maxAvatarsToDisplay="6"
          withTooltip
          :tooltipConfig="{ placement: 'top' }"
          @wppSelectItem="onClick"
        />
      </div>

      <h3>Logo Groups</h3>
      <div class="group">
        <WppAvatarGroup
          size="s"
          variant="square"
          :avatars="interactableUsers"
          :maxAvatarsToDisplay="6"
          withTooltip
          :tooltipConfig="{ placement: 'top' }"
          @wppSelectItem="onClick"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  margin-right: 15px;
}

.container {
  display: flex;
  flex-direction: row;
}

.items {
  display: flex;
}

.item {
  margin-bottom: 5px;
}

.group {
  margin-top: 40px;
}

.groups {
  height: 600px;
}
</style>
