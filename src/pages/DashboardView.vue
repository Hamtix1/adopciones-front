<template>
  <div class="page-shell">
    <div class="app-header">
      <div>
        <h1 class="page-title">Dashboard ACANIS</h1>
        <p class="section-subtitle">Métricas de adopción y refugios en tiempo real.</p>
      </div>
    </div>

    <div class="grid gap-4 lg:grid-cols-2">
      <div class="card">
        <h2 class="text-xl font-semibold mb-4">Resumen general</h2>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-3xl bg-surface-strong p-4">
            <p class="text-sm text-muted">Animales totales</p>
            <p class="text-3xl font-bold text-heading">{{ stats.total_animals }}</p>
          </div>
          <div class="rounded-3xl bg-surface-strong p-4">
            <p class="text-sm text-muted">Refugios</p>
            <p class="text-3xl font-bold text-heading">{{ stats.total_shelters }}</p>
          </div>
          <div class="rounded-3xl bg-surface-strong p-4">
            <p class="text-sm text-muted">Tasa adopción</p>
            <p class="text-3xl font-bold text-heading">{{ stats.adoption_rate }}%</p>
          </div>
          <div class="rounded-3xl bg-surface-strong p-4">
            <p class="text-sm text-muted">Disponibles para adopción</p>
            <p class="text-3xl font-bold text-heading">{{ stats.available_for_adoption }}</p>
          </div>
          <div class="rounded-3xl bg-surface-strong p-4">
            <p class="text-sm text-muted">Adoptados</p>
            <p class="text-3xl font-bold text-heading">{{ stats.adopted }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="text-xl font-semibold mb-4">Conteo por especie</h2>
        <ul class="space-y-3">
          <li v-for="item in stats.species_counts" :key="item.species" class="flex justify-between gap-4 text-muted">
            <span>{{ item.species }}</span>
            <strong class="text-heading">{{ item.total }}</strong>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-4 card">
      <h2 class="text-xl font-semibold mb-4">Conteo por estado</h2>
      <ul class="space-y-3">
        <li v-for="item in stats.status_counts" :key="item.status" class="flex justify-between gap-4">
          <span>{{ item.status }}</span>
          <strong>{{ item.total }}</strong>
        </li>
      </ul>
    </div>

    <div class="mt-4 card">
      <h2 class="text-xl font-semibold mb-4">Top 5 refugios por animales</h2>
      <ul class="space-y-3">
        <li v-for="shelter in stats.top_shelters" :key="shelter.id" class="flex justify-between gap-4 text-muted">
          <span>{{ shelter.name }}</span>
          <div class="text-right">
            <p class="text-sm text-muted">Total</p>
            <strong class="text-heading">{{ shelter.animals_count }}</strong>
          </div>
        </li>
      </ul>
    </div>

    <div class="mt-4 card">
      <h2 class="text-xl font-semibold mb-4">Animales recientes</h2>
      <ul class="space-y-3">
        <li v-for="animal in stats.recent_animals" :key="animal.id" class="p-4 rounded-3xl bg-surface-strong">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="font-semibold text-heading">{{ animal.name }}</p>
              <p class="text-sm text-muted">{{ animal.species }} · {{ animal.status?.name || 'Sin estado' }}</p>
            </div>
            <span class="badge badge-yellow">{{ animal.shelter?.name || 'Sin refugio' }}</span>
          </div>
          <p class="mt-2 text-sm text-muted">Creado: {{ new Date(animal.created_at).toLocaleDateString() }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getDashboard } from '../services/api/dashboard';

const stats = ref({
  total_animals: 0,
  total_shelters: 0,
  available_for_adoption: 0,
  adopted: 0,
  adoption_rate: 0,
  species_counts: [],
  status_counts: [],
  top_shelters: [],
  recent_animals: [],
});

const load = async () => {
  const response = await getDashboard();
  stats.value = response.data;
};

onMounted(load);
</script>
