<template>
  <div class="">
    Father

    <n-space>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button @click="handleClickInvokeChildFun" type="info"
            >test</n-button
          >
        </template>
        父组件调用子组件方法
      </n-tooltip>

      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button @click="handleClickPassProp" type="info">test1</n-button>
        </template>
        父组件给子组件传参方法
      </n-tooltip>
    </n-space>

    <n-divider />

    <Child
      ref="childRef"
      :person="demoPerson"
      @child-test="handleClickChildEmit"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Child from "./components/Child.vue";

interface ChildExpose {
  childFun: () => void;
}

interface Person {
  name?: string;
  age?: number;
}

const childRef = ref<ChildExpose | null>(null);
const demoPerson = reactive<Person>({
  name: "张三",
  age: 0,
});

const handleClickInvokeChildFun = () => {
  if (childRef.value) {
    childRef.value.childFun();
  }
};

const handleClickPassProp = () => {
  demoPerson.name = "李四";
  demoPerson.age = Math.random() * 100;
};

const handleClickChildEmit = (val: any) => {
  console.log("父组件监听子组件emit事件", val);
};
</script>
<style lang="less" scoped></style>
