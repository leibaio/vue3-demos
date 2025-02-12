<template>
  <section>
    <div class="flex items-center justify-between p-6">
      <div class="flex items-center space-x-3">
        <div class="car-container">
          <div class="car-icon" @click="goToHome"></div>
          <div class="titles">
            <h1
              class="text-l font-bold hover:text-blue-200 cursor-pointer mr-2"
              @click="goToAdd"
            >
              Add
            </h1>
            <h1
              class="text-l font-bold hover:text-blue-200 cursor-pointer mr-2"
              @click="goToMouseLight"
            >
              Light
            </h1>
            <h1
              class="text-l font-bold hover:text-blue-200 cursor-pointer mr-2"
              @click="goToCommunication"
            >
              Communication
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
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import { useNavigation } from "@/hooks";
import { getUserInfo } from "@/api/user";
import { useRouter } from "vue-router";

const { goToMouseLight, goToAdd, goToHome } = useNavigation();
const store = useStore();
const router = useRouter();

// Computed properties
const count = computed(() => store.state.count.count);
const userName = computed(() => store.state.user.name);

const goToCommunication = () => {
  router.push("/communication");
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
