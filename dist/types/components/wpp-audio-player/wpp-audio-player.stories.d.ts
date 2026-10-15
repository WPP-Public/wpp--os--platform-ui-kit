import type { StoryObj } from '@storybook/web-components';
import type { Components } from '../../components';
declare const meta: {
  title: string;
  component: string;
  parameters: {
    controls: {
      exclude: string[];
    };
  };
  argTypes: {
    src: {
      control: "text";
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
    type: {
      control: "text";
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
    autoplay: {
      control: "boolean";
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
    loop: {
      control: "boolean";
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
    preload: {
      control: "inline-radio";
      options: string[];
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
    playbackRates: {
      control: "object";
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
    playbackRate: {
      control: "number";
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
    volume: {
      control: {
        type: "range";
        min: number;
        max: number;
        step: number;
      };
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
    locales: {
      control: "object";
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
    ariaProps: {
      control: "object";
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
  };
};
export default meta;
export declare const Default: StoryObj<Components.WppAudioPlayer>;
export declare const AutoplayMuted: StoryObj<Components.WppAudioPlayer>;
export declare const Loop: StoryObj<Components.WppAudioPlayer>;
