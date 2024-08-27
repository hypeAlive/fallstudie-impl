import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../components/HomeComponent.vue';
import QuestionComponent from '../components/QuestionComponent.vue';

const routes = [
  { path: '/', component: HomeComponent },
  { path: '/question', component: QuestionComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;