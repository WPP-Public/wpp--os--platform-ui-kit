import { createApp } from "vue";

import { ComponentLibrary } from "@platform-ui-kit/components-library-vue";

import "@platform-ui-kit/components-library/dist/platform-ui-kit/wpp-theme.css";
import "@platform-ui-kit/components-library/dist/platform-ui-kit/global.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(ComponentLibrary);
app.use(router);

app.mount("#app");
