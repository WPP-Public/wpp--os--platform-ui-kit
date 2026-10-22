import { h } from '@stencil/core';
export function renderVideoCurrentTimeComponent(time, label) {
  return (h("wpp-typography-v4-6-0", { class: "video-time", type: "xs-body", part: "time" }, h("span", { role: "timer", "aria-label": `${label} ${time}` }, time)));
}
