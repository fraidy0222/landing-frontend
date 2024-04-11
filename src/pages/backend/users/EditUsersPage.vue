<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6"> Editar Usuario </q-card-section>
      <q-card-section>
        <q-form @submit="updateUsers">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.name"
                label="Nombre"
                type="text"
                :rules="[rules.required]"
              >
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.last_name"
                label="Apellidos"
                type="text"
                :rules="[rules.required]"
              >
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                :loading="isLoadingUser"
                outlined
                v-model="form.username"
                label="Nombre de Usuario"
                type="text"
                lazy-rules
                :rules="[rules.required]"
                @blur="verifyUser(form.username)"
                :error="hasUserError ? true : false"
                :error-message="
                  hasUserError ? 'El nombre de usuario ya existe' : ''
                "
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.password"
                label="Contraseña"
                type="password"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                :loading="isLoadingEmail"
                outlined
                v-model="form.email"
                label="Correo"
                type="email"
                :rules="[rules.required, rules.email]"
                @blur="verifyEmail(form.email)"
                :error="hasEmailError ? true : false"
                :error-message="hasEmailError ? 'El correo ya existe' : ''"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-select
                outlined
                v-model="selectRole"
                transition-show="jump-up"
                transition-hide="jump-up"
                label="Seleccione un rol"
                :options="roles"
                clearable
                :rules="[rules.requiredSelect]"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No existen elementos
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-checkbox outlined v-model="form.is_active" label="Activo" />
            </div>
          </div>

          <q-btn
            @click="$router.push({ path: '/usuarios' })"
            type="button"
            color="negative"
            class="text-white q-mr-sm"
          >
            <q-icon name="arrow_circle_left" class="q-mr-sm"></q-icon>
            Volver
          </q-btn>
          <q-btn
            type="submit"
            color="primary"
            class="text-white"
            :loading="isLoadingUpdate"
            :disable="isLoadingUpdate"
          >
            <q-icon name="save" class="q-mr-sm"></q-icon>
            Guardar
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import rules from "src/utils/rules";
import {
  successNotifyConfig,
  errorNotifyConfig,
} from "src/utils/notification/notification";

const $q = useQuasar();
const router = useRouter();
const user_id = router.currentRoute.value.params.id;
const isLoading = ref(false);
const isLoadingUpdate = ref(false);

const isLoadingUser = ref(false);
const hasUserError = ref(false);

const isLoadingEmail = ref(false);
const hasEmailError = ref(false);

const selectRole = ref(null);

const form = ref({
  name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  role: "",
  is_active: true,
});

const roles = ref(["Administrador", "Editor"]);

onMounted(() => {
  getUser();
});

const getUser = () => {
  isLoading.value = $q.loading.show({
    message: "Cargando. Por favor espere...",
    background: "gray-10",
  });
  api
    .get(`/api/users/` + user_id)
    .then((response) => {
      form.value = response.data.user;
      selectRole.value = response.data.user.role[0];
      $q.loading.hide();
      form.value.password = "";
    })
    .catch((error) => {
      errorNotifyConfig("No se encontro el elemento");
      $q.loading.hide();
    });
};

const updateUsers = () => {
  isLoadingUpdate.value = true;
  form.value.role = selectRole.value;
  api
    .put("/api/users/" + user_id, form.value)
    .then((response) => {
      isLoadingUpdate.value = false;
      successNotifyConfig(response.data.message);
      router.push({ path: "/usuarios" });
    })
    .catch((error) => {
      if (error.response.data) {
        for (let field in error.response.data.errors) {
          if (Array.isArray(error.response.data.errors[field])) {
            error.response.data.errors[field].forEach((errorMessage) => {
              errorNotifyConfig(errorMessage);
            });
          } else {
            errorNotifyConfig(error.response.data.errors[field]);
          }
        }
        isLoadingUpdate.value = false;
      }
    });
};

const verifyEmail = (email) => {
  if (/.+@.+\..+/.test(email)) {
    isLoadingEmail.value = true;
    api
      .post("/api/verify/emailById/" + user_id, { email: form.value.email })
      .then((response) => {
        isLoadingEmail.value = false;
        hasEmailError.value = false;
        successNotifyConfig(response.data.message);
      })
      .catch((error) => {
        errorNotifyConfig(error.response.data.message);
        isLoadingEmail.value = false;
        hasEmailError.value = true;
      });
  }
};

const verifyUser = (username) => {
  isLoadingUser.value = true;
  api
    .post("/api/verify/userById/" + user_id, { username: form.value.username })
    .then((response) => {
      isLoadingUser.value = false;
      hasUserError.value = false;
      successNotifyConfig(response.data.message);
    })
    .catch((error) => {
      errorNotifyConfig(error.response.data.message);
      isLoadingUser.value = false;
      hasUserError.value = true;
    });
};
</script>
