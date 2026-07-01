import { defineStore } from 'pinia';
import { login as loginApi, register as registerApi, logout as logoutApi } from '../services/api/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('acanis_token') || null,
    user: null,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },
  actions: {
    async login(credentials) {
      this.error = null;

      try {
        const response = await loginApi(credentials);
        this.token = response.data.token;
        localStorage.setItem('acanis_token', this.token);
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al iniciar sesión';
        throw error;
      }
    },
    async register(credentials) {
      this.error = null;

      try {
        const response = await registerApi(credentials);
        this.token = response.data.token;
        localStorage.setItem('acanis_token', this.token);
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al registrar';
        throw error;
      }
    },
    async logout() {
      await logoutApi();
      this.token = null;
      localStorage.removeItem('acanis_token');
    },
  },
});
