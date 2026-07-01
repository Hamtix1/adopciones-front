<template>
  <div class="page-shell form-card max-w-3xl mx-auto">
    <h1 class="page-title mb-6">{{ isEdit ? 'Editar refugio' : 'Crear refugio' }}</h1>

    <div v-if="error" class="mb-4 p-3 bg-red-600/10 text-red-200 rounded">{{ error }}</div>

    <form @submit.prevent="submit" class="space-y-4">
      <label class="label">
        Nombre
        <input v-model="form.name" type="text" class="input-field mt-2" required />
      </label>

      <label class="label">
        Municipio
        <select v-model="form.municipality_id" class="select-field mt-2" required>
          <option value="" disabled>Seleccionar municipio</option>
          <option v-for="municipality in municipalities" :key="municipality.id" :value="municipality.id">
            {{ municipality.name }}
          </option>
        </select>
      </label>

      <label class="label">
        Descripción
        <textarea v-model="form.description" rows="3" class="textarea-field mt-2"></textarea>
      </label>

      <label class="label">
        Misión
        <textarea v-model="form.mission" rows="3" class="textarea-field mt-2"></textarea>
      </label>

      <label class="label">
        Dirección
        <input v-model="form.address" type="text" class="input-field mt-2" />
      </label>

      <label class="label">
        Teléfono
        <input v-model="form.phone" type="text" class="input-field mt-2" />
      </label>

      <label class="label">
        WhatsApp
        <input v-model="form.whatsapp" type="text" class="input-field mt-2" />
      </label>

      <label class="label">
        Correo
        <input v-model="form.email" type="email" class="input-field mt-2" />
      </label>

      <label class="label">
        Estado
        <select v-model="form.status" class="select-field mt-2" required>
          <option value="" disabled>Seleccionar estado</option>
          <option value="pending">Pendiente</option>
          <option value="approved">Aprobado</option>
          <option value="blocked">Bloqueado</option>
          <option value="inactive">Inactivo</option>
        </select>
      </label>

      <div class="flex flex-wrap gap-3 pt-4">
        <button type="submit" class="btn btn-primary">{{ isEdit ? 'Guardar cambios' : 'Crear refugio' }}</button>
        <button type="button" @click="$router.push('/shelters')" class="btn btn-secondary">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createShelter, getMunicipalities, getShelter, updateShelter } from '../services/api/shelters';

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => Boolean(route.params.id));
const municipalities = ref([]);
const error = ref(null);
const form = ref({
  name: '',
  municipality_id: '',
  description: '',
  mission: '',
  address: '',
  phone: '',
  whatsapp: '',
  email: '',
  status: '',
});

const loadOptions = async () => {
  const response = await getMunicipalities();
  municipalities.value = response.data;
};

const loadShelter = async () => {
  if (!isEdit.value) return;

  const response = await getShelter(route.params.id);
  form.value = {
    name: response.data.name || '',
    municipality_id: response.data.municipality_id || '',
    address: response.data.address || '',
    phone: response.data.phone || '',
    whatsapp: response.data.whatsapp || '',
    email: response.data.email || '',
    status: response.data.status || '',
  };
};

const submit = async () => {
  error.value = null;

  try {
    if (isEdit.value) {
      await updateShelter(route.params.id, form.value);
    } else {
      await createShelter(form.value);
    }

    router.push('/shelters');
  } catch (err) {
    error.value = err.response?.data?.message || 'Error en el formulario de refugio';
  }
};

onMounted(async () => {
  await loadOptions();
  await loadShelter();
});
</script>
