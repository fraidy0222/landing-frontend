<template>
  <div v-if="isLoading"></div>
  <div v-else-if="hasEmpresa">
    <EmpresaEmpty @click="isOpenStoreEmpresaDialog = true"></EmpresaEmpty>
  </div>

  <div v-else class="tw-max-w-5xl tw-mx-auto tw-mt-6 tw-px-4">
    <!-- Primer Card de la Empresa -->
    <EmpresaFistCard :empresa="empresa" @click="editEmpresa" />

    <!-- Segundo y Tercer Card de la Empresa -->
    <div class="tw-my-6">
      <div class="tw-col-span-3">
        <!-- Info Empresa -->
        <EmpresaSecondCard
          :empresa="empresa"
          @click="isOpenStoreInfoDialog = true"
          @clik="editInfo"
          :has-value="hasValue"
        />
        <!-- End Info Empresa -->

        <!-- Video Institucional -->
        <!-- <video v-if="videoUrl" ref="videoPlayer" controls>
          <source :src="videoUrl" type="video/mp4" />
        </video> -->

        <EmpresaUploadVideo :empresa="empresa" :get-empresa="getEmpresa">
          <template v-slot:video>
            <video v-if="videoUrl" ref="videoPlayer" controls>
              <source :src="videoUrl" type="video/mp4" />
            </video>
          </template>
        </EmpresaUploadVideo>
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import rules from "src/utils/rules";
import handleHttpRequest from "src/composables/handleHttpRequest";
import { successNotifyConfig } from "src/utils/notification/notification";
import EmpresaEmpty from "src/components/Empresa/EmpresaEmpty.vue";
import EmpresaFistCard from "src/components/Empresa/EmpresaFirstCard.vue";
import EmpresaSecondCard from "src/components/Empresa/EmpresaSecondCard.vue";
import EmpresaUploadVideo from "src/components/Empresa/EmpresaUploadVideo.vue";

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

const videoUrl = ref(null);
const videoPlayer = ref(null);

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
      video(empresa.value[0]);
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
  formEmpresa.value = {
    nombre: "",
    alias: "",
    logo: null,
    telefono: "",
    direccion: "",
    correo: "",
  };
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

const video = (empresa) => {
  api
    .get(`api/video/${empresa.id}`, {
      responseType: "blob",
      headers: {
        Range: "bytes=0-",
      },
    })
    .then((response) => {
      const videoBlob = new Blob([response.data], { type: "video/mp4" });
      videoUrl.value = URL.createObjectURL(videoBlob);
      videoPlayer.value.src = videoUrl.value;
    })
    .catch((error) => {
      console.error("Error al cargar el video:", error);
    });
};
</script>
