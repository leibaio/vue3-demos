<template>
  <n-button type="info" @click="handleMockData()">Mock data</n-button>
  <div v-if="users.length > 0">
    {{ users }}
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getUsers } from "@/api/user";

const users = ref({});
// 获取用户列表
const handleMockData = () => {
  getUsers({}).then((res) => {
    console.log(res);
    users.value = res.data.users;
  });
};
</script>

<style scoped lang="less"></style>
