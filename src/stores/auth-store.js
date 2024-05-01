import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import handleHttpRequest from "src/composables/handleHttpRequest";
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
            localStorage.setItem("auth", "true");
            localStorage.getItem("userRole");
            this.router.push("/administracion");
            this.isLoading = false;
          })
          .catch((error) => {
            handleErrors(error);
            localStorage.removeItem("auth", "false");
            localStorage.removeItem("userRole");
            localStorage.removeItem("authUser");
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
