<template>
  <q-list>
    <div v-for="(menuItem, index) in props.menuList" :key="index">
      <div v-if="!menuItem.children">
        <q-item
          :target="menuItem.target"
          clickable
          active-class="text-primary"
          exact
          v-ripple
          :to="menuItem.path"
        >
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" />
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
      </div>
      <q-list v-else>
        <q-expansion-item
          expand-separator
          :icon="menuItem.icon"
          :label="menuItem.label"
        >
          <q-item
            v-for="(item, index) in menuItem.children"
            :key="index"
            :to="item.path"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              {{ item.label }}
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </div>
  </q-list>
</template>

<script setup>
const props = defineProps({
  menuList: Array,
});
</script>
