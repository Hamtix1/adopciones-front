<template>
  <div class="page-shell">
    <button @click="$router.back()" class="btn btn-secondary btn-sm mb-4">← Volver</button>

    <div class="flex flex-wrap gap-2 mb-6">
      <button @click="goEdit" class="btn btn-primary btn-sm">Editar</button>
      <button @click="handleDelete" class="btn btn-danger btn-sm">Eliminar</button>
    </div>

    <div v-if="loading" class="text-muted">Cargando...</div>
    <div v-else class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div class="space-y-4">
        <div class="card">
          <h1 class="text-3xl font-bold mb-2 text-heading">{{ animal.name }}</h1>
          <p class="text-muted">{{ animal.species }} · {{ animal.sex }}</p>
          <p class="text-muted">{{ animal.status?.name || 'Sin estado' }}</p>
        </div>

        <div class="card">
          <h2 class="text-xl font-semibold mb-3 text-heading">Descripción</h2>
          <p class="text-muted" v-if="animal.story">{{ animal.story }}</p>
          <p class="text-muted" v-else>No hay historia disponible.</p>
        </div>

        <div class="card">
          <h2 class="text-xl font-semibold mb-3 text-heading">Información</h2>
          <ul class="space-y-2 text-muted">
            <li><strong>Raza:</strong> {{ animal.breed || 'N/A' }}</li>
            <li><strong>Edad:</strong> {{ animal.age || 'N/A' }}</li>
            <li><strong>Tamaño:</strong> {{ animal.size || 'N/A' }}</li>
            <li><strong>Color:</strong> {{ animal.color || 'N/A' }}</li>
            <li><strong>Rescate:</strong> {{ animal.rescue_location || 'N/A' }}</li>
          </ul>
        </div>
      </div>

      <aside class="space-y-4">
        <div class="card">
          <h2 class="text-xl font-semibold mb-3 text-heading">Refugio</h2>
          <p class="text-muted">{{ animal.shelter?.name || 'No asignado' }}</p>
          <p class="text-muted">{{ animal.shelter?.address || '' }}</p>
        </div>

        <div class="card">
          <h2 class="text-xl font-semibold mb-3 text-heading">Características</h2>
          <ul class="space-y-2 text-muted">
            <li>Adopción: {{ animal.available_for_adoption ? 'Sí' : 'No' }}</li>
            <li>Apadrinamiento: {{ animal.available_for_sponsorship ? 'Sí' : 'No' }}</li>
            <li>Sterilizado: {{ animal.sterilized ? 'Sí' : 'No' }}</li>
            <li>Vacunado: {{ animal.vaccinated ? 'Sí' : 'No' }}</li>
            <li>Dewormed: {{ animal.dewormed ? 'Sí' : 'No' }}</li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deleteAnimal, getAnimal } from '../services/api/animals';

const route = useRoute();
const router = useRouter();
const animal = ref(null);
const loading = ref(true);

const load = async () => {
  const response = await getAnimal(route.params.id);
  animal.value = response.data;
  loading.value = false;
};

const goEdit = () => {
  router.push(`/animals/${route.params.id}/edit`);
};

const handleDelete = async () => {
  if (!window.confirm('¿Eliminar este animal?')) {
    return;
  }

  await deleteAnimal(route.params.id);
  router.push('/animals');
};

onMounted(load);
</script>
