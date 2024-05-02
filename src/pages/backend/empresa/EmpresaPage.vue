<template>
  <div v-if="isLoading"></div>
  <div
    v-else-if="hasEmpresa"
    class="tw-flex tw-justify-center tw-h-screen tw-items-center"
  >
    <div class="tw-flex tw-flex-col tw-items-center">
      <img src="src/assets/empty.svg" alt="" class="tw-h-auto tw-w-[300px]" />
      <div class="tw-text-2xl tw-font-medium tw-leading-6">
        No existe la empresa
      </div>
      <div
        class="tw-text-sm tw-font-medium tw-text-gray500 tw-py-3.5 tw-text-center tw-w-[290px]"
      >
        Para crear una empresa de un click en el botón CREAR EMPRESA
      </div>
      <div>
        <q-btn
          @click="isOpenStoreEmpresaDialog = true"
          icon="add"
          label="Crear empresa"
          color="primary"
        ></q-btn>
      </div>
    </div>
  </div>

  <div v-else class="tw-max-w-5xl tw-mx-auto tw-mt-6 tw-px-4">
    <!-- Primer Card de la Empresa -->
    <q-card class="tw-rounded-lg">
      <q-separator></q-separator>

      <q-card-section>
        <div class="md:tw-flex md:tw-justify-between md:tw-items-center">
          <div class="md:tw-flex md:tw-items-center md:tw-space-x-3">
            <!-- Img -->
            <div>
              <q-img
                :src="empresa[0]?.logo"
                class="tw-rounded-lg tw-h-auto md:tw-w-[120px]"
              />
            </div>
            <!-- End Img -->

            <!-- Nombre and Alias -->
            <div class="tw-mt-5 md:tw-my-4">
              <div class="tw-text-xl tw-mb-0.5 tw-font-medium">
                {{ empresa[0]?.nombre }}
              </div>
              <div class="tw-text-lg tw-text-gray700">
                {{ empresa[0]?.alias }}
              </div>
            </div>
            <!-- End Name and alias -->
          </div>

          <!-- List Show Movil  -->
          <div class="tw-flex tw-flex-col tw-gap-y-6 tw-mt-6 md:tw-hidden">
            <div class="tw-flex tw-items-center tw-gap-3">
              <q-icon name="phone" class="tw-text-xl" color="primary" />
              <div class="tw-font-medium tw-text-gray600">
                {{ empresa[0]?.telefono }}
              </div>
            </div>
            <div class="tw-flex tw-items-center tw-gap-3">
              <q-icon name="mail" class="tw-text-xl" color="primary" />
              <div class="tw-font-medium tw-text-gray600">
                {{ empresa[0]?.correo }}
              </div>
            </div>
            <div class="tw-flex tw-items-center tw-gap-3">
              <q-icon name="location_on" class="tw-text-xl" color="primary" />
              <div class="tw-font-medium tw-text-gray600">
                {{ empresa[0]?.direccion }}
              </div>
            </div>
          </div>
          <!-- End -->

          <!-- Desing Movil Button -->
          <div class="md:tw-hidden tw-flex tw-mt-6">
            <!-- <q-btn
              v-if="hasEmpresa"
              outline
              @click="isOpenStoreEmpresaDialog = true"
              color="primary"
              icon="add"
              class="full-width"
              >Crear</q-btn
            > -->
            <q-btn
              outline
              @click="editEmpresa"
              color="primary"
              icon="edit"
              class="full-width"
              >Editar</q-btn
            >
          </div>
          <!-- End Desing Movil Button -->

          <div class="tw-hidden md:tw-flex">
            <!-- <q-btn
              v-if="hasEmpresa"
              outline
              @click="isOpenStoreEmpresaDialog = true"
              color="primary"
              icon="add"
              class="full-width"
              >Crear</q-btn
            > -->
            <q-btn
              outline
              @click="editEmpresa"
              color="primary"
              icon="edit"
              class="full-width"
              >Editar</q-btn
            >
          </div>
        </div>
      </q-card-section>

      <div>
        <!-- List  -->
        <div class="tw-px-6">
          <div
            class="tw-hidden md:tw-pb-6 md:tw-pt-1.5 md:tw-flex md:tw-items-center md:tw-justify-between tw-gap-x-6"
          >
            <div class="tw-flex tw-items-center tw-gap-3">
              <q-icon name="phone" class="tw-text-xl" color="primary" />
              <div class="tw-font-medium tw-text-gray600">
                {{ empresa[0]?.telefono }}
              </div>
            </div>
            <div class="tw-flex tw-items-center tw-gap-3">
              <q-icon name="mail" class="tw-text-xl" color="primary" />
              <div class="tw-font-medium tw-text-gray600">
                {{ empresa[0]?.correo }}
              </div>
            </div>
            <div class="tw-flex tw-items-center tw-gap-3">
              <q-icon name="location_on" class="tw-text-xl" color="primary" />
              <div class="tw-font-medium tw-text-gray600">
                {{ empresa[0]?.direccion }}
              </div>
            </div>
          </div>
        </div>
        <!-- End -->
      </div>
    </q-card>

    <!-- Segundo y Tercer Card de la Empresa -->
    <div class="tw-my-6">
      <div class="tw-col-span-3">
        <!-- Info Empresa -->
        <q-card>
          <q-card-section class="row tw-justify-between">
            <div class="text-h6">Información de la Empresa</div>
            <div>
              <q-btn
                v-if="!hasValue"
                outline
                color="primary"
                icon="add"
                @click="isOpenStoreInfoDialog = true"
                >Crear</q-btn
              >
              <q-btn
                v-else
                outline
                color="primary"
                icon="edit"
                @click="editInfo"
                >Editar</q-btn
              >
            </div>
          </q-card-section>

          <q-separator />
          <div class="tw-px-4 tw-py-4 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4">
            <dt class="tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
              Director
            </dt>
            <dd
              class="tw-mt-1 tw-text-sm tw-leading-6 tw-text-gray-700 sm:tw-col-span-2 sm:tw-mt-0"
            >
              {{ empresa[0]?.director }}
            </dd>
          </div>
          <div class="tw-px-4 tw-py-4 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4">
            <dt class="tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
              Slogan
            </dt>
            <dd
              class="tw-mt-1 tw-text-sm tw-leading-6 tw-text-gray-700 sm:tw-col-span-2 sm:tw-mt-0"
            >
              {{ empresa[0]?.slogan }}
            </dd>
          </div>
          <div class="tw-px-4 tw-py-4 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4">
            <dt class="tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
              Resumen
            </dt>
            <dd
              class="tw-mt-1 tw-text-sm tw-leading-6 tw-text-gray-700 sm:tw-col-span-2 sm:tw-mt-0 tw-break-words"
            >
              {{ empresa[0]?.resumen }}
            </dd>
          </div>
          <div class="tw-px-4 tw-py-4 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4">
            <dt class="tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
              Redes Sociales
            </dt>
            <dd
              class="tw-flex tw-items-center tw-gap-4 tw-mt-1 tw-text-sm tw-leading-6 tw-text-gray-700 sm:tw-col-span-2 sm:tw-mt-0"
            >
              <a
                target="_blank"
                v-if="empresa[0]?.facebook"
                :href="empresa[0]?.facebook"
              >
                <q-icon name="facebook" color="primary" size="30px"></q-icon>
              </a>
              <a
                target="_blank"
                v-if="empresa[0]?.youtube"
                :href="empresa[0]?.youtube"
              >
                <q-icon
                  name="mdi-youtube"
                  color="negative"
                  size="33px"
                ></q-icon>
              </a>
              <a
                target="_blank"
                v-if="empresa[0]?.twitter"
                :href="empresa[0]?.twitter"
              >
                <q-icon name="mdi-twitter" color="primary" size="30px"></q-icon>
              </a>
              <a
                target="_blank"
                v-if="empresa[0]?.linkedin"
                :href="empresa[0]?.linkedin"
              >
                <q-icon
                  name="mdi-linkedin"
                  color="primary"
                  size="30px"
                ></q-icon>
              </a>
            </dd>
          </div>
        </q-card>
        <!-- End Info Empresa -->

        <!-- Video Institucional -->
        <div class="tw-mt-5">
          <q-card>
            <q-card-section class="row tw-justify-between">
              <div class="text-h6">Video Institucional</div>
              <div class="tw-flex tw-items-center tw-gap-x-3">
                <q-circular-progress
                  v-if="showProgressBar"
                  rounded
                  show-value
                  :value="progress"
                  size="50px"
                  color="primary"
                >
                  {{ progress }}%
                </q-circular-progress>
                <q-btn
                  q
                  v-show="!empresa[0]?.video_institucional"
                  icon="upload"
                  @click="uploadVideo"
                  color="primary"
                  label="Subir"
                  outline
                ></q-btn>
                <q-btn
                  v-show="empresa[0]?.video_institucional"
                  icon="delete"
                  @click="isOpenDeleteVideo = true"
                  color="negative"
                  label="Eliminar"
                  outline
                ></q-btn>
              </div>
            </q-card-section>

            <q-separator />
            <q-card-section>
              <div class="tw-mb-4">
                <q-file
                  name="Video"
                  outlined
                  v-model="video_institucional"
                  label="Video"
                  clearable
                  accept="video/*"
                  max-files="1"
                  counter
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>

              <div v-if="empresa[0]?.video_institucional">
                <q-video
                  :src="empresa[0]?.video_institucional"
                  :ratio="16 / 9"
                  loading="lazy"
                  :autoplay="false"
                ></q-video>
              </div>
              <div v-else>
                <div
                  class="tw-flex tw-text-gray500 tw-items-center tw-justify-center tw-text-lg tw-leading-6"
                >
                  No existe video
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <!-- End Video Institucional -->
      </div>
    </div>
  </div>

  <div class="q-pa-md">
    <!-- Store Empresa -->
    <q-dialog v-model="isOpenStoreEmpresaDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Crear Empresa</div>
        </q-card-section>

        <q-form @submit.prevent="storeEmpresa">
          <q-card-section class="q-pt-none">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formEmpresa.nombre"
                  label="Nombre"
                  type="text"
                  lazy-rules
                  :rules="[rules.required]"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formEmpresa.alias"
                  label="Alias"
                  type="text"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formEmpresa.telefono"
                  label="Teléfono"
                  type="text"
                  mask="+## #### - ####"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formEmpresa.correo"
                  label="Correo"
                  type="text"
                  lazy-rules
                  :rules="[rules.email]"
                />
              </div>

              <div class="col-xs-12">
                <q-input
                  outlined
                  v-model="formEmpresa.direccion"
                  label="Dirección"
                  type="text"
                />
              </div>

              <div class="col-xs-12 q-mt-sm">
                <q-file
                  name="logo"
                  outlined
                  v-model="formEmpresa.logo"
                  label="Logo"
                  clearable
                  accept="image/*"
                  max-files="1"
                  counter
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancelar"
              color="negative"
              @click="cleanFormStore"
            />
            <q-btn
              type="submit"
              flat
              label="Guardar"
              color="primary"
              :loading="isLoadingStoreEmpresaForm"
              :disable="isLoadingStoreEmpresaForm"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- Edit Empresa -->
    <q-dialog v-model="isOpenEditEmpresaDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Empresa</div>
        </q-card-section>

        <q-form @submit.prevent="updateEmpresa">
          <q-card-section class="q-pt-none">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formEmpresa.nombre"
                  label="Nombre"
                  type="text"
                  lazy-rules
                  :rules="[rules.required]"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formEmpresa.alias"
                  label="Alias"
                  type="text"
                  lazy-rules
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formEmpresa.telefono"
                  label="Teléfono"
                  type="text"
                  lazy-rules
                  mask="+## #### - ####"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formEmpresa.correo"
                  label="Correo"
                  type="text"
                  lazy-rules
                  :rules="[rules.email]"
                />
              </div>

              <div class="col-xs-12">
                <q-input
                  outlined
                  v-model="formEmpresa.direccion"
                  label="Dirección"
                  type="text"
                  lazy-rules
                />
              </div>

              <div class="col-xs-12 q-mt-sm">
                <q-file
                  name="logo"
                  outlined
                  v-model="formEmpresa.logo"
                  label="Logo"
                  clearable
                  accept="image/*"
                  max-files="1"
                  counter
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="negative" v-close-popup />
            <q-btn
              type="submit"
              flat
              label="Guardar"
              color="primary"
              :loading="isLoadingStoreEmpresaForm"
              :disable="isLoadingStoreEmpresaForm"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- Store Información -->
    <q-dialog v-model="isOpenStoreInfoDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Crear Información</div>
        </q-card-section>

        <q-form @submit.prevent="storeInfo">
          <q-card-section class="q-pt-none">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formInfo.director"
                  label="Nombre del director"
                  type="text"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formInfo.slogan"
                  label="Slogan"
                  type="text"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formInfo.facebook"
                  label="Facebook"
                  type="text"
                  hint="http://facebook.com"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formInfo.twitter"
                  label="Twitter"
                  type="text"
                  hint="http://twitter.com"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formInfo.linkedin"
                  label="Linkedin"
                  type="text"
                  hint="http://linkedin.com"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formInfo.youtube"
                  label="Youtube"
                  type="text"
                  hint="http://youtube.com"
                />
              </div>
              <div class="col-xs-12">
                <q-input
                  outlined
                  v-model="formInfo.resumen"
                  label="Resumen"
                  type="textarea"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="negative" v-close-popup />
            <q-btn
              type="submit"
              flat
              label="Guardar"
              color="primary"
              :loading="isLoadingStoreInfoForm"
              :disable="isLoadingStoreInfoForm"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- Edit Información -->
    <q-dialog v-model="isOpenEditInfoDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Editar Información</div>
        </q-card-section>

        <q-form @submit.prevent="updateInfo">
          <q-card-section class="q-pt-none">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formInfo.director"
                  label="Nombre del director"
                  type="text"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formInfo.slogan"
                  label="Slogan"
                  type="text"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formInfo.facebook"
                  label="Facebook"
                  type="text"
                  hint="http://facebook.com"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formInfo.twitter"
                  label="Twitter"
                  type="text"
                  hint="http://twitter.com"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formInfo.linkedin"
                  label="Linkedin"
                  type="text"
                  hint="http://linkedin.com"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  outlined
                  v-model="formInfo.youtube"
                  label="Youtube"
                  type="text"
                  hint="http://youtube.com"
                />
              </div>
              <div class="col-xs-12">
                <q-input
                  outlined
                  v-model="formInfo.resumen"
                  label="Resumen"
                  type="textarea"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="negative" v-close-popup />
            <q-btn
              type="submit"
              flat
              label="Guardar"
              color="primary"
              :loading="isLoadingStoreInfoForm"
              :disable="isLoadingStoreInfoForm"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>

  <!-- Delete Video Dialog -->
  <DialogDelete
    :is-open="isOpenDeleteVideo"
    :is-delete-loading="isLoadingDeleteVideo"
    @closeDialog="isOpenDeleteVideo = false"
    @delete="deleteVideo"
    body-label="¿Estás seguro de eliminar este video?"
  />
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import rules from "src/utils/rules";
import { computed } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";
import DialogDelete from "src/components/Dialogs/DialogDelete.vue";
import handleHttpRequest from "src/composables/handleHttpRequest";
import {
  errorNotifyConfig,
  successNotifyConfig,
} from "src/utils/notification/notification";

