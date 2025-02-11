<template>
  <section>
    <div class="flex items-center justify-between p-6">
      <div class="flex items-center space-x-3">
        <h1
          class="text-xl font-bold hover:text-blue-200 cursor-pointer"
          @click="goToAdd"
        >
          Add
        </h1>
        <h1
          class="text-xl font-bold hover:text-blue-200 cursor-pointer"
          @click="goToMouseLight"
        >
          Mouse Light!
        </h1>
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

const { goToMouseLight, goToAdd } = useNavigation();
const store = useStore();

// Computed properties
const count = computed(() => store.state.count.count);
const userName = computed(() => store.state.user.name);

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
<style lang="less" scoped></style>
