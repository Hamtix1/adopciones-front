<template>
  <div class="page-shell form-card max-w-3xl mx-auto">
    <h1 class="page-title mb-6">{{ isEdit ? 'Editar animal' : 'Crear animal' }}</h1>

    <div v-if="error" class="mb-4 p-3 bg-red-600/10 text-red-200 rounded">{{ error }}</div>

    <form @submit.prevent="submit" class="space-y-4">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="label">
          Nombre
          <input v-model="form.name" type="text" class="input-field mt-2" required />
        </label>

        <label class="label">
          Especie
          <select v-model="form.species" class="select-field mt-2" required>
            <option value="" disabled>Seleccionar</option>
            <option value="dog">Perro</option>
            <option value="cat">Gato</option>
          </select>
        </label>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <label class="label">
          Sexo
          <select v-model="form.sex" class="select-field mt-2" required>
            <option value="" disabled>Seleccionar</option>
            <option value="male">Macho</option>
            <option value="female">Hembra</option>
          </select>
        </label>

        <label class="label">
          Estado
          <select v-model="form.animal_status_id" class="select-field mt-2" required>
            <option value="" disabled>Seleccionar</option>
            <option v-for="status in statuses" :key="status.id" :value="status.id">{{ status.name }}</option>
          </select>
        </label>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <label class="label">
          Refugio
          <select v-model="form.shelter_id" class="select-field mt-2" required>
            <option value="" disabled>Seleccionar</option>
            <option v-for="shelter in shelters" :key="shelter.id" :value="shelter.id">{{ shelter.name }}</option>
          </select>
        </label>

        <label class="label">
          Raza
          <input v-model="form.breed" type="text" class="input-field mt-2" />
        </label>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <label class="label">
          Edad
          <input v-model="form.age" type="text" class="input-field mt-2" />
        </label>
        <label class="label">
          Color
          <input v-model="form.color" type="text" class="input-field mt-2" />
        </label>
      </div>

      <label class="label">
        Historia
        <textarea v-model="form.story" rows="4" class="textarea-field mt-2"></textarea>
      </label>

      <div class="grid gap-4 sm:grid-cols-3">
        <label class="flex items-center gap-2">
          <span class="text-muted">Disponible adopción</span>
          <input type="checkbox" v-model="form.available_for_adoption" />
          
        </label>
        <label class="flex items-center gap-2">
          <span class="text-muted">Disponible apadrinamiento</span>
          <input type="checkbox" v-model="form.available_for_sponsorship" />
          
        </label>
        <label class="flex items-center gap-2">
          <span class="text-muted">Esterilizado</span>
          <input type="checkbox" v-model="form.sterilized" />
          
        </label>
      </div>

      <div class="flex flex-wrap gap-4 pt-4">
        <button type="submit" class="btn btn-primary">{{ isEdit ? 'Guardar cambios' : 'Crear animal' }}</button>
        <button type="button" @click="$router.push('/animals')" class="btn btn-secondary">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createAnimal, getAnimal, getAnimalStatuses, getSheltersList, updateAnimal } from '../services/api/animals';

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => Boolean(route.params.id));
const statuses = ref([]);
const shelters = ref([]);
const error = ref(null);
const form = ref({
  shelter_id: '',
  animal_status_id: '',
  name: '',
  species: '',
  sex: '',
  age: '',
  breed: '',
  color: '',
  story: '',
  available_for_adoption: false,
  available_for_sponsorship: false,
  sterilized: false,
});

const loadOptions = async () => {
  const [statusResponse, shelterResponse] = await Promise.all([getAnimalStatuses(), getSheltersList()]);
  statuses.value = statusResponse.data;
  shelters.value = shelterResponse.data;
};

const loadAnimal = async () => {
  if (!isEdit.value) {
    return;
  }

  const response = await getAnimal(route.params.id);
  const data = response.data;
  form.value = {
    ...form.value,
    shelter_id: data.shelter_id,
    animal_status_id: data.animal_status_id,
    name: data.name || '',
    species: data.species || '',
    sex: data.sex || '',
    age: data.age || '',
    breed: data.breed || '',
    color: data.color || '',
    story: data.story || '',
    available_for_adoption: data.available_for_adoption || false,
    available_for_sponsorship: data.available_for_sponsorship || false,
    sterilized: data.sterilized || false,
  };
};

const submit = async () => {
  error.value = null;
  try {
    if (isEdit.value) {
      await updateAnimal(route.params.id, form.value);
    } else {
      await createAnimal(form.value);
    }

    router.push('/animals');
  } catch (err) {
    error.value = err.response?.data?.message || (isEdit.value ? 'No se pudo actualizar el animal.' : 'No se pudo crear el animal.');
  }
};

onMounted(async () => {
  await loadOptions();
  await loadAnimal();
});
</script>
