<template>
  <div>
    <span v-if="isLoading" class="loading loading-spinner text-secondary"></span>
    <div v-else>
      <div v-if="question" class="flex flex-col justify-center items-center">
        <h2 class="text-2xl font-bold mb-4">{{ question.question }}</h2>
        <div class="flex flex-col gap-2">
          <label v-for="option in question.options" :key="option.type" class="flex items-center gap-2">
            <input
              type="radio"
              name="radio-3"
              class="radio radio-secondary"
              :value="option"
              @click="onOptionSelected(option)"
            />
            <span>{{ `${option.type}) ${option.text}` }}</span>
          </label>
        </div>
        <button
          class="btn btn-active btn-primary min-w-60 mt-4 hover:bg-primary-dark"
          :class="{ 'btn-disabled': !selectedAnswer }"
          @click="submitAnswer"
        >
          Bestätigen
        </button>
      </div>
      <div v-else class="flex flex-col justify-center items-center">
        <h2 :class="['text-2xl font-bold mb-4 result', { wrong: isCorrect === false }]">
          {{ isCorrect ? 'Correct!' : 'Incorrect!' }}
        </h2>
        <button
          class="btn btn-active btn-primary min-w-60 mt-4 hover:bg-primary-dark"
          @click="requestRandomQuestions(questionIds)"
        >
          Next Question
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const question = ref(null);
const selectedAnswer = ref(null);
const isCorrect = ref(null);
const isLoading = ref(true);
const questionIds = ref([]);

const BackendPictures = {
  spring: '@/assets/spring_logo.png',
  django: '@/assets/django_logo.png',
  express: '@/assets/expressjs_logo.png',
};

const fetchQuestionIds = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/question/ids');
    questionIds.value = response.data;
    requestRandomQuestions(response.data);
  } catch (error) {
    console.error(error);
  }
};

const requestRandomQuestions = async (ids) => {
  isLoading.value = true;
  question.value = null;
  selectedAnswer.value = null;
  isCorrect.value = null;

  try {
    const randomId = ids[Math.floor(Math.random() * ids.length)];
    const response = await axios.get(`http://localhost:8080/api/question/${randomId}`);
    question.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
};

const onOptionSelected = (option) => {
  selectedAnswer.value = option.type;
};

const submitAnswer = async () => {
  if (!selectedAnswer.value || !question.value) return;

  const checkId = question.value.id;
  question.value = null;
  isLoading.value = true;

  try {
    const response = await axios.post('http://localhost:8080/api/question', {
      id: checkId,
      answer: selectedAnswer.value,
    });
    isCorrect.value = response.data.isCorrect;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchQuestionIds);
</script>

<style scoped>
@import './QuestionComponent.css';
</style>