import Vue from 'vue';
import App from './App.vue';

var VueMaterial = require('vue-material');

Vue.use(VueMaterial);

new Vue({
  el: '#app',
  render: h => h(App)
});