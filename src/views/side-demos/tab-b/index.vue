<template>
  <h2>tab-b</h2>
  <n-button @click="sendMessageLocalStorage"
    >通过 LocalStorage 发送消息到 Tab A</n-button
  >
  <n-button @click="sendMessageBroadcast"
    >通过 BroadcastChannel 发送消息到 Tab A</n-button
  >
  <p v-if="receivedMessage">收到的消息: {{ receivedMessage }}</p>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const receivedMessage = ref(null);
const broadcastChannel = ref(null);

const sendMessageLocalStorage = () => {
  localStorage.setItem(
    "tabMessage",
    JSON.stringify({
      from: "Tab B",
      content: "你好，这是来自 Tab B 的 LocalStorage 消息！",
    })
  );
};

const sendMessageBroadcast = () => {
  if (broadcastChannel.value) {
    broadcastChannel.value.postMessage({
      from: "Tab B",
      content: "你好，这是来自 Tab B 的 BroadcastChannel 消息！",
    });
  }
};

const handleStorageChange = (event) => {
  if (event.key === "tabMessage") {
    const message = JSON.parse(event.newValue);
    if (message.from !== "Tab B") {
      receivedMessage.value = `[LocalStorage] ${message.content}`;
    }
  }
};

const handleBroadcastMessage = (event) => {
  if (event.data.from !== "Tab B") {
    receivedMessage.value = `[BroadcastChannel] ${event.data.content}`;
  }
};

onMounted(() => {
  window.addEventListener("storage", handleStorageChange);

  // 创建 BroadcastChannel
  broadcastChannel.value = new BroadcastChannel("tabCommunication");
  broadcastChannel.value.addEventListener("message", handleBroadcastMessage);
});

onUnmounted(() => {
  window.removeEventListener("storage", handleStorageChange);

  // 关闭 BroadcastChannel
  if (broadcastChannel.value) {
    broadcastChannel.value.close();
  }
});
</script>

<style lang="less" scoped></style>
