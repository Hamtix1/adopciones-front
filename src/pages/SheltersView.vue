<template>
  <div class="page-shell">
    <div class="app-header">
      <div>
        <h1 class="page-title">Refugios</h1>
        <p class="section-subtitle">Administración de refugios registrados.</p>
      </div>
      <router-link to="/shelters/create" class="btn btn-primary btn-sm">Nuevo refugio</router-link>
    </div>

    <section class="mb-6 panel panel-soft">
      <div class="grid gap-4 md:grid-cols-4">
        <label class="label">
          Buscar
          <input v-model="filters.search" class="input-field mt-2" type="text" placeholder="Nombre del refugio" />
        </label>

        <label class="label">
          Municipio
          <select v-model="filters.municipality_id" class="select-field mt-2">
            <option value="">Todos</option>
            <option v-for="municipality in municipalities" :key="municipality.id" :value="municipality.id">{{ municipality.name }}</option>
          </select>
        </label>

        <label class="label">
          Estado
          <select v-model="filters.status" class="select-field mt-2">
            <option value="">Todos</option>
            <option v-for="status in statuses" :key="status.value" :value="status.value">{{ status.label }}</option>
          </select>
        </label>

        <div class="flex items-end gap-2">
          <button @click="applyFilters" type="button" class="btn btn-primary btn-sm">Filtrar</button>
          <button @click="clearFilters" type="button" class="btn btn-secondary btn-sm">Limpiar</button>
        </div>
      </div>
    </section>

    <div v-if="loading" class="text-muted">Cargando...</div>
    <div v-else-if="!shelters.length" class="text-muted">No hay refugios registrados.</div>
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="shelter in shelters" :key="shelter.id" class="card">
        <div class="flex items-center justify-between gap-4">
          <div>
            <router-link :to="`/shelters/${shelter.id}`" class="text-lg font-semibold text-heading hover:text-magenta">
              {{ shelter.name }}
            </router-link>
            <p class="text-muted">{{ shelter.municipality?.name || 'Sin municipio' }}</p>
          </div>
          <span class="badge badge-yellow">{{ shelter.status }}</span>
        </div>
        <p class="mt-3 text-muted">{{ shelter.address || 'Sin dirección' }}</p>
        <p class="mt-2 text-muted">Animales: {{ shelter.animals_count || 0 }}</p>

        <div class="mt-4 flex flex-wrap gap-2">
          <router-link :to="`/shelters/${shelter.id}/edit`" class="btn btn-secondary btn-sm">Editar</router-link>
          <button @click="confirmDelete(shelter.id)" class="btn btn-danger btn-sm">Eliminar</button>
        </div>
      </div>
    </div>

    <div v-if="pagination.total" class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="text-sm text-muted">
        Mostrando {{ pagination.from }} - {{ pagination.to }} de {{ pagination.total }} refugios.
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          @click="changePage(pagination.current_page - 1)"
          :disabled="!pagination.prev_page_url"
          class="btn btn-secondary btn-sm"
        >
          Anterior
        </button>
        <button
          @click="changePage(pagination.current_page + 1)"
          :disabled="!pagination.next_page_url"
          class="btn btn-secondary btn-sm"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { deleteShelter, getMunicipalities, getShelters } from '../services/api/shelters';

const shelters = ref([]);
const municipalities = ref([]);
const statuses = ref([
  { value: 'pending', label: 'Pendiente' },
  { value: 'approved', label: 'Aprobado' },
  { value: 'blocked', label: 'Bloqueado' },
  { value: 'inactive', label: 'Inactivo' },
]);
const loading = ref(true);
const filters = ref({
  search: '',
  municipality_id: '',
  status: '',
});
const pagination = ref({});

const load = async (page = 1) => {
  loading.value = true;
  const response = await getShelters({ ...filters.value, page });
  shelters.value = response.data.data || [];
  pagination.value = response.data.meta || {};
  loading.value = false;
};

const loadOptions = async () => {
  const response = await getMunicipalities();
  municipalities.value = response.data;
};

const applyFilters = () => load(1);
const clearFilters = () => {
  filters.value = { search: '', municipality_id: '', status: '' };
  load(1);
};

const changePage = (page) => {
  if (page < 1 || page === pagination.value.current_page) {
    return;
  }

  load(page);
};

const confirmDelete = async (id) => {
  if (!window.confirm('¿Eliminar este refugio?')) {
    return;
  }

  await deleteShelter(id);
  load(pagination.value.current_page || 1);
};

onMounted(async () => {
  await loadOptions();
  await load();
});
</script>
