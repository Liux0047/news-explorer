<template>
  <div id="app">
    <md-toolbar>
      <h1 class="md-title">News Explorer</h1>
    </md-toolbar>
  
    <div class="main-content">
      <app-news-list v-for="source in newsSources" :key="source" :source="source"></app-news-list>
    </div>
  
  </div>
</template>

<script>
import NewsList from './components/NewsList.vue';

export default {
  name: 'app',
  data() {
    return {
      newsSources: ['techcrunch']
    }
  },
  components: {
    'app-news-list': NewsList
  }
}
</script>

<style lang="scss">
.main-content {
  padding: 16px;
}
</style>
