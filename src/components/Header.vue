<template>
  <section>
    <div class="flex items-center justify-between p-6">
      <div class="flex items-center space-x-3">
        <div class="car-container">
          <div class="car-icon" @click="navigateTo('/')"></div>
          <div class="titles">
            <h1
              class="text-l font-bold hover:text-blue-500 cursor-pointer mr-2"
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
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

// Computed properties
const count = computed(() => store.state.count.count);
const userName = computed(() => store.state.user.name);

const navigationMaps = [
  { title: "Add", path: "/add" },
  { title: "Light", path: "/mouse-light" },
  { title: "Communication", path: "/communication" },
];

const navigateTo = (path) => {
  router.push(path);
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
.car-container {
  position: relative;
  overflow: hidden;
  width: 40px; // 初始宽度，仅显示图标
  height: 40px;
  transition: width 0.3s ease;
  cursor: pointer;
  &:hover {
    width: 300px;
  }
  .car-icon {
    width: 32px;
    height: 32px;
    background: url("../assets/car-alt.svg") no-repeat center/cover;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    z-index: 2;
  }
  .titles {
    position: absolute;
    left: 40px;
    top: 0;
    display: flex;
    align-items: center;
    height: 100%;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover .titles {
    opacity: 1;
  }
  .title {
    margin-right: 15px;
    font-weight: bold;
    color: #333;
    transition: color 0.2s ease;
    &:hover {
      color: #3498db;
    }
  }
}
</style>
