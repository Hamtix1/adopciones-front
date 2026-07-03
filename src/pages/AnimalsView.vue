<template>
  <div class="page-shell">
    <div class="app-header">
      <div>
        <h1 class="page-title">Animales</h1>
        <p class="section-subtitle">Listado de mascotas rescatadas y en adopción.</p>
      </div>
      <div class="nav-links">
        <button @click="refresh" type="button" class="btn btn-secondary btn-sm">Recargar</button>
        <router-link to="/animals/create" class="btn btn-primary btn-sm">Nuevo animal</router-link>
      </div>
    </div>

    <section class="mb-6 panel panel-soft">
      <div class="grid gap-4 md:grid-cols-4">
        <label class="label">
          Especie
          <select v-model="filters.species" class="select-field mt-2">
            <option value="">Todas</option>
            <option value="dog">Perro</option>
            <option value="cat">Gato</option>
          </select>
        </label>

        <label class="label">
          Estado
          <select v-model="filters.status" class="select-field mt-2">
            <option value="">Todos</option>
            <option v-for="status in statuses" :key="status.id" :value="status.name">{{ status.name }}</option>
          </select>
        </label>

        <label class="label">
          Refugio
          <select v-model="filters.shelter_id" class="select-field mt-2">
            <option value="">Todos</option>
            <option v-for="shelter in shelters" :key="shelter.id" :value="shelter.id">{{ shelter.name }}</option>
          </select>
        </label>

        <div class="btn-container">
          <button @click="applyFilters" type="button" class="btn btn-primary btn-sm">Filtrar</button>
          <button @click="clearFilters" type="button" class="btn btn-secondary btn-sm">Limpiar</button>
        </div>
      </div>
    </section>

    <div v-if="loading" class="text-muted">Cargando...</div>
    <div v-else-if="!animals.length" class="text-muted">No hay animales registrados.</div>
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimalCard
        v-for="animal in animals"
        :key="animal.id"
        :animal="animal"
        :show-actions="true"
        @delete="confirmDelete"
      />
    </div>

    <div v-if="pagination.total" class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="text-sm text-muted">
        Mostrando {{ pagination.from }} - {{ pagination.to }} de {{ pagination.total }} animales.
      </div>
      <div class="flex flex-wrap gap-6">
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
import AnimalCard from '../components/AnimalCard.vue';
import { deleteAnimal, getAnimals, getAnimalStatuses, getSheltersList } from '../services/api/animals';

const animals = ref([]);
const loading = ref(true);
const statuses = ref([]);
const shelters = ref([]);
const filters = ref({
  species: '',
  status: '',
  shelter_id: '',
});
const pagination = ref({});

const load = async (page = 1) => {
  loading.value = true;
  const response = await getAnimals({ ...filters.value, page });
  animals.value = response.data.data || [];
  pagination.value = response.data.meta || {};
  loading.value = false;
};

const loadOptions = async () => {
  const [statusResponse, shelterResponse] = await Promise.all([getAnimalStatuses(), getSheltersList()]);
  statuses.value = statusResponse.data;
  shelters.value = shelterResponse.data;
};

const refresh = () => load(pagination.value.current_page || 1);
const applyFilters = () => load(1);
const clearFilters = () => {
  filters.value = { species: '', status: '', shelter_id: '' };
  load(1);
};

const changePage = (page) => {
  if (page < 1 || page === pagination.value.current_page) {
    return;
  }

  load(page);
};

const confirmDelete = async (id) => {
  if (!window.confirm('¿Eliminar este animal? Esta acción no se puede deshacer.')) {
    return;
  }

  await deleteAnimal(id);
  load(pagination.value.current_page || 1);
};

onMounted(async () => {
  await loadOptions();
  await load();
});
</script>
