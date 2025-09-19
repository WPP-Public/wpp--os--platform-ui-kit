import React from 'react'
import { WppAvatar, WppIconFavourites, WppPill, WppPillGroup } from '@platform-ui-kit/components-library-react'
import { PillGroupChangeEvent } from '@platform-ui-kit/components-library'
import styles from './PillsVC.module.scss'

export const PillsVC = () => {
  const handleSinglePillGroupChange = (event: CustomEvent<PillGroupChangeEvent>) => {
    console.log('event.detail =>', event.detail)
  }

  const avatarURL =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU'

  return (
    <div data-testid="pills">
      <div className={styles.container}>
        <div>
          <div className={styles.items}>
            <WppPillGroup
              labelConfig={{
                icon: 'wpp-icon-info',
                text: 'Multi Group',
                description: 'Description',
                locales: {
                  optional: 'Optional',
                },
              }}
              name="multi-group"
              value="item-a"
              onWppChange={handleSinglePillGroupChange}
            >
              <WppPill label="Item A" value="item-a" />
              <WppPill label="Item B" value="item-b" />
              <WppPill label="Item C" value="item-c" />
            </WppPillGroup>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.items}>
          <h2>Multiple</h2>
          <p>Default</p>
          <WppPill label="Apple" type="multiple" />

          <p>Checked</p>
          <WppPill label="Kiwi" type="multiple" checked />

          <p>Disabled</p>
          <WppPill label="Wild Berry" type="multiple" disabled />

          <p>Truncation</p>
          <WppPill className={styles.truncation} type="multiple" label="Default Truncation" />

          <p>Truncation Checked</p>
          <WppPill className={styles.truncation} type="multiple" label="Single Checked Truncation" checked />

          <h3>Icon</h3>
          <p>Regular</p>
          <WppPill label="Apple" type="multiple">
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <p>Checked</p>
          <WppPill label="Kiwi" type="multiple" checked>
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <p>Disabled</p>
          <WppPill label="Wild Berry" type="multiple" disabled>
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <p>Truncation</p>
          <WppPill className={styles.truncation} type="multiple" label="Default Truncation">
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <p>Truncation Checked</p>
          <WppPill className={styles.truncation} type="multiple" label="Single Checked Truncation" checked>
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <h3>Avatar</h3>
          <p>Default</p>
          <WppPill label="Apple" type="multiple">
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <p>Checked</p>
          <WppPill label="Kiwi" type="multiple" checked>
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <p>Disabled</p>
          <WppPill label="Wild Berry" type="multiple" disabled>
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <p>Truncation</p>
          <WppPill className={styles.truncation} type="multiple" label="Default Truncation">
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <p>Truncation Checked</p>
          <WppPill className={styles.truncation} type="multiple" label="Single Checked Truncation" checked>
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <h3>Logo</h3>
          <p>Default</p>
          <WppPill label="Apple" type="multiple">
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>

          <p>Checked</p>
          <WppPill label="Kiwi" type="multiple" checked>
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>

          <p>Disabled</p>
          <WppPill label="Wild Berry" type="multiple" disabled>
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>

          <p>Truncation</p>
          <WppPill className={styles.truncation} type="multiple" label="Default Truncation">
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>

          <p>Truncation Checked</p>
          <WppPill className={styles.truncation} type="multiple" label="Single Checked Truncation" checked>
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>
        </div>

        <div className={styles.items}>
          <h2>Single</h2>
          <p>Default</p>
          <WppPill label="Apple" type="single" />

          <p>Checked</p>
          <WppPill label="Kiwi" type="single" checked />

          <p>Disabled</p>
          <WppPill label="Wild Berry" type="single" disabled />

          <p>Truncation</p>
          <WppPill className={styles.truncation} type="single" label="Default Truncation" />

          <p>Truncation Checked</p>
          <WppPill className={styles.truncation} type="single" label="Single Checked Truncation" checked />

          <h3>Icon</h3>
          <p>Default</p>
          <WppPill label="Apple" type="single">
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <p>Checked</p>
          <WppPill label="Kiwi" type="single" checked>
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <p>Disabled</p>
          <WppPill label="Wild Berry" type="single" disabled>
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <p>Truncation</p>
          <WppPill className={styles.truncation} type="single" label="Default Truncation">
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <p>Truncation Checked</p>
          <WppPill className={styles.truncation} type="single" label="Single Checked Truncation" checked>
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <h3>Avatar</h3>
          <p>Default</p>
          <WppPill label="Apple" type="single">
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <p>Checked</p>
          <WppPill label="Kiwi" type="single" checked>
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <p>Disabled</p>
          <WppPill label="Wild Berry" type="single" disabled>
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <p>Truncation</p>
          <WppPill className={styles.truncation} type="single" label="Default Truncation">
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <p>Truncation Checked</p>
          <WppPill className={styles.truncation} type="single" label="Single Checked Truncation" checked>
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <h3>Logo</h3>
          <p>Default</p>
          <WppPill label="Apple" type="single">
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>

          <p>Checked</p>
          <WppPill label="Kiwi" type="single" checked>
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>

          <p>Disabled</p>
          <WppPill label="Wild Berry" type="single" disabled>
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>

          <p>Truncation</p>
          <WppPill className={styles.truncation} type="single" label="Default Truncation">
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>

          <p>Truncation Checked</p>
          <WppPill className={styles.truncation} type="single" label="Single Checked Truncation" checked>
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>
        </div>

        <div className={styles.items}>
          <h2>Pills Display</h2>
          <p>Default</p>
          <WppPill label="Apple" type="display" />

          <p>Default Removable</p>
          <WppPill
            onWppClick={e => console.log('Click', e)}
            onWppClose={e => console.log('Close', e)}
            label="Apple"
            type="display"
            removable
          />

          <p>Disabled</p>
          <WppPill label="Apple" type="display" disabled />

          <p>Disabled Removable</p>
          <WppPill label="Apple" type="display" removable disabled />

          <p>Icon</p>
          <WppPill label="Wild Berry" type="display">
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <p>Icon Removable</p>
          <WppPill label="Wild Berry" type="display" removable>
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <p>Disabled Icon</p>
          <WppPill label="Wild Berry" type="display" disabled>
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <p>Disabled Icon Removable</p>
          <WppPill label="Wild Berry" type="display" removable disabled>
            <WppIconFavourites slot="icon-start" />
          </WppPill>

          <p>Avatar</p>
          <WppPill label="Melon" type="display">
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <p>Avatar Removable</p>
          <WppPill label="Melon" type="display" removable>
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <p>Disabled Avatar</p>
          <WppPill label="Melon" type="display" disabled>
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <p>Disabled Avatar Removable</p>
          <WppPill label="Melon" type="display" removable disabled>
            <WppAvatar src={avatarURL} slot="icon-start" />
          </WppPill>

          <p>Logo</p>
          <WppPill label="Melon" type="display">
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>

          <p>Logo Removable</p>
          <WppPill label="Melon" type="display" removable>
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>

          <p>Disabled Logo</p>
          <WppPill label="Melon" type="display" disabled>
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>

          <p>Disabled Logo Removable</p>
          <WppPill label="Melon" type="display" removable disabled>
            <WppAvatar
              variant="square"
              name="Linkedin"
              size="xs"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              withTooltip={true}
              slot="icon-start"
            ></WppAvatar>
          </WppPill>
        </div>

        <div className={styles.items}>
          <h2>Pills Draggable</h2>
          <p>Default</p>
          <WppPill label="Apple" type="draggable" data-testid="draggable-pill" />

          <p>Default Removable</p>
          <WppPill label="Apple" type="draggable" removable />

          <p>Disabled</p>
          <WppPill label="Apple" type="draggable" disabled />

          <p>Disabled Removable</p>
          <WppPill label="Apple" type="draggable" removable disabled />
        </div>
      </div>
    </div>
  )
}
