<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="column">
          <div class="row">
            <q-card
              square
              class="shadow-24"
              style="width: 400px; height: 440px"
            >
              <q-card-section class="bg-deep-purple-7">
                <h4 class="text-h5 text-white q-my-md">Alta Gama S.R.L.</h4>
              </q-card-section>
              <q-card-section>
                <q-form
                  @submit.prevent="login(userForm)"
                  class="q-gutter-xs col-xs-12 col-sm-12 col-md-6 q-mt-lg q-pa-sm"
                >
                  <q-input
                    outlined
                    v-model="userForm.username"
                    label="Nombre de Usuario"
                    type="text"
                    lazy-rules
                    :rules="[rules.required]"
                  >
                    <template v-slot:append>
                      <q-icon name="account_circle" />
                    </template>
                  </q-input>

                  <br />

                  <q-input
                    outlined
                    type="password"
                    v-model="userForm.password"
                    label="Contraseña"
                    lazy-rules
                    :rules="[rules.required]"
                  >
                    <template v-slot:append>
                      <q-icon name="password" />
                    </template>
                  </q-input>

                  <q-btn
                    type="submit"
                    :disable="isLoading"
                    :loading="isLoading"
                    size="lg"
                    color="secondary"
                    class="full-width text-white q-ma-lg"
                    label="Entrar"
                  />
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { authStore } from "src/stores/auth-store";
import rules from "src/utils/rules";
import { storeToRefs } from "pinia";

const $q = useQuasar();
const userForm = ref({
  email: "",
  password: "",
});

const { isLoading } = storeToRefs(authStore());
const { login } = authStore();
</script>
