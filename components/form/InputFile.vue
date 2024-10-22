<template>
    <div class="max-w-lg mx-auto p-5 border-2 border-dashed border-gray-300 rounded-lg text-center">
      <div
        class="p-5 bg-gray-100 cursor-pointer"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <p>
          <span class="inline-block mr-2 text-gray-600">
            <Icon name="mdi:upload-outline" class="text-2xl" />
          </span>
          Drag & drop your files here or
          <button @click="triggerFileInput" class="text-blue-500 hover:underline">choose file</button>
        </p>
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          @change="handleFileInput"
          multiple
        />
      </div>
  
      <div v-if="files.length > 0" class="mt-5">
        <h3 class="text-lg font-semibold">Uploaded files</h3>
        <ul class="mt-3 space-y-3">
          <li v-for="file in files" :key="file.name" class="flex items-center justify-between p-3 bg-white shadow-sm rounded-md">
            <div class="flex items-center">
              <span class="mr-3 text-gray-500">
                <Icon name="mdi:file-outline" class="text-xl" />
              </span>
              <span>{{ file.name }} - {{ file.size }} MB</span>
            </div>
            <div class="flex items-center">
              <progress :value="file.progress" max="100" class="w-32 mr-3"></progress>
              <button @click="removeFile(file)" class="text-red-500 hover:text-red-700">
                <Icon name="mdi:close-circle" class="text-xl" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const files = ref([])
  
  const triggerFileInput = () => {
    document.querySelector('input[type="file"]').click()
  }
  
  const handleFileInput = (event) => {
    uploadFiles(event.target.files)
  }
  
  const handleDrop = (event) => {
    uploadFiles(event.dataTransfer.files)
  }
  
  const uploadFiles = (fileList) => {
    for (let i = 0; i < fileList.length; i++) {
      let file = fileList[i]
      let fileData = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2), // Kích thước tính bằng MB
        progress: 0, // Khởi tạo giá trị thanh tiến trình là 0
        intervalId: null, // Biến để lưu interval của mỗi file
      }
      files.value.push(fileData)
  
      simulateUpload(fileData) // Chạy tiến trình tải cho từng file
    }
  }
  
  const simulateUpload = (fileData) => {
    // Mỗi file có tiến trình riêng, không ảnh hưởng đến nhau
    fileData.intervalId = setInterval(() => {
      let index = files.value.indexOf(fileData)
      if (index !== -1 && files.value[index].progress < 100) {
        files.value[index].progress += 10
      } else {
        clearInterval(fileData.intervalId)
      }
    }, 300)
  }
  
  const removeFile = (file) => {
    // Hủy tiến trình upload nếu file bị xóa
    clearInterval(file.intervalId)
    files.value = files.value.filter(f => f !== file)
  }
  
  // Chặn kéo thả ngoài khu vực upload
  const preventGlobalDragAndDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  
  onMounted(() => {
    // Ngăn sự kiện kéo thả ngoài khu vực upload
    window.addEventListener('dragover', preventGlobalDragAndDrop)
    window.addEventListener('drop', preventGlobalDragAndDrop)
  })
  
  onUnmounted(() => {
    // Loại bỏ sự kiện khi component bị hủy
    window.removeEventListener('dragover', preventGlobalDragAndDrop)
    window.removeEventListener('drop', preventGlobalDragAndDrop)
  })
  </script>
  
  <!-- Không cần style scoped, sử dụng Tailwind CSS -->
  