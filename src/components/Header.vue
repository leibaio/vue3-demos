<template>
  <section>
    <div class="flex items-center justify-between p-6">
      <div class="flex items-center space-x-3">
        <ToggleMenu @toggle="toggleMenu" />
        <div :class="['menu-container', { expanded: isExpanded }]">
          <div class="titles">
            <h1
              class="text-l font-bold cursor-pointer mr-2 hover:border-b-2 hover:border-current pb-1 transition-all duration-200"
              v-for="(item, index) in navigationMaps"
              :key="index"
              @click="navigateTo(item.path)"
            >
              {{ item.title }}
            </h1>
          </div>
        </div>
      </div>
      <ThemeSwitch />
      <div>{{ count }}</div>
      <div>{{ userName }}</div>
    </div>
  </section>
</template>

<script setup>
import { getUserInfo } from "@/api/user";
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ToggleMenu from "./ToggleMenu.vue";

const store = useStore();
const router = useRouter();

const isExpanded = ref(false);

// Computed properties
const count = computed(() => store.state.count.count);
const userName = computed(() => store.state.user.name);

const navigationMaps = [
  { title: "Home", path: "/" },
  { title: "Side", path: "/gsap" },
];

const navigateTo = (path) => {
  router.push(path);
};

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value;
};

// Actions
const fetchUserInfo = async () => {
  try {
    const res = await getUserInfo({});
    store.commit("user/setName", res.data.name);
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    store.dispatch("user/updateName", "default user");
  }
};

// Lifecycle hooks
onMounted(() => {
  fetchUserInfo();
});
</script>
<style lang="less" scoped>
.menu-container {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 40px; // 初始宽度，仅显示图标
  height: 40px;
  transition: width 0.3s ease;
  cursor: pointer;

  &.expanded {
    width: auto;
    max-width: 80vw; // 设置最大宽度，防止在小屏幕上溢出
  }

  .titles {
    display: flex;
    align-items: center;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &.expanded .titles {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
