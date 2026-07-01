import http from './http';

export const getShelters = (params) => http.get('shelters', { params });
export const getShelter = (id) => http.get(`shelters/${id}`);
export const createShelter = (payload) => http.post('shelters', payload);
export const updateShelter = (id, payload) => http.put(`shelters/${id}`, payload);
export const deleteShelter = (id) => http.delete(`shelters/${id}`);
export const getShelterList = () => http.get('shelters/list');
export const getMunicipalities = () => http.get('municipalities');
