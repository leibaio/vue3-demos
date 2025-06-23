<template>
  <n-space>
    <n-button type="info" @click="handleMockData()">Mock data</n-button>
    <n-button type="info" @click="handleAddCount()">Add Count</n-button>
    <n-button type="info" @click="handleLogin">Login</n-button>
  </n-space>
  <div v-if="users.length > 0">
    {{ users }}
  </div>

  <div v-if="userInfo.id">{{ userInfo }}</div>
</template>

<script setup>
import { getUserInfo, getUsers } from "@/api/user";
import { ref } from "vue";
import { useStore } from "vuex";
import { login } from "@/api/employee";

const users = ref({});
const store = useStore();
const userInfo = ref({});

const handleLogin = async () => {
  const params = {
    username: "admin",
    password: 123456,
  };
  const res = await login(params);
  userInfo.value = res.data;
};

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
