<template>
  <div v-if="isLoading">
    <transition
      appear
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="tw-flex tw-h-screen tw-justify-center tw-items-center">
        <div class="loader"></div>
      </div>
    </transition>
  </div>
  <q-layout v-else>
    <header class="tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-bg-heroBg tw-z-50">
      <nav
        class="tw-flex tw-items-center tw-justify-between tw-max-w-7xl tw-p-4 tw-px-7 md:tw-px-16 tw-container tw-mx-auto"
      >
        <div class="tw-flex lg:tw-flex-1">
          <a href="#" class="-tw-m-1.5 tw-p-1.5 focus:tw-outline-none">
            <span>Gelma</span>
            <!-- <img
              class="tw-h-8 tw-w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            /> -->
          </a>
        </div>
        <div class="flex lg:tw-hidden">
          <q-btn
            flat
            class="text-black"
            icon="menu"
            round
            dense
            @click="toggleRightDrawer"
          />
        </div>
        <div class="tw-hidden lg:tw-flex lg:tw-gap-x-12">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="tw-text-sm tw-font-semibold tw-leading-6 tw-gray-900 hover:tw-text-gray-200 focus:tw-outline-none"
          >
            {{ item.name }}
          </a>
        </div>
        <div class="tw-hidden lg:tw-flex lg:tw-flex-1 lg:tw-justify-end">
          <router-link
            to="/login"
            class="tw-text-sm tw-font-medium tw-tracking-wide tw-rounded focus:tw-outline-none tw-leading-6 tw-text-white tw-px-4 tw-py-2 tw-bg-primary hover:tw-bg-hoverPrimary tw-transition-all"
            >Autenticarse
          </router-link>
        </div>
      </nav>
    </header>
    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <q-list>
        <div class="tw-flex tw-justify-between tw-items-center tw-py-3 tw-px-4">
          <router-link to="/" class="-tw-m-1.5">
            <span class="tw-sr-only">Gelma</span>
            <img
              class="tw-h-8 tw-w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </router-link>
          <q-btn
            flat
            class="text-black"
            icon="close"
            round
            dense
            @click="toggleRightDrawer"
          />
        </div>
        <EssentialLink
          v-for="link in navigation"
          :key="link.name"
          v-bind="link"
          class="q-mt-sm"
        />
        <div class="tw-py-3 tw-px-4">
          <router-link
            to="/login"
            class="tw-text-sm tw-font-semibold tw-leading-6 tw-text-gray-900"
            >Autenticarse <span aria-hidden="true">&rarr;</span>
          </router-link>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <q-page-scroller
        :duration="800"
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <div class="tw-z-50">
          <q-btn size="15px" round icon="keyboard_arrow_up" color="black" />
        </div>
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import EssentialLink from "src/components/EssentialLink.vue";
import { ref } from "vue";
import gsap from "gsap";

const isLoading = ref(true);
const loader = ref(true);
const rightDrawerOpen = ref(false);
const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

const beforeEnter = (el) => {
  el.style.transform = "translateY(-30px)";
  el.style.opacity = 0;
};

const enter = (el, done) => {
  gsap.to(el, {
    duration: 3,
    y: 0,
    opacity: 1,
    ease: "bounce.out",
    stagger: 1,
    onComplete: done,
  });
};

const afterEnter = () => {
  isLoading.value = false;
};
</script>

<style scoped>
.loader {
  width: 40px;
  aspect-ratio: 1;
  display: grid;
}

.loader::before,
.loader::after {
  content: "";
  grid-area: 1/1;
  --c: no-repeat linear-gradient(#046d8b 0 0);
  background: var(--c) 0 0, var(--c) 100% 0, var(--c) 100% 100%, var(--c) 0 100%;
  animation: l10-1 2s infinite linear, l10-2 2s infinite linear;
}

.loader::after {
  margin: 25%;
  transform: scale(-1);
}

@keyframes l10-1 {
  0% {
    background-size: 0 4px, 4px 0, 0 4px, 4px 0;
  }
  12.5% {
    background-size: 100% 4px, 4px 0, 0 4px, 4px 0;
  }
  25% {
    background-size: 100% 4px, 4px 100%, 0 4px, 4px 0;
  }
  37.5% {
    background-size: 100% 4px, 4px 100%, 100% 4px, 4px 0;
  }
  45%,
  55% {
    background-size: 100% 4px, 4px 100%, 100% 4px, 4px 100%;
  }
  62.5% {
    background-size: 0 4px, 4px 100%, 100% 4px, 4px 100%;
  }
  75% {
    background-size: 0 4px, 4px 0, 100% 4px, 4px 100%;
  }
  87.5% {
    background-size: 0 4px, 4px 0, 0 4px, 4px 100%;
  }
  100% {
    background-size: 0 4px, 4px 0, 0 4px, 4px 0;
  }
}

@keyframes l10-2 {
  0%,
  49.9% {
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
  }
  50%,
  100% {
    background-position: 100% 0, 100% 100%, 0 100%, 0 0;
  }
}
</style>
