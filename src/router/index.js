import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../pages/LoginView.vue';
import RegisterView from '../pages/RegisterView.vue';
import AnimalsView from '../pages/AnimalsView.vue';
import AnimalDetailView from '../pages/AnimalDetailView.vue';
import AnimalFormView from '../pages/AnimalFormView.vue';
import SheltersView from '../pages/SheltersView.vue';
import ShelterDetailView from '../pages/ShelterDetailView.vue';
import ShelterFormView from '../pages/ShelterFormView.vue';
import DashboardView from '../pages/DashboardView.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/dashboard', component: DashboardView },
  { path: '/animals', component: AnimalsView },
  { path: '/animals/create', component: AnimalFormView },
  { path: '/animals/:id/edit', component: AnimalFormView, props: true },
  { path: '/animals/:id', component: AnimalDetailView, props: true },
  { path: '/shelters', component: SheltersView },
  { path: '/shelters/create', component: ShelterFormView },
  { path: '/shelters/:id/edit', component: ShelterFormView, props: true },
  { path: '/shelters/:id', component: ShelterDetailView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
