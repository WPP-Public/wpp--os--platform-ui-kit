import { html } from 'lit-html';
import { DEFAULT_PLAYBACK_RATES, LOCALES_DEFAULTS } from './const';
const TRACK = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const SHORT_TRACK = 'https://www.w3schools.com/html/horse.mp3';
/** `ariaProps` defaults to `{}`; these are the values the player falls back to when it is empty. */
const DEFAULT_ARIA_PROPS = { role: 'group', label: LOCALES_DEFAULTS.hostAriaLabel };
const meta = {
  title: 'Design System/Components/Data display/Audio Player',
  component: 'wpp-audio-player',
  parameters: {
    controls: { exclude: ['autoplay', 'loop', 'preload'] },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL, or array of fallback URLs, for the audio source',
      table: {
        type: { summary: 'string | string[]' },
        defaultValue: { summary: "''" },
      },
    },
    type: {
      control: 'text',
      description: 'Optional MIME type hint for each source, matched to `src` by index. Mainly useful with fallback sources',
      table: {
        type: { summary: 'AudioSourceType | AudioSourceType[]' },
        defaultValue: { summary: 'undefined' },
      },
    },
    autoplay: {
      control: 'boolean',
      description: 'Starts playback once the metadata is loaded. Browsers may block it without a user gesture',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loop: {
      control: 'boolean',
      description: 'Restarts the track from the beginning when it reaches the end',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    preload: {
      control: 'inline-radio',
      options: ['auto', 'metadata', 'none'],
      description: 'Preferred loading behaviour',
      table: {
        type: { summary: "'auto' | 'metadata' | 'none'" },
        defaultValue: { summary: "'metadata'" },
      },
    },
    playbackRates: {
      control: 'object',
      description: 'Speeds offered by the playback speed menu',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[0.5, 1.0, 1.25, 1.5, 2.0]' },
      },
    },
    playbackRate: {
      control: 'number',
      description: 'Current playback speed',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    volume: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Current volume, from 0 (muted) to 1',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    locales: {
      control: 'object',
      description: 'Overrides for the labels read by screen readers and shown in the tooltips',
      table: {
        type: { summary: 'Partial<AudioPlayerLocales>' },
        defaultValue: { summary: JSON.stringify(LOCALES_DEFAULTS, null, 2) },
      },
    },
    ariaProps: {
      control: 'object',
      description: 'The player `aria-` props, e.g. `label` for its accessible name',
      table: {
        type: { summary: 'AriaProps' },
        defaultValue: { summary: "{ role: 'group', label: locales.hostAriaLabel }" },
      },
    },
  },
};
export default meta;
export const Default = {
  render: args => html `
    <wpp-audio-player-v4-6-0
      .src=${args.src}
      .type=${args.type}
      .autoplay=${args.autoplay}
      .loop=${args.loop}
      .preload=${args.preload}
      .playbackRates=${args.playbackRates}
      .playbackRate=${args.playbackRate}
      .volume=${args.volume}
      .locales=${args.locales}
      .ariaProps=${args.ariaProps}
    ></wpp-audio-player-v4-6-0>
  `,
  args: {
    src: TRACK,
    autoplay: false,
    loop: false,
    preload: 'metadata',
    playbackRates: DEFAULT_PLAYBACK_RATES,
    playbackRate: 1,
    volume: 1,
    locales: LOCALES_DEFAULTS,
    ariaProps: DEFAULT_ARIA_PROPS,
  },
};
export const AutoplayMuted = {
  name: 'Autoplay (Muted)',
  render: Default.render,
  args: {
    ...Default.args,
    autoplay: true,
    volume: 0,
  },
};
export const Loop = {
  render: Default.render,
  args: {
    ...Default.args,
    src: SHORT_TRACK,
    loop: true,
  },
};
