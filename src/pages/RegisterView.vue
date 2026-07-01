<template>
  <div class="page-shell form-card max-w-md mx-auto">
    <h1 class="page-title mb-4">Registro</h1>

    <div v-if="error" class="mb-4 p-3 bg-red-600/10 text-red-200 rounded">{{ error }}</div>

    <form @submit.prevent="submit" class="space-y-4">
      <label class="label">
        Nombre
        <input v-model="name" type="text" class="input-field mt-2" />
      </label>
      <label class="label">
        Email
        <input v-model="email" type="email" class="input-field mt-2" />
      </label>
      <label class="label">
        Contraseña
        <input v-model="password" type="password" class="input-field mt-2" />
      </label>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const auth = useAuthStore();
const error = ref(null);

const submit = async () => {
  error.value = null;

  try {
    await auth.register({ name: name.value, email: email.value, password: password.value });
    router.push('/animals');
  } catch (err) {
    error.value = auth.error || 'Error al registrar';
  }
};
</script>
