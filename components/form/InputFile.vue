<template>
  <div class=" p-5 border-2 border-dashed border-gray-300 rounded-lg text-center">
    <div class="p-5 bg-gray-100 cursor-pointer border-gray-300 rounded-sm" @dragover.prevent @drop.prevent="handleDrop">
      <p class="flex items-center text-s4 text-secondary-800">
        <span class="mr-2 flex items-center">
          <Icon name="mdi:upload-outline" class="text-2xl" />
        </span>
        Drag & drop your files here or
        <button
          @click="triggerFileInput"
          class="text-blue-500 hover:underline ml-1"
        >choose file</button>
      </p>
      <input type="file" ref="fileInput" class="hidden" @change="handleFileInput" multiple />
    </div>

    <div v-if="files.length > 0" class="mt-5">
      <h3 class="text-md text-secondary-800 font-semibold">Uploaded files</h3>
      <ul class="mt-3 space-y-3">
        <li
          v-for="file in files"
          :key="file.name"
          class="flex-col flex items-start p-3 shadow-sm rounded-md border border-gray-300"
        >
          <div class="flex items-center w-full">
            <div class="flex-auto">
              <div class="flex items-center">
                <span class="mr-3 text-gray-500 flex items-center">
                  <Icon name="mdi:file-outline" class="text-xl" />
                </span>
                <div class="flex-col flex items-start flex-auto">
                  <span class="file-name text-s4">{{ file.name }}</span>
                  <div class="flex w-full justify-between">
                    <span class="file-size text-s3 text-secondary-600 leading-5">{{ file.size }} MB</span>
                    <span class="progress text-s3 text-secondary-600 leading-5">{{ file.progress }}%</span>
                  </div>
                </div>
              </div>
              <div class="w-full border border-gray-300 mt-1">
                <div
                  :style="{ width: file.progress + '%' }"
                  max="100"
                  class="bg-primary-600 h-[4px] rounded-sm"
                ></div>
              </div>
            </div>
            <div class="flex items-center ml-2">
              <button @click="removeFile(file)" class="flex items-center">
                <Icon name="i-mdi:close" class="" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, onMounted, onUnmounted } from "vue";

const files = ref([]);

const triggerFileInput = () => {
  document.querySelector('input[type="file"]').click();
};

const handleFileInput = event => {
  uploadFiles(event.target.files);
  event.target.value = '';
};

const handleDrop = event => {
  uploadFiles(event.dataTransfer.files);
};

const uploadFiles = fileList => {
  for (let i = 0; i < fileList.length; i++) {
    let file = fileList[i];
    let fileData = {
      file: file,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2), // Kích thước tính bằng MB
      progress: 0, // Khởi tạo giá trị thanh tiến trình là 0
      intervalId: null // Biến để lưu interval của mỗi file
    };
    files.value.push(fileData);
    
    
    simulateUpload(fileData); // Chạy tiến trình tải cho từng file
  }
};

const simulateUpload = (fileData) => {
  const totalSize = fileData.file.size; // Kích thước thực tế của file
  let uploadedSize = 0; // Kích thước đã tải lên

  const intervalId = setInterval(() => {
    let index = files.value.indexOf(fileData);
    if (index !== -1 && files.value[index].progress < 100) {
      // Giả lập việc tải lên từng phần, có thể điều chỉnh kích thước từng phần này
      const chunkSize = Math.min(1024 * 100, totalSize - uploadedSize); // Tải lên từng 100 KB
      uploadedSize += chunkSize;

      // Cập nhật tiến trình
      files.value[index].progress = Math.round((uploadedSize / totalSize) * 100);
    }

    // Dừng quá trình khi đã tải lên hết
    if (uploadedSize >= totalSize) {
      clearInterval(intervalId);
    }
  }, 300); // Cập nhật mỗi 300ms
};

const removeFile = file => {
  // Hủy tiến trình upload nếu file bị xóa
  clearInterval(file.intervalId);
  files.value = files.value.filter(f => f !== file);
};

// Chặn kéo thả ngoài khu vực upload
const preventGlobalDragAndDrop = e => {
  e.preventDefault();
  e.stopPropagation();
};

onMounted(() => {
  // Ngăn sự kiện kéo thả ngoài khu vực upload
  window.addEventListener("dragover", preventGlobalDragAndDrop);
  window.addEventListener("drop", preventGlobalDragAndDrop);
});

onUnmounted(() => {
  // Loại bỏ sự kiện khi component bị hủy
  window.removeEventListener("dragover", preventGlobalDragAndDrop);
  window.removeEventListener("drop", preventGlobalDragAndDrop);
});
</script>
  
  <!-- Không cần style scoped, sử dụng Tailwind CSS -->
 