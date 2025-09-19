import React from 'react'
import {
  WppActionButton,
  WppAvatar,
  WppIconMore,
  WppIconChevron,
  WppIconMail,
  WppIconPlus,
  WppListItem,
  WppToggle,
  WppTag,
  WppIconAvailableCheckmark,
  WppMenuContext,
  WppTypography,
} from '@platform-ui-kit/components-library-react'
import { ListItemChangeEventDetail } from '@platform-ui-kit/components-library'
import styles from './ListItemsVC.module.scss'

export const ListItemsVCPage = () => {
  const handleListItemClick = (event: CustomEvent<ListItemChangeEventDetail>) => {
    console.log('event.detail => ', event.detail)
  }

  return (
    <div className={styles.container} data-testid="list-items-container">
      <div className={styles.items}>
        <h3>Single-line</h3>
        <div className={styles.headers}>
          <WppTypography slot="header" type="s-strong">
            Default
          </WppTypography>
          <WppTypography slot="header" type="s-strong">
            Non-Interactive
          </WppTypography>
          <WppTypography slot="header" type="s-strong">
            Checked
          </WppTypography>
          <WppTypography slot="header" type="s-strong">
            Disabled
          </WppTypography>
        </div>
        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Regular</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Regular</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Regular</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Regular</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppIconMail slot="left" />
            <span slot="label">Checked</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppIconMail slot="left" />
            <span slot="label">Checked</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppIconMail slot="left" />
            <span slot="label">Checked</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppIconMail slot="left" />
            <span slot="label">Checked</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Checked</span>
            <WppIconAvailableCheckmark slot="left" />
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Checked</span>
            <WppIconAvailableCheckmark slot="left" />
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Checked</span>
            <WppIconAvailableCheckmark slot="left" />
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Checked</span>
            <WppIconAvailableCheckmark slot="left" />
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Checked</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Checked</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Checked</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Checked</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Text</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Text</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Text</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Text</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Text</span>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Text</span>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Text</span>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Text</span>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Text</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Text</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Text</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Text</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item} multiple>
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple nonInteractive>
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple checked>
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple disabled>
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item} multiple>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>

          <WppListItem className={styles.item} multiple nonInteractive>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>

          <WppListItem className={styles.item} multiple checked>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>

          <WppListItem className={styles.item} multiple disabled>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item} multiple>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} multiple nonInteractive>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} multiple checked>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} multiple disabled>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item} multiple>
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple nonInteractive>
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple checked>
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple disabled>
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item} multiple>
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple nonInteractive>
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple checked>
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple disabled>
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppToggle slot="right" />
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppToggle slot="right" />
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppToggle slot="right" checked />
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppToggle slot="right" />
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppIconMail slot="left" />
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppIconMail slot="left" />
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppIconMail slot="left" />
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppIconMail slot="left" />
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label">Text</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="label">Text</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="subtitle">Subtitle</span>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="subtitle">Subtitle</span>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="subtitle">Subtitle</span>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="subtitle">Subtitle</span>
            <WppAvatar
              size="xs"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppIconMail slot="left" />
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppIconMail slot="left" />
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppIconMail slot="left" />
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppIconMail slot="left" />
            <span slot="label">Text</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>
      </div>

      <div className={styles.items}>
        <h3>Two-line</h3>
        <div className={styles.headers}>
          <WppTypography slot="header" type="s-strong">
            Default
          </WppTypography>
          <WppTypography slot="header" type="s-strong">
            Non-Interactive
          </WppTypography>
          <WppTypography slot="header" type="s-strong">
            Checked
          </WppTypography>
          <WppTypography slot="header" type="s-strong">
            Disabled
          </WppTypography>
        </div>
        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>
        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>
        <div className={styles.variants}>
          <WppListItem className={styles.item} multiple>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive multiple>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple checked>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple disabled>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>
        {/* Multiple selection with two lines, tag */}
        <div className={styles.variants}>
          <WppListItem className={styles.item} multiple>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive multiple>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} multiple checked>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} multiple disabled>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>
        </div>
        {/* Multiple selection with two lines, text */}
        <div className={styles.variants}>
          <WppListItem className={styles.item} multiple>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive multiple>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>

          <WppListItem className={styles.item} multiple checked>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>

          <WppListItem className={styles.item} multiple disabled>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <span slot="subtitle">Subtitle</span>
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>
        </div>
        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Checked</span>
            <span slot="caption">Caption</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Checked</span>
            <span slot="caption">Caption</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Checked</span>
            <span slot="caption">Caption</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Checked</span>
            <span slot="caption">Caption</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>
        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppIconMail slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppIconMail slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppIconMail slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppIconMail slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>
        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <WppIconMail slot="right" />
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <WppIconMail slot="right" />
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <WppIconMail slot="right" />
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <WppIconMail slot="right" />
          </WppListItem>
        </div>
        {/* avatar 2 line, subtitle, tag */}
        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>
        </div>
        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <WppTag slot="right" label="Positive" variant="positive" />
          </WppListItem>
        </div>
        {/* avatar 2 line, subtitle, text */}
        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>
        </div>
        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="subtitle">Subtitle</span>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppAvatar
              size="s"
              variant="square"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
              slot="left"
            />
            <WppTypography slot="right" type="s-body">
              Text
            </WppTypography>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Text</span>
            <span slot="caption">Caption</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>
        <WppListItem selectable onWppChangeListItem={handleListItemClick} className={styles.item} value={12345}>
          <span slot="label">Selectable Item</span>
          <span slot="caption">Caption</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
        <WppListItem className={styles.item} selectable multiple>
          <span slot="label">Menu context example</span>
          <span slot="caption">Events check</span>
          <WppMenuContext slot="right">
            <WppActionButton slot="trigger-element" variant="secondary">
              <WppIconMore slot="icon-start" onClick={() => console.log('Clicked icon more')} />
            </WppActionButton>
            <div>
              <WppListItem onClick={() => console.log('Clicked item 1')}>
                <p slot="label">Item 1</p>
                <span slot="subtitle">Subtitle</span>
              </WppListItem>
              <WppListItem onClick={() => console.log('Clicked item 2')}>
                <p slot="label">Item 2</p>
                <span slot="subtitle">Subtitle</span>
              </WppListItem>
            </div>
          </WppMenuContext>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div className={styles.items}>
        <h3>Truncations</h3>
        <div className={styles.headers}>
          <WppTypography slot="header" type="s-strong">
            Default
          </WppTypography>
          <WppTypography slot="header" type="s-strong">
            Non-Interactive
          </WppTypography>
          <WppTypography slot="header" type="s-strong">
            Checked
          </WppTypography>
          <WppTypography slot="header" type="s-strong">
            Disabled
          </WppTypography>
        </div>
        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppIconMail slot="left" />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppIconMail slot="left" />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppIconMail slot="left" />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppIconMail slot="left" />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppIconAvailableCheckmark slot="left" />
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppIconAvailableCheckmark slot="left" />
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppIconAvailableCheckmark slot="left" />
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppIconAvailableCheckmark slot="left" />
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item} multiple>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive multiple>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppToggle slot="right" />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppToggle slot="right" />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppToggle slot="right" checked />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppToggle slot="right" />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label"> Lorem ipsum dolor sit amet, consectetur</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label"> Lorem ipsum dolor sit amet, consectetur</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label"> Lorem ipsum dolor sit amet, consectetur</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <WppIconMail slot="left" />
            <span slot="label"> Lorem ipsum dolor sit amet, consectetur</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <WppIconMail slot="left" />
            <span slot="label"> Lorem ipsum dolor sit amet, consectetur</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <WppIconMail slot="left" />
            <span slot="label"> Lorem ipsum dolor sit amet, consectetur</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <WppIconMail slot="left" />
            <span slot="label"> Lorem ipsum dolor sit amet, consectetur</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>
      </div>

      <div className={styles.items}>
        <h3>Truncations</h3>
        <div className={styles.headers}>
          <WppTypography slot="header" type="s-strong">
            Default
          </WppTypography>
          <WppTypography slot="header" type="s-strong">
            Non-Interactive
          </WppTypography>
          <WppTypography slot="header" type="s-strong">
            Checked
          </WppTypography>
          <WppTypography slot="header" type="s-strong">
            Disabled
          </WppTypography>
        </div>
        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item} multiple>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive multiple>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} multiple disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item} selectable multiple>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive selectable multiple>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} selectable multiple checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} selectable multiple disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppIconMail slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppIconMail slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppIconMail slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppAvatar
              size="s"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <WppIconMail slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>

        <div className={styles.variants}>
          <WppListItem className={styles.item}>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} nonInteractive>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} checked>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem className={styles.item} disabled>
            <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
            <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>
      </div>

      <div className={styles.items} style={{ width: '100%' }}>
        <h3>With Dynamic Width: 40% of parent container which expands all width. Also the tooltip is placed on top.</h3>
        <div className={styles.variants} style={{ flexDirection: 'column' }}>
          <WppListItem labelTooltipConfig={{ placement: 'top' }} className={styles.customItem}>
            <span slot="label">Regular item with truncation because we need to allow more width</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
          <WppListItem labelTooltipConfig={{ placement: 'top' }} className={styles.customItem}>
            <WppIconMail slot="left" />
            <span slot="label">Regular item with truncation because we need to allow more width</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
          <WppListItem labelTooltipConfig={{ placement: 'top' }} className={styles.customItem}>
            <span slot="label">Regular item with truncation because we need to allow more width</span>
            <WppIconAvailableCheckmark slot="left" />
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem labelTooltipConfig={{ placement: 'top' }} className={styles.customItem}>
            <span slot="label">Regular item with truncation because we need to allow more width</span>
            <WppIconChevron slot="right" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem labelTooltipConfig={{ placement: 'top' }} className={styles.customItem}>
            <span slot="label">Regular item with truncation because we need to allow more width</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem labelTooltipConfig={{ placement: 'top' }} className={styles.customItem}>
            <span slot="label">Regular item with truncation because we need to allow more width</span>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem labelTooltipConfig={{ placement: 'top' }} className={styles.customItem}>
            <span slot="label">Regular item with truncation because we need to allow more width</span>
            <WppActionButton variant="secondary" slot="right">
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem labelTooltipConfig={{ placement: 'top' }} className={styles.customItem} multiple>
            <span slot="label">Regular item with truncation because we need to allow more width</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem labelTooltipConfig={{ placement: 'top' }} className={styles.customItem}>
            <WppToggle slot="right" />
            <span slot="label">Regular item with truncation because we need to allow more width</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem labelTooltipConfig={{ placement: 'top' }} className={styles.customItem}>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="label">Regular item with truncation because we need to allow more width</span>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem labelTooltipConfig={{ placement: 'top' }} className={styles.customItem}>
            <WppAvatar
              size="xs"
              src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
              slot="left"
            />
            <span slot="label">Regular item with truncation because we need to allow more width</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>

          <WppListItem labelTooltipConfig={{ placement: 'top' }} className={styles.customItem}>
            <WppIconMail slot="left" />
            <span slot="label">Regular item with truncation because we need to allow more width</span>
            <WppTag slot="right" label="Positive" variant="positive" />
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>
      </div>
    </div>
  )
}
