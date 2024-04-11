<template>
  <q-btn
    :icon="props.icon"
    :color="props.color"
    :text-color="props.textColor"
    :label="props.label"
    :size="props.size"
    @click="emit('click')"
    :flat="props.flat"
    :dense="props.dense"
    :round="props.round"
  >
    <q-tooltip class="text-subtitle2">
      {{ props.tooltip }}
    </q-tooltip>
  </q-btn>
</template>

<script setup>
const props = defineProps({
  color: String,
  textColor: String,
  size: String,
  label: {
    type: String,
    default: "",
  },
  icon: String,
  flat: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  tooltip: String,
});

const emit = defineEmits(["click"]);
</script>
