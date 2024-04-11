<template>
  <!-- Movil -->
  <div class="md:tw-hidden">
    <q-card bordered>
      <!-- <q-card-section class="q-pb-sm">
        <q-skeleton type="text" height="50px" width="300px" />
      </q-card-section>

      <q-separator></q-separator> -->

      <q-card-section>
        <q-skeleton height="400px" square class="q-mb-md" />
        <q-skeleton type="text" height="50px" width="300px" />
        <q-skeleton type="text" width="200px" />
      </q-card-section>

      <q-card-section>
        <div v-for="(item, index) in 3" :key="index">
          <div class="tw-mb-4">
            <q-skeleton type="text" height="30px" width="200px" />
          </div>
        </div>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-actions>
        <q-skeleton type="QBtn" width="100%" />
      </q-card-actions>
    </q-card>
  </div>

  <div class="tw-hidden sm:tw-flex tw-max-w-5xl">
    <q-card bordered class="tw-w-full">
      <!-- <q-card-section class="q-pb-sm">
        <q-skeleton type="text" height="50px" width="300px" />
      </q-card-section> -->

      <!-- <q-separator></q-separator> -->

      <q-card-section>
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-flex tw-items-center tw-space-x-3">
            <q-skeleton height="100px" width="100px" />
            <div class="tw-mt-5 tw-my-4">
              <q-skeleton height="30px" width="150px" class="tw-mb-2.5" />
              <q-skeleton height="20px" width="200px" />
            </div>
          </div>
          <div>
            <q-skeleton type="QBtn"></q-skeleton>
          </div>
        </div>
      </q-card-section>

      <div class="tw-flex tw-justify-between tw-items-center tw-px-4 tw-pb-4">
        <q-skeleton type="text" height="30px" width="200px" />
        <q-skeleton type="text" height="30px" width="200px" />
        <q-skeleton type="text" height="30px" width="200px" />
      </div>
    </q-card>
  </div>
</template>

<script setup>
const props = defineProps({
  array: Number,
});
</script>