const empresa = ref([]);
const $q = useQuasar();
const isLoading = ref(false);
const isLoadingEmpresa = ref(false);

const isOpenStoreEmpresaDialog = ref(false);
const isLoadingStoreEmpresaForm = ref(false);

const isOpenEditEmpresaDialog = ref(false);
const isLoadingEditEmpresaForm = ref(false);

const isOpenStoreInfoDialog = ref(false);
const isLoadingStoreInfoForm = ref(false);
const isOpenEditInfoDialog = ref(false);

const showProgressBar = ref(false);
const progress = ref(0);
const progressLabel = ref("");

const isOpenDeleteVideo = ref(false);
const isLoadingDeleteVideo = ref(false);

const { handleErrors } = handleHttpRequest();

const formEmpresa = ref({
  nombre: "",
  alias: "",
  logo: null,
  telefono: "",
  direccion: "",
  correo: "",
});

const formInfo = ref({
  director: "",
  slogan: "",
  resumen: "",
  facebook: "",
  twitter: "",
  linkedin: "",
  youtube: "",
});

const video_institucional = ref(null);

onMounted(() => {
  getEmpresa();
});

const hasEmpresa = computed(() => {
  return empresa.value[0] === null || empresa.value[0] === undefined;
});

const hasValue = computed(() => {
  return empresa.value.some((empresa) => {
    return ["director", "slogan", "resumen"].some((propiedad) => {
      const valor = empresa[propiedad];
      return valor !== null && valor.trim() !== "";
    });
  });
});

