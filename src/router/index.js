import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const auth = localStorage.getItem("auth");
    const userRole = localStorage.getItem("userRole");

    if (to.meta.requireAuth) {
      if (!auth) {
        next({ path: "/" });
      } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
        next({ path: "/403" });
        // return false;
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return Router;
});
