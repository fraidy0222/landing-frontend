import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import handleHttpRequest from "src/composables/handleHttpRequest";

const { handleErrors, isLoading } = handleHttpRequest();

export const authStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    isLoading: isLoading,
  }),

  getters: {
    user: (state) => state.authUser,
  },

  actions: {
    async getToken() {
      await api.get("/sanctum/csrf-cookie");
    },

    async login(data) {
      this.isLoading = true;
      await api.get("/sanctum/csrf-cookie").then((response) => {
        api
          .post("/login", data)
          .then((response) => {
            localStorage.setItem("auth", "true");
            this.router.push("/administracion");
            this.isLoading = true;
          })
          .catch((error) => {
            console.log(error);
            handleErrors(error);
            this.isLoading = false;
          });
      });
      this.isLoading = false;
    },

    async getUser() {
      await api
        .get("/api/user")
        .then((response) => {
          this.authUser = response.data;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem("auth");
            this.authUser = null;
            this.isLoading = false;
            this.router.push({ name: "Login" });
          }
        });
    },

    logout() {
      api.post("/logout").then((response) => {
        this.authUser = null;
        this.isLoading = false;
        localStorage.removeItem("auth");
        this.router.push("/");
      });
    },
  },
});