const getEmpresa = async () => {
  // isLoading.value = true;
  isLoading.value = $q.loading.show({
    message: "Cargando. Por favor espere...",
    background: "gray-10",
  });
  isLoadingEmpresa.value = true;
  api
    .get("/api/empresa")
    .then((response) => {
      $q.loading.hide();
      // isLoading.value = false;
      isLoading.value = $q.loading.hide();
      isLoadingEmpresa.value = false;
      empresa.value = response.data.empresa;
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingEmpresa.value = false;
    });
};

const storeEmpresa = async () => {
  const formData = new FormData();

  Object.keys(formEmpresa.value).forEach((key) => {
    const value = formEmpresa.value[key];
    if (value !== null && value !== undefined) {
      if (key === "logo") {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });

  isLoadingStoreEmpresaForm.value = true;
  api
    .post("/api/storeEmpresa", formData)
    .then((response) => {
      isLoadingStoreEmpresaForm.value = false;
      isOpenStoreEmpresaDialog.value = false;
      successNotifyConfig(response.data.message);
      getEmpresa();
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingStoreEmpresaForm.value = false;
    });
};

function cleanFormStore() {
  formEmpresa.value = null;
  isOpenStoreEmpresaDialog.value = false;
}
const editEmpresa = () => {
  formEmpresa.value = {
    id: empresa.value[0].id,
    nombre: empresa.value[0].nombre,
    alias: empresa.value[0].alias,
    logo: null,
    telefono: empresa.value[0].telefono,
    direccion: empresa.value[0].direccion,
    correo: empresa.value[0].correo,
  };

  isOpenEditEmpresaDialog.value = true;
};

const updateEmpresa = async () => {
  const formData = new FormData();

  Object.keys(formEmpresa.value).forEach((key) => {
    const value = formEmpresa.value[key];
    if (value !== null && value !== undefined) {
      if (key === "logo") {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });

  // console.log(formEmpresa.value);

  isLoadingEditEmpresaForm.value = true;
  api
    .post("/api/updateEmpresa/" + formEmpresa.value.id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        _method: "PUT",
      },
    })
    .then((response) => {
      isLoadingEditEmpresaForm.value = false;
      successNotifyConfig(response.data.message);
      isOpenEditEmpresaDialog.value = false;
      getEmpresa();
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingEditEmpresaForm.value = false;
    });
};

// Store info de la empresa
const storeInfo = () => {
  isLoadingStoreInfoForm.value = true;
  api
    .patch("/api/storeInfoEmpresa/" + empresa.value[0].id, formInfo.value)
    .then((response) => {
      successNotifyConfig(response.data.message);
      isLoadingStoreInfoForm.value = false;
      isOpenStoreInfoDialog.value = false;
      getEmpresa();
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingStoreInfoForm.value = false;
    });
};

const editInfo = () => {
  formInfo.value = {
    id: empresa.value[0].id,
    director: empresa.value[0].director,
    slogan: empresa.value[0].slogan,
    resumen: empresa.value[0].resumen,
    facebook: empresa.value[0].facebook,
    twitter: empresa.value[0].twitter,
    linkedin: empresa.value[0].linkedin,
    youtube: empresa.value[0].youtube,
  };
  isOpenEditInfoDialog.value = true;
};

const updateInfo = () => {
  isLoadingStoreInfoForm.value = true;

  api
    .patch("/api/updateInfoEmpresa/" + empresa.value[0].id, formInfo.value)
    .then((response) => {
      successNotifyConfig(response.data.message);
      isLoadingStoreInfoForm.value = false;
      isOpenEditInfoDialog.value = false;
      getEmpresa();
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingStoreInfoForm.value = false;
    });
};

const uploadVideo = () => {
  let formData = new FormData();

  formData.append("video_institucional", video_institucional.value);
  showProgressBar.value = true;

  api
    .post("/api/upload/" + empresa.value[0].id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        _method: "PUT",
      },
      onUploadProgress: (progressEvent) => {
        // Calcula el progreso en porcentaje
        const progressValue = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );

        // Actualiza el estado de la barra de progreso
        progress.value = progressValue;
        progressLabel.value = progressValue + "%";
      },
    })
    .then((response) => {
      successNotifyConfig(response.data.message);

      video_institucional.value = null;
      progress.value = 0;
      showProgressBar.value = false;

      getEmpresa();
    })
    .catch((error) => {
      errorNotifyConfig(error.response.data.error);
      video_institucional.value = null;
      progress.value = 0;
      showProgressBar.value = false;
    });
};

const deleteVideo = async () => {
  isLoadingDeleteVideo.value = true;
  await api
    .delete(
      "/api/deleteVideo/" + empresa.value[0].id,
      empresa.value[0].video_institucional
    )
    .then((response) => {
      successNotifyConfig(response.data.message);
      getEmpresa();
      isLoadingDeleteVideo.value = false;
      isOpenDeleteVideo.value = false;
    })
    .catch((error) => {
      errorNotifyConfig(error);
      isOpenDeleteVideo.value = false;
      isLoadingDeleteVideo.value = false;
    });
};
</script>
