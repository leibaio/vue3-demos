<template>
  <n-space>
    <n-button type="info" @click="handleMockData()">Mock data</n-button>
    <n-button type="info" @click="handleAddCount()">Add Count</n-button>
  </n-space>
  <div v-if="users.length > 0">
    {{ users }}
  </div>
</template>

<script setup>
import { getUserInfo, getUsers } from "@/api/user";
import { ref } from "vue";
import { useStore } from "vuex";

const users = ref({});
const store = useStore();

// 获取用户列表
const handleMockData = () => {
  getUsers({}).then((res) => {
    users.value = res.data.users;
  });
  getUserInfo({}).then((res) => {
    store.commit("user/setName", res.data.name);
  });
};

const handleAddCount = () => {
  store.dispatch("count/countAdd");
};
</script>

<style scoped lang="less"></style>
