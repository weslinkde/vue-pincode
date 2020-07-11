/** COMMON START **/
import Vue from "vue";

Vue.config.productionTip = false;

/** COMMON END **/

import VuePincode from "./components/VuePincode";

// Declare install function executed by Vue.use()
let install = function(Vue) {
  if (install.installed) return;

  install.installed = true;
  Vue.component("VuePincode", VuePincode);
};

// Create module definition for Vue.use()
const plugin = {
  install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default {
  VuePincode: VuePincode,
  install: install
};
