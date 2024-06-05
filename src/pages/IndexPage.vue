<template>
  <q-page class="flex flex-center">
    <!-- <q-form @submit.prevent="register">
      <div class="row">
        <div class="cols-12">
          <q-input v-model="formR.name" label="Name"></q-input>
        </div>
        <div class="cols-12">
          <q-input v-model="formR.email" label="Email"></q-input>
        </div>
        <div class="cols-12">
          <q-input v-model="formR.password" label="Password"></q-input>
        </div>
        <div class="cols-12">
          <q-input
            v-model="formR.password_confirmation"
            label="Password Confirmation"
          ></q-input>
        </div>
        <q-btn type="submit">Login</q-btn>
      </div>
    </q-form> -->
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";

const formR = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

async function register() {
  api.post("/register", formR.value).then((response) => {
    console.log(response.data);
  });
}
</script>
