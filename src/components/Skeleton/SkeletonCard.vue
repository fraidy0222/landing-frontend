<template>
  <q-card flat bordered>
    <q-card-section>
      <q-skeleton type="rect" width="160px"></q-skeleton>
    </q-card-section>

    <q-card-section>
      <div class="row q-col-gutter-md q-mb-md">
        <div
          class="col-xs-12 col-sm-6"
          v-for="(item, index) in props.array"
          :key="index"
        >
          <q-skeleton type="QInput" height="40px" />
        </div>
      </div>

      <div class="tw-flex">
        <q-skeleton type="QBtn" class="text-subtitle2 q-mr-sm" />
        <q-skeleton type="QBtn" class="text-subtitle2 q-mr-sm" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
  array: Number,
});
</script>
