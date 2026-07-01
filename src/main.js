import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/auth';
import router from './router';
import App from './App.vue';
import './style.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

const auth = useAuthStore(pinia);

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];

  if (!auth.isAuthenticated && !publicPages.includes(to.path)) {
    return next('/login');
  }

  if (auth.isAuthenticated && publicPages.includes(to.path)) {
    return next('/animals');
  }

  return next();
});

app.mount('#app');
