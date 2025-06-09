<template>
  <h2>p-queue</h2>
  <input type="file" multiple @change="handleFileSelect" />
  <button @click="startUpload" :disabled="isUploading">Upload Files</button>
  <div v-if="isUploading">Uploading... {{ progress }}%</div>
  <ul>
    <li v-for="(file, index) in files" :key="index">
      {{ file.name }} - {{ file.status }}
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import PQueue from "p-queue";

const files = ref([]);
const isUploading = ref(false);
const progress = ref(0);
const queue = ref(null);

onMounted(() => {
  queue.value = new PQueue({ concurrency: 10 });
});

onUnmounted(() => {
  if (queue.value) {
    queue.value.clear();
  }
});

const handleFileSelect = (event) => {
  files.value = Array.from(event.target.files).map((file) => ({
    file,
    name: file.name,
    status: "pending",
  }));
};

const uploadFile = async (fileInfo) => {
  const formData = new FormData();
  formData.append("file", fileInfo.file);

  try {
    // 这里使用一个模拟的上传 API
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { success: true } });
      }, 1000 + Math.random() * 2000); // 随机延迟 1-3 秒
    });

    if (response.data.success) {
      fileInfo.status = "uploaded";
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    fileInfo.status = "error";
    console.error(`Error uploading ${fileInfo.name}:`, error);
  }
};

const startUpload = async () => {
  if (files.value.length === 0) {
    alert("Please select files to upload");
    return;
  }

  isUploading.value = true;
  progress.value = 0;

  const totalFiles = files.value.length;
  let completedFiles = 0;

  for (const fileInfo of files.value) {
    queue.value.add(async () => {
      await uploadFile(fileInfo);
      completedFiles++;
      progress.value = Math.round((completedFiles / totalFiles) * 100);
    });
  }

  await queue.value.onIdle();
  isUploading.value = false;
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
</style>
