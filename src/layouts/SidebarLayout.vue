<template>
  <div class="flex min-h-screen overflow-hidden">
    <div class="w-[50] bg-[#B59DEB] p-4 overflow-y-auto h-screen">
      <nav>
        <ul>
          <li v-for="item in menuItems" :key="item.path" class="mb-2">
            <router-link :to="item.path" class="text-white hover:text-gray-300">
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <main class="flex-1 p-4 overflow-y-auto h-screen">
      <!-- <slot></slot> -->
      <router-view v-slot="{ Component }">
        <KeepAlive :include="cachedViews">
          <component :is="Component" />
        </KeepAlive>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { menuItems } from "@/config/menuConfig";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const cachedViews = ref(["Add"]);
</script>

<style scoped>
/* 布局样式 */
</style>
