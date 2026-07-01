<template>
  <div class="card">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <router-link :to="`/animals/${animal.id}`" class="text-lg font-semibold text-heading hover:text-magenta block">
          {{ animal.name }}
        </router-link>
        <p class="text-sm text-muted">{{ animal.species }} · {{ animal.sex }}</p>
      </div>
      <span class="badge badge-magenta">
        {{ animal.status?.name || 'Sin estado' }}
      </span>
    </div>
    <div class="mt-3 text-sm text-muted">
      <p v-if="animal.breed">Raza: {{ animal.breed }}</p>
      <p v-if="animal.age">Edad: {{ animal.age }}</p>
      <p v-if="animal.shelter">Refugio: {{ animal.shelter.name }}</p>
    </div>

    <div v-if="showActions" class="mt-4 flex flex-wrap gap-2">
      <router-link :to="`/animals/${animal.id}/edit`" class="btn btn-secondary btn-sm">Editar</router-link>
      <button type="button" @click="deleteAnimal" class="btn btn-danger btn-sm">Eliminar</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['delete']);

const props = defineProps({
  animal: {
    type: Object,
    required: true,
  },
  showActions: {
    type: Boolean,
    default: false,
  },
});

const deleteAnimal = () => {
  emit('delete', props.animal.id);
};
</script>
