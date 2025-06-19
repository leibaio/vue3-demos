<template>
  <Teleport to="body">
    <div class="my-dialog-overlay" v-if="visible" @click="handleMaskClick">
      <div class="my-dialog-container">
        <header>
          <slot name="header">
            {{ title }}
          </slot>

          <button>close</button>
        </header>

        <main class="my-dialog-content">
          <slot></slot>
        </main>

        <footer>
          <slot name="footer">
            <button>cancel</button>
            <button>confirm</button>
          </slot>
        </footer>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { computed, watch } from "vue";

// 使用 defineProps 定义组件接收的 props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "提示",
  },
  width: {
    type: [String, Number],
    default: "50%",
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
});

// 使用 defineEmits 定义组件触发的事件
const emit = defineEmits(["update:visible", "confirm", "cancel", "close"]);

const close = () => {
  emit("update:visible", false);
  emit("close");
};

const handleMaskClick = () => {
  if (props.maskClosable) {
    close();
  }
};

watch(
  () => props.visible,
  (newVal) => {
  }
);
</script>
<style lang="less" scoped>
.my-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .my-dialog-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
  }
}
</style>
