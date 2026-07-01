<template>
  <nav class="app-header">
    <div class="brand">
      <router-link to="/animals" class="brand-link">ACANIS</router-link>
    </div>
    <div class="nav-links">
      <router-link v-if="isAuthenticated" to="/dashboard" class="nav-link">Dashboard</router-link>
      <router-link v-if="isAuthenticated" to="/animals" class="nav-link">Animales</router-link>
      <router-link v-if="isAuthenticated" to="/shelters" class="nav-link">Refugios</router-link>
      <router-link v-if="!isAuthenticated" to="/login" class="nav-link">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/register" class="nav-link">Registro</router-link>
      <button v-if="isAuthenticated" @click="logout" class="btn btn-danger">Salir</button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const isAuthenticated = auth.isAuthenticated;

const logout = async () => {
  await auth.logout();
  router.push('/login');
};
</script>
