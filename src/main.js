import Vue from 'vue';
import App from './App.vue';

var VueMaterial = require('vue-material');

Vue.use(VueMaterial);

export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
});