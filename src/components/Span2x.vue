<template>
  <div :class="{ 'menu-icon': true, open: menuOpen }" @click="handleMenuClick">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const menuOpen = ref(false);
const handleMenuClick = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<style lang="less" scoped>
.menu-icon {
  width: 16px;
  height: 12px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  box-sizing: content-box;

  &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
  }

  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: #000;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
  }

  &.open {
    span {
      &:nth-child(1) {
        transform: translateY(5px) rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: translateY(-5px) rotate(-45deg);
      }
    }
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
