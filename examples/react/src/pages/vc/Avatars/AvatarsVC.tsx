import React from 'react'
import { WppAvatar, WppAvatarGroup } from '@platform-ui-kit/components-library-react'
import styles from './AvatarsVC.module.scss'

export const AvatarsVCPage = () => {
  const logoLink = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU'
  const avatarLink =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU'

  const users = [
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

  return (
    <>
      <div className={styles.container} data-testid="avatars-container">
        <div>
          <h3>Avatars</h3>
          <div className={styles.items}>
            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xs"
                name="John Doe1"
                withTooltip
                color="var(--wpp-dataviz-color-cat-dark-1)"
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="s"
                name="John Doe"
                color="var(--wpp-dataviz-color-cat-dark-1)"
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                size="m"
                name="John Doe"
                withTooltip
                tooltipConfig={{ placement: 'top' }}
                color="var(--wpp-dataviz-color-cat-dark-1)"
                data-testid="hover-avatar"
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="l"
                name="John Doe"
                color="var(--wpp-dataviz-color-cat-dark-1)"
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xl"
                name="John Doe"
                color="var(--wpp-dataviz-color-cat-dark-1)"
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="2xl"
                name="John Doe"
                color="var(--wpp-dataviz-color-cat-dark-1)"
              />
            </div>
            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xs"
                name="John Doe"
                withTooltip
                src={avatarLink}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="s"
                name="John Doe"
                src={avatarLink}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="m"
                name="John Doe"
                withTooltip
                tooltipConfig={{ placement: 'top' }}
                src={avatarLink}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="l"
                name="John Doe"
                src={avatarLink}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xl"
                name="John Doe"
                src={avatarLink}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="2xl"
                name="John Doe"
                src={avatarLink}
              />
            </div>

            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xs"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="s"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="m"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="l"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xl"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="2xl"
                amountOfHiddenAvatars={5}
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Logos</h3>
          <div className={styles.items}>
            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="xs"
                src={logoLink}
                name={'LinkedIn'}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="s"
                src={logoLink}
                name={'LinkedIn'}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="m"
                src={logoLink}
                name={'LinkedIn'}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="l"
                src={logoLink}
                name={'LinkedIn'}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="xl"
                src={logoLink}
                name={'LinkedIn'}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="2xl"
                src={logoLink}
                name={'LinkedIn'}
              />
            </div>

            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="xs"
                name="linkedIn"
                color="var(--wpp-dataviz-color-cat-dark-3)"
                withTooltip
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="s"
                name="linkedIn"
                color="var(--wpp-dataviz-color-cat-dark-3)"
                withTooltip
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="m"
                name="linkedIn"
                color="var(--wpp-dataviz-color-cat-dark-3)"
                withTooltip
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="l"
                name="linkedIn"
                color="var(--wpp-dataviz-color-cat-dark-3)"
                withTooltip
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="xl"
                name="linkedIn"
                color="var(--wpp-dataviz-color-cat-dark-3)"
                withTooltip
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="2xl"
                name="linkedIn"
                color="var(--wpp-dataviz-color-cat-dark-3)"
                withTooltip
              />
            </div>

            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="xs"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="s"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="m"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="l"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="xl"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="2xl"
                amountOfHiddenAvatars={5}
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Icons</h3>
          <div className={styles.items}>
            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xs"
                icon="wpp-icon-premium"
                ariaProps={{ label: 'Premium' }}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="s"
                icon="wpp-icon-premium"
                ariaProps={{ label: 'Premium' }}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="m"
                icon="wpp-icon-premium"
                ariaProps={{ label: 'Premium' }}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="l"
                icon="wpp-icon-premium"
                ariaProps={{ label: 'Premium' }}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xl"
                icon="wpp-icon-premium"
                ariaProps={{ label: 'Premium' }}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="2xl"
                icon="wpp-icon-premium"
                ariaProps={{ label: 'Premium' }}
              />
            </div>
          </div>
        </div>

        <div className={styles.groups}>
          <h3>Avatar Groups</h3>
          <div className={styles.group}>
            <WppAvatarGroup
              onWppSelectItem={(event: CustomEvent) => console.log('Event', event)}
              size="xs"
              avatars={users}
              maxAvatarsToDisplay={5}
            />
          </div>

          <div className={styles.group}>
            <WppAvatarGroup
              onWppSelectItem={(event: CustomEvent) => console.log('Event', event)}
              size="s"
              avatars={users}
              maxAvatarsToDisplay={6}
              withTooltip
              tooltipConfig={{ placement: 'top' }}
            />
          </div>

          <h3>Logo Groups</h3>
          <div className={styles.group}>
            <WppAvatarGroup
              onWppSelectItem={(event: CustomEvent) => console.log('Event', event)}
              size="s"
              variant="square"
              avatars={users}
              maxAvatarsToDisplay={6}
              withTooltip
              tooltipConfig={{ placement: 'top' }}
            />
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div>
          <h3>Interactable Avatars</h3>
          <div className={styles.items}>
            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xs"
                name="John Doe1"
                withTooltip
                interactable
                color="var(--wpp-dataviz-color-cat-dark-1)"
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="s"
                name="John Doe"
                interactable
                color="var(--wpp-dataviz-color-cat-dark-1)"
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                size="m"
                name="John Doe"
                withTooltip
                tooltipConfig={{ placement: 'top' }}
                interactable
                color="var(--wpp-dataviz-color-cat-dark-1)"
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="l"
                name="John Doe"
                interactable
                color="var(--wpp-dataviz-color-cat-dark-1)"
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xl"
                name="John Doe"
                interactable
                color="var(--wpp-dataviz-color-cat-dark-1)"
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="2xl"
                name="John Doe"
                interactable
                color="var(--wpp-dataviz-color-cat-dark-1)"
              />
            </div>
            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xs"
                name="John Doe"
                withTooltip
                interactable
                src={avatarLink}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="s"
                name="John Doe"
                interactable
                src={avatarLink}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="m"
                name="John Doe"
                withTooltip
                tooltipConfig={{ placement: 'top' }}
                interactable
                src={avatarLink}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="l"
                name="John Doe"
                interactable
                src={avatarLink}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xl"
                name="John Doe"
                interactable
                src={avatarLink}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="2xl"
                name="John Doe"
                interactable
                src={avatarLink}
              />
            </div>

            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xs"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="s"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="m"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="l"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xl"
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="2xl"
                amountOfHiddenAvatars={5}
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Logos</h3>
          <div className={styles.items}>
            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="xs"
                interactable
                src={logoLink}
                name="LinkedIn"
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="s"
                interactable
                src={logoLink}
                name="LinkedIn"
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="m"
                interactable
                src={logoLink}
                name="LinkedIn"
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="l"
                interactable
                src={logoLink}
                name="LinkedIn"
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="xl"
                interactable
                src={logoLink}
                name="LinkedIn"
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="2xl"
                interactable
                src={logoLink}
                name="LinkedIn"
              />
            </div>

            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="xs"
                name="linkedIn"
                color="var(--wpp-dataviz-color-cat-dark-3)"
                interactable
                withTooltip
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="s"
                name="linkedIn"
                color="var(--wpp-dataviz-color-cat-dark-3)"
                interactable
                withTooltip
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="m"
                name="linkedIn"
                color="var(--wpp-dataviz-color-cat-dark-3)"
                interactable
                withTooltip
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="l"
                name="linkedIn"
                color="var(--wpp-dataviz-color-cat-dark-3)"
                interactable
                withTooltip
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="xl"
                name="linkedIn"
                color="var(--wpp-dataviz-color-cat-dark-3)"
                interactable
                withTooltip
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="2xl"
                name="linkedIn"
                color="var(--wpp-dataviz-color-cat-dark-3)"
                interactable
                withTooltip
              />
            </div>

            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="xs"
                interactable
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="s"
                interactable
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="m"
                interactable
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="l"
                interactable
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="xl"
                interactable
                amountOfHiddenAvatars={5}
              />

              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                variant="square"
                size="2xl"
                interactable
                amountOfHiddenAvatars={5}
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Icons</h3>
          <div className={styles.items}>
            <div className={styles.stack}>
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xs"
                interactable
                icon="wpp-icon-premium"
                ariaProps={{ label: 'Premium' }}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="s"
                interactable
                icon="wpp-icon-premium"
                ariaProps={{ label: 'Premium' }}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="m"
                interactable
                icon="wpp-icon-premium"
                ariaProps={{ label: 'Premium' }}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="l"
                interactable
                icon="wpp-icon-premium"
                ariaProps={{ label: 'Premium' }}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="xl"
                interactable
                icon="wpp-icon-premium"
                ariaProps={{ label: 'Premium' }}
              />
              <WppAvatar
                onWppClick={(event: CustomEvent) => console.log('Event', event)}
                className={styles.item}
                size="2xl"
                interactable
                icon="wpp-icon-premium"
                ariaProps={{ label: 'Premium' }}
              />
            </div>
          </div>
        </div>

        <div className={styles.groups}>
          <h3>Avatar Groups</h3>
          <div className={styles.group}>
            <WppAvatarGroup
              onWppSelectItem={(event: CustomEvent) => console.log('Event', event)}
              size="xs"
              avatars={interactableUsers}
              maxAvatarsToDisplay={5}
            />
          </div>

          <div className={styles.group}>
            <WppAvatarGroup
              onWppSelectItem={(event: CustomEvent) => console.log('Event', event)}
              size="s"
              avatars={interactableUsers}
              maxAvatarsToDisplay={6}
              withTooltip
              tooltipConfig={{ placement: 'top' }}
            />
          </div>

          <h3>Logo Groups</h3>
          <div className={styles.group}>
            <WppAvatarGroup
              onWppSelectItem={(event: CustomEvent) => console.log('Event', event)}
              size="s"
              variant="square"
              avatars={interactableUsers}
              maxAvatarsToDisplay={6}
              withTooltip
              tooltipConfig={{ placement: 'top' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
