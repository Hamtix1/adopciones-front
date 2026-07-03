<template>
  <div class="page-shell">
    <button @click="$router.back()" class="btn btn-secondary btn-sm mb-4">← Volver</button>

    <div v-if="loading" class="text-muted">Cargando...</div>
    <div v-else class="space-y-6">
      <div class="card">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold text-heading">{{ shelter.name }}</h1>
            <p class="text-muted">{{ shelter.municipality?.name || 'Sin municipio' }}</p>
          </div>
          <span class="badge badge-yellow">{{ shelter.status }}</span>
        </div>
        <p class="mt-3 text-muted">{{ shelter.description || 'Sin descripción' }}</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <div class="card">
          <h2 class="text-xl font-semibold mb-3 text-heading">Contacto</h2>
          <p class="text-muted">Dirección: {{ shelter.address || 'No disponible' }}</p>
          <p class="text-muted">Teléfono: {{ shelter.phone || 'No disponible' }}</p>
          <p class="text-muted">WhatsApp: {{ shelter.whatsapp || 'No disponible' }}</p>
          <p class="text-muted">Email: {{ shelter.email || 'No disponible' }}</p>
        </div>

        <div class="card">
          <h2 class="text-xl font-semibold mb-3 text-heading">Responsable</h2>
          <p class="text-muted">{{ shelter.responsible_person || 'No registrado' }}</p>
        </div>
      </div>

      <div class="grid gap-4">
        <div class="card">
          <h2 class="text-xl font-semibold mb-3 text-heading">Animales en este refugio</h2>
          <div v-if="!shelter.animals?.length" class="text-muted">No hay animales registrados en este refugio.</div>
          <ul v-else class="space-y-3">
            <li v-for="animal in shelter.animals" :key="animal.id" class="p-3 border rounded-xl bg-surface-strong">
              <router-link :to="`/animals/${animal.id}`" class="font-semibold text-magenta hover:underline">{{ animal.name }}</router-link>
              <p class="text-sm text-muted">{{ animal.species }} · {{ animal.status?.name || 'Sin estado' }}</p>
            </li>
          </ul>
        </div>

        <div class="flex flex-wrap gap-6">
          <router-link :to="`/shelters/${shelter.id}/edit`" class="btn btn-primary btn-sm">Editar</router-link>
          <button @click="handleDelete" class="btn btn-danger btn-sm">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deleteShelter, getShelter } from '../services/api/shelters';

const route = useRoute();
const router = useRouter();
const shelter = ref({});
const loading = ref(true);

const load = async () => {
  const response = await getShelter(route.params.id);
  shelter.value = response.data;
  loading.value = false;
};

const handleDelete = async () => {
  if (!window.confirm('¿Eliminar este refugio?')) {
    return;
  }

  await deleteShelter(route.params.id);
  router.push('/shelters');
};

onMounted(load);
</script>
