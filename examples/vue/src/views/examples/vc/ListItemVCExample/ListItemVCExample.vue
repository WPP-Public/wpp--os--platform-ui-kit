<script setup lang="ts">
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
} from '@platform-ui-kit/components-library-vue'

const handleListItemClick = (event: CustomEvent) => {
  console.log('event.detail => ', event.detail)
}
</script>

<template>
  <div class="container" data-testid="list-items-container">
    <div class="items">
      <h3>Single-line</h3>
      <div class="headers">
        <WppTypography slot="header" type="s-strong">Default</WppTypography>
        <WppTypography slot="header" type="s-strong">Non-Interactive</WppTypography>
        <WppTypography slot="header" type="s-strong">Checked</WppTypography>
        <WppTypography slot="header" type="s-strong">Disabled</WppTypography>
      </div>
      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Regular</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Regular</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Regular</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Regular</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppIconMail slot="left" />
          <span slot="label">Checked</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppIconMail slot="left" />
          <span slot="label">Checked</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppIconMail slot="left" />
          <span slot="label">Checked</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppIconMail slot="left" />
          <span slot="label">Checked</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Checked</span>
          <WppIconAvailableCheckmark slot="left" />
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Checked</span>
          <WppIconAvailableCheckmark slot="left" />
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Checked</span>
          <WppIconAvailableCheckmark slot="left" />
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Checked</span>
          <WppIconAvailableCheckmark slot="left" />
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Checked</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Checked</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Checked</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Checked</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item" multiple>
          <span slot="label">Text</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive multiple>
          <span slot="label">Text</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" multiple checked>
          <span slot="label">Text</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" multiple disabled>
          <span slot="label">Text</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item" multiple>
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive multiple>
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" multiple checked>
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" multiple disabled>
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item" multiple>
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive multiple>
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" multiple checked>
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" multiple disabled>
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppToggle slot="right" />
          <span slot="label">Text</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppToggle slot="right" />
          <span slot="label">Text</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppToggle slot="right" checked />
          <span slot="label">Text</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppToggle slot="right" />
          <span slot="label">Text</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppIconMail slot="left" />
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppIconMail slot="left" />
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppIconMail slot="left" />
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppIconMail slot="left" />
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="label">Text</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="label">Text</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="label">Text</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="label">Text</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="label">Text</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppIconMail slot="left" />
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppIconMail slot="left" />
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppIconMail slot="left" />
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppIconMail slot="left" />
          <span slot="label">Text</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>
    </div>

    <div class="items">
      <h3>Two-line</h3>
      <div class="headers">
        <WppTypography slot="header" type="s-strong">Default</WppTypography>
        <WppTypography slot="header" type="s-strong">Non-Interactive</WppTypography>
        <WppTypography slot="header" type="s-strong">Checked</WppTypography>
        <WppTypography slot="header" type="s-strong">Disabled</WppTypography>
      </div>
      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppTypography slot="right" type="s-body">Text</WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item" multiple>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive multiple>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" multiple checked>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" multiple disabled>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item" selectable multiple>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive selectable multiple>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" selectable multiple checked>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" selectable multiple disabled>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item" selectable multiple>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppTypography slot="right" type="s-body">
            Text
          </WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive selectable multiple>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppTypography slot="right" type="s-body">
            Text
          </WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" selectable multiple checked>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppTypography slot="right" type="s-body">
            Text
          </WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" selectable multiple disabled>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppTypography slot="right" type="s-body">
            Text
          </WppTypography>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Checked</span>
          <span slot="caption">Caption</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Checked</span>
          <span slot="caption">Caption</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Checked</span>
          <span slot="caption">Caption</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Checked</span>
          <span slot="caption">Caption</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="s"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppIconMail slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="s"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppIconMail slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="s"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppIconMail slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="s"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppIconMail slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <WppIconMail slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <WppIconMail slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <WppIconMail slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <WppIconMail slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <!-- avatar 2 line, subtitle, tag -->
      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <!-- avatar 2 line, subtitle, text -->
      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppTypography slot="right" type="s-body">
            Text
          </WppTypography>

          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppTypography slot="right" type="s-body">
            Text
          </WppTypography>

          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppTypography slot="right" type="s-body">
            Text
          </WppTypography>

          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppTypography slot="right" type="s-body">
            Text
          </WppTypography>

          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <WppTypography slot="right" type="s-body">
            Text
          </WppTypography>

          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <WppTypography slot="right" type="s-body">
            Text
          </WppTypography>

          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <WppTypography slot="right" type="s-body">
            Text
          </WppTypography>

          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppAvatar size="xs" variant="square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
            slot="left" />
          <WppTypography slot="right" type="s-body">
            Text
          </WppTypography>

          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Text</span>
          <span slot="caption">Caption</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <WppListItem value="12345" selectable class="item" @wppChangeListItem="handleListItemClick">
        <span slot="label">Selectable Item</span>
        <span slot="caption">Caption</span>
        <WppIconChevron slot="right" />
        <span slot="subtitle">Subtitle</span>
      </WppListItem>

      <WppListItem class="item" selectable multiple>
        <span slot="label">Menu context example</span>
        <span slot="caption">Events check</span>
        <WppMenuContext slot="right">
          <WppActionButton slot="trigger-element" variant="secondary">
            <WppIconMore slot="icon-start" @click="() => console.log('Clicked icon more')" />
          </WppActionButton>
          <div>
            <WppListItem @click="() => console.log('Clicked item 1')">
              <p slot="label">Item 1</p>
              <span slot="subtitle">Subtitle</span>
            </WppListItem>
            <WppListItem @click="() => console.log('Clicked item 2')">
              <p slot="label">Item 2</p>
              <span slot="subtitle">Subtitle</span>
            </WppListItem>
          </div>
        </WppMenuContext>
        <span slot="subtitle">Subtitle</span>
      </WppListItem>
    </div>

    <div class="items">
      <h3>Truncations</h3>
      <div class="headers">
        <WppTypography slot="header" type="s-strong"> Default </WppTypography>
        <WppTypography slot="header" type="s-strong"> Non-Interactive </WppTypography>
        <WppTypography slot="header" type="s-strong"> Checked </WppTypography>
        <WppTypography slot="header" type="s-strong"> Disabled </WppTypography>
      </div>
      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppIconMail slot="left" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppIconMail slot="left" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppIconMail slot="left" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppIconMail slot="left" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppIconAvailableCheckmark slot="left" />
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppIconAvailableCheckmark slot="left" />
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppIconAvailableCheckmark slot="left" />
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppIconAvailableCheckmark slot="left" />
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item" multiple>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive multiple>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" multiple checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" multiple disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppToggle slot="right" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppToggle slot="right" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppToggle slot="right" checked />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppToggle slot="right" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <WppIconMail slot="left" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <WppIconMail slot="left" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <WppIconMail slot="left" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <WppIconMail slot="left" />
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>
    </div>

    <div class="items">
      <h3>Truncations</h3>
      <div class="headers">
        <WppTypography slot="header" type="s-strong"> Default </WppTypography>
        <WppTypography slot="header" type="s-strong"> Non-Interactive </WppTypography>
        <WppTypography slot="header" type="s-strong"> Checked </WppTypography>
        <WppTypography slot="header" type="s-strong"> Disabled </WppTypography>
      </div>
      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item" multiple>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive multiple>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" multiple checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" multiple disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item" selectable multiple>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive selectable multiple>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" selectable multiple checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" selectable multiple disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppAvatar size="s"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppIconMail slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppAvatar size="s"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppIconMail slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppAvatar size="s"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppIconMail slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppAvatar size="s"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <WppIconMail slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div class="variants">
        <WppListItem class="item">
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" nonInteractive>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" checked>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem class="item" disabled>
          <span slot="label">Lorem ipsum dolor sit amet, consectetur</span>
          <span slot="caption">Lorem ipsum dolor sit amet, consectetur</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>
    </div>

    <div class="items" style="width: 100%">
      <h3>With Dynamic Width: 40% of parent container which expands all width. Also the tooltip is placed on top.</h3>
      <div class="variants" style="flex-direction: column">
        <WppListItem :labelTooltipConfig="{ placement: 'top' }" class="customItem">
          <span slot="label">Regular item with truncation because we need to allow more width</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
        <WppListItem :labelTooltipConfig="{ placement: 'top' }" class="customItem">
          <WppIconMail slot="left" />
          <span slot="label">Regular item with truncation because we need to allow more width</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
        <WppListItem :labelTooltipConfig="{ placement: 'top' }" class="customItem">
          <span slot="label">Regular item with truncation because we need to allow more width</span>
          <WppIconAvailableCheckmark slot="left" />
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem :labelTooltipConfig="{ placement: 'top' }" class="customItem">
          <span slot="label">Regular item with truncation because we need to allow more width</span>
          <WppIconChevron slot="right" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem :labelTooltipConfig="{ placement: 'top' }" class="customItem">
          <span slot="label">Regular item with truncation because we need to allow more width</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem :labelTooltipConfig="{ placement: 'top' }" class="customItem">
          <span slot="label">Regular item with truncation because we need to allow more width</span>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem :labelTooltipConfig="{ placement: 'top' }" class="customItem">
          <span slot="label">Regular item with truncation because we need to allow more width</span>
          <WppActionButton variant="secondary" slot="right">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem :labelTooltipConfig="{ placement: 'top' }" class="customItem" multiple>
          <span slot="label">Regular item with truncation because we need to allow more width</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem :labelTooltipConfig="{ placement: 'top' }" class="customItem">
          <WppToggle slot="right" />
          <span slot="label">Regular item with truncation because we need to allow more width</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem :labelTooltipConfig="{ placement: 'top' }" class="customItem">
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="label">Regular item with truncation because we need to allow more width</span>
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem :labelTooltipConfig="{ placement: 'top' }" class="customItem">
          <WppAvatar size="xs"
            src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
            slot="left" />
          <span slot="label">Regular item with truncation because we need to allow more width</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>

        <WppListItem :labelTooltipConfig="{ placement: 'top' }" class="customItem">
          <WppIconMail slot="left" />
          <span slot="label">Regular item with truncation because we need to allow more width</span>
          <WppTag slot="right" label="Positive" variant="positive" />
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.customItem {
  width: 40%;
  margin-bottom: 10px;

  --wpp-list-item-width: 100%;
}

.item {
  margin-bottom: 10px;
}

.items {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.headers {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
}

.variants {
  display: flex;
  flex-direction: row;
}
</style>
