<template>
  <button class="btn btn-active btn-primary min-w-60 mt-4" @click="navigateToQuestion">
    Start
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToQuestion = () => {
  router.push('/question');
};
</script>