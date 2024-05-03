import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import handleHttpRequest from "src/composables/handleHttpRequest";
import { Cookies } from "quasar";
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
      api.get("/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      this.isLoading = true;
      await api
        .post("/login", data, {
          headers: {
            Accept: "applications/json",
            "X-XSRF-TOKEN": this.getCookie("XSRF-TOKEN"),
          },
          withCredentials: true,
        })
        .then((response) => {
          this.isLoading = false;
          localStorage.setItem("auth", "true");
          localStorage.getItem("userRole");
          this.router.push("/administracion");
        })
        .catch((error) => {
          handleErrors(error);
          localStorage.removeItem("auth", "false");
          localStorage.removeItem("userRole");
          localStorage.removeItem("authUser");
          this.isLoading = true;
        });
    },

    getCookie(cookie) {
      return Cookies.get(cookie);
    },

    async getUser() {
      await api
        .get("/api/user", {
          withCredentials: true,
          headers: {
            Accept: "applications/json",
            "X-XSRF-TOKEN": this.getCookie("XSRF-TOKEN"),
          },
        })
        .then((response) => {
          localStorage.setItem("userRole", response.data.role);
          localStorage.setItem("authUser", JSON.stringify(this.authUser));
          this.authUser = response.data;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem("auth");
            localStorage.removeItem("userRole");
            localStorage.removeItem("authUser");
            this.authUser = null;
            this.userRole = null;
            this.isLoading = false;
            this.router.push({ name: "Login" });
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

    getLocalData() {
      this.authUser = JSON.parse(localStorage.getItem("authUser"));
      this.userRole = localStorage.getItem("userRole");
    },
  },
  persist: true,
});
