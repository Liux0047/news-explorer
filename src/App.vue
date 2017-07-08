<template>
  <div id="app">
    <md-toolbar>
      <h1 class="md-title">News Explorer</h1>
    </md-toolbar>
  
    <div class="main-content">
      <app-source-selector></app-source-selector>
      <app-news-list v-for="source in newsSources" :key="source" :source="source"></app-news-list>
    </div>
  
  </div>
</template>

<script>
import SourceSelector from './components/SourceSelector.vue';
import NewsList from './components/NewsList.vue';
import { eventBus } from './main';

export default {
  name: 'app',
  data() {
    return {
      newsSources: ['techcrunch']
    }
  },
  components: {
    'app-news-list': NewsList,
    'app-source-selector': SourceSelector
  },
  created() {
    eventBus.$on('sourcesUpdated', (data) => {
      this.newsSources = data;
    })
  }
}
</script>

<style lang="scss">
.main-content {
  padding: 16px;
}
</style>
