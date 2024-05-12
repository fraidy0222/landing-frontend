<template>
  <q-card class="tw-rounded-lg">
    <q-separator></q-separator>

    <q-card-section>
      <div class="md:tw-flex md:tw-justify-between md:tw-items-center">
        <div class="md:tw-flex md:tw-items-center md:tw-space-x-3">
          <!-- Img -->
          <div>
            <q-img
              v-if="props.empresa[0]?.logo"
              :src="props.empresa[0]?.logo"
              class="tw-rounded-lg tw-h-auto md:tw-w-[120px]"
            />
            <div
              v-else
              class="tw-rounded-lg tw-h-[120px] md:tw-w-[120px] tw-bg-gray400 tw-flex tw-items-center tw-justify-center"
            >
              <q-icon name="photo_camera" size="55px" color="grey-4"></q-icon>
            </div>
          </div>
          <!-- End Img -->

          <!-- Nombre and Alias -->
          <div class="tw-mt-5 md:tw-my-4">
            <div class="tw-text-xl tw-mb-0.5 tw-font-medium">
              {{ props.empresa[0]?.nombre }}
            </div>
            <div class="tw-text-lg tw-text-gray700">
              {{ props.empresa[0]?.alias }}
            </div>
          </div>
          <!-- End Name and alias -->
        </div>

        <!-- List Show Movil  -->
        <div class="tw-flex tw-flex-col tw-gap-y-6 tw-mt-6 md:tw-hidden">
          <div class="tw-flex tw-items-center tw-gap-3">
            <q-icon name="phone" class="tw-text-xl" color="primary" />
            <div class="tw-font-medium tw-text-gray600">
              {{ props.empresa[0]?.telefono }}
            </div>
          </div>
          <div class="tw-flex tw-items-center tw-gap-3">
            <q-icon name="mail" class="tw-text-xl" color="primary" />
            <div class="tw-font-medium tw-text-gray600">
              {{ props.empresa[0]?.correo }}
            </div>
          </div>
          <div class="tw-flex tw-items-center tw-gap-3">
            <q-icon name="location_on" class="tw-text-xl" color="primary" />
            <div class="tw-font-medium tw-text-gray600">
              {{ props.empresa[0]?.direccion }}
            </div>
          </div>
        </div>
        <!-- End -->

        <!-- Desing Movil Button -->
        <div class="md:tw-hidden tw-flex tw-mt-6">
          <q-btn
            outline
            @click="emit('click')"
            color="primary"
            icon="edit"
            class="full-width"
            >Editar</q-btn
          >
        </div>
        <!-- End Desing Movil Button -->

        <div class="tw-hidden md:tw-flex">
          <q-btn
            outline
            @click="emit('click')"
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
              {{ props.empresa[0]?.telefono }}
            </div>
          </div>
          <div class="tw-flex tw-items-center tw-gap-3">
            <q-icon name="mail" class="tw-text-xl" color="primary" />
            <div class="tw-font-medium tw-text-gray600">
              {{ props.empresa[0]?.correo }}
            </div>
          </div>
          <div class="tw-flex tw-items-center tw-gap-3">
            <q-icon name="location_on" class="tw-text-xl" color="primary" />
            <div class="tw-font-medium tw-text-gray600">
              {{ props.empresa[0]?.direccion }}
            </div>
          </div>
        </div>
      </div>
      <!-- End -->
    </div>
  </q-card>
</template>

<script setup>
const props = defineProps({
  empresa: Array,
});

const emit = defineEmits(["click"]);
</script>
