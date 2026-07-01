import http from './http';

export const login = (payload) => http.post('login', payload);
export const register = (payload) => http.post('register', payload);
export const logout = () => http.post('logout');
