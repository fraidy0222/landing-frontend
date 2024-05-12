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
      try {
        // Primero, obtén la cookie CSRF
        await api.get("/sanctum/csrf-cookie", {
          withCredentials: true,
        });

        // Luego, realiza el inicio de sesión
        this.isLoading = true;
        const response = await api.post("/login", data, {
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
          withCredentials: true,
        });

        // Si el inicio de sesión es exitoso, guarda los datos necesarios
        this.isLoading = false;
        localStorage.setItem("auth", "true");
        localStorage.setItem("userRole", response.data.role);
        this.authUser = response.data;
        this.router.push("/administracion");
      } catch (error) {
        // Maneja los errores si el inicio de sesión falla
        handleErrors(error);
        this.isLoading = false;
        localStorage.removeItem("auth");
        localStorage.removeItem("userRole");
        localStorage.removeItem("authUser");
      }
    },

    async getUser() {
      await api
        .get("/api/user", {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
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
      api
        .post("/logout", {
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
          withCredentials: true,
        })
        .then((response) => {
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
