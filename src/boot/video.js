import { boot } from "quasar/wrappers";
import VueVideoPlayer from "@videojs-player/vue";
import "video.js/dist/video-js.css";

import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.use(VueVideoPlayer);
  app.use(VuePlyr, {
    plyr: {
      fullscreen: { enabled: true },
    },
  });
});
