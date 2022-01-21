import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from '~pages';
import Vuex from 'vuex';
import { store, key } from './store'
import VueApexCharts from "vue3-apexcharts";

// eslint-disable-next-line no-console
console.log(routes)

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(VueApexCharts);
app.use(router);
app.use(Vuex);
app.use(store, key)
app.mount('#app');
export default app;
