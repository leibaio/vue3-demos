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

  <n-form
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    size="medium"
  >
    <n-form-item label="姓名" path="user.name">
      <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleQueryEmployeeList">
        query
      </n-button>
    </n-form-item>
  </n-form>

  <n-data-table
    :columns="columns"
    :data="tableData"
    :pagination="pagination"
    @update:page="handlePageChange"
  />
</template>

<script setup>
import { login, queryEmployeeList } from "@/api/employee";
import { getUserInfo, getUsers } from "@/api/user";
import { ref } from "vue";
import { useStore } from "vuex";

const users = ref({});
const store = useStore();
const userInfo = ref({});
const formRef = ref(null);
const formValue = ref({
  user: {
    name: "",
  },
});
const tableData = ref([]);
const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
});

const columns = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "用户名",
    key: "username",
  },
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "电话",
    key: "phone",
  },
  {
    title: "性别",
    key: "sex",
    render: (row) => (row.sex === "1" ? "男" : "女"),
  },
  {
    title: "状态",
    key: "status",
    render: (row) => (row.status === 1 ? "正常" : "禁用"),
  },
  {
    title: "创建时间",
    key: "createTime",
    // render: (row) => new Date(...row.createTime).toLocaleString(),
  },
];

const handleLogin = async () => {
  const params = {
    username: "admin",
    password: 123456,
  };
  const res = await login(params);
  userInfo.value = res.data;
  store.dispatch("user/updateName", res.data.name);
  store.dispatch("user/updateToken", res.data.token);
};

const handleQueryEmployeeList = async () => {
  try {
    const params = {
      page: pagination.value.page,
      pageSize: pagination.value.pageSize,
      name: formValue.value.user.name,
    };
    const res = await queryEmployeeList(params);
    if (res.code === 1 && res.data) {
      tableData.value = res.data.records;
      pagination.value.itemCount = res.data.total;
    }
  } catch (error) {
    console.log("[ error ] >", error);
  } finally {
    console.log("[ 1 ] >");
  }
};

const handlePageChange = (page) => {
  pagination.value.page = page;
  handleQueryEmployeeList();
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
