<template>
  <h2>event bus</h2>


</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

class EventBus {
  // 创建一个 EventBus 类
  constructor() {
    // 创建对象，events, 长这个样子，events: {eventName1: [callback1, callback2], eventName2: [callback2]}
    this.events = {};
  }

  // 订阅事件
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    console.log(this.events);
  }

  // 发布事件
  emit(eventName, payload) {
    // 如果发布的事件存在，依次调用订阅者的回调函数
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(payload);
      });
    }
  }

  // 取消订阅
  unsubscribe(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    }
    console.log(this.events);
  }
}

const eventBus = new EventBus();



</script>

<style scoped></style>
