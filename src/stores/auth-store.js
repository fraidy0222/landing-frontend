import { defineStore, createPinia } from "pinia";
import { api } from "src/boot/axios";
import handleHttpRequest from "src/composables/handleHttpRequest";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const { handleErrors, isLoading } = handleHttpRequest();

export const authStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    isLoading: isLoading,
    userRole: null,
  }),

  getters: {
    user: (state) => state.authUser,
    role: (state) => state.userRole,
  },

  actions: {
    async login(data) {
      this.isLoading = true;
      await api.get("/sanctum/csrf-cookie").then((response) => {
        api
          .post("/login", data)
          .then((response) => {
            this.getUser();
            localStorage.setItem("auth", "true");
            this.router.push("/administracion");
            this.isLoading = false;
          })
          .catch((error) => {
            handleErrors(error);
            localStorage.removeItem("auth", "false");
            this.isLoading = false;
          });
      });
      this.isLoading = false;
    },

    async getUser() {
      await api
        .get("/api/user")
        .then((response) => {
          localStorage.setItem("userRole", response.data.role);
          // localStorage.setItem("authUser", response.data);
          this.authUser = response.data;
          // this.userRole = response.data.role;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem("auth");
            localStorage.removeItem("userRole");
            // localStorage.setItem("authUser", response.data);
            this.authUser = null;
            this.userRole = null;
            this.isLoading = false;
            this.router.replace({ name: "Login" });
          }
        });
    },

    logout() {
      api.post("/logout").then((response) => {
        this.authUser = null;
        this.userRole = null;
        this.isLoading = false;
        localStorage.removeItem("userRole");
        localStorage.removeItem("auth");
        localStorage.removeItem("authUser");
        this.router.push("/");
      });
    },
  },
  persist: true,
});
