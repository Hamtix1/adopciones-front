import http from './http';

export const getAnimals = (params) => http.get('animals', { params });
export const getAnimal = (id) => http.get(`animals/${id}`);
export const createAnimal = (payload) => http.post('animals', payload);
export const updateAnimal = (id, payload) => http.put(`animals/${id}`, payload);
export const deleteAnimal = (id) => http.delete(`animals/${id}`);
export const getAnimalStatuses = () => http.get('animal-statuses');
export const getSheltersList = () => http.get('shelters/list');
