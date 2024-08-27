<template>
  <main class="container m-auto p-4 h-lvh max-h-lvh">
    <div class="flex flex-col gap-20 justify-center items-center h-screen">
      <div class="flex justify-center items-center space-x-4">
        <img
          src="@/assets/logo.svg"
          class="w-32 h-32 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          height="1200"
          width="1200"
          alt="Frontend Logo"
        />
        <h1 v-if="pictureUrl" class="text-center text-4xl">X</h1>
        <img
          v-if="pictureUrl"
          :src="pictureUrl"
          :class="{'w-28 h-28': pictureUrl === BackendPictures.spring}"
          class="w-32 h-32 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          height="512"
          width="512"
          alt="Backend Logo"
        />
      </div>

      <div class="divider divider-primary"></div>

      <div class="flex flex-col gap-4 justify-center items-center p-6">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const pictureUrl = ref(null);
const BackendPictures = {
  spring: 'src/assets/spring_logo.png',
  django: 'src/assets/django_logo.png',
  express: 'src/assets/expressjs_logo.png',
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/type');
    pictureUrl.value = BackendPictures[response.data.type];
  } catch (error) {
    console.error(error);
  }
});
</script>