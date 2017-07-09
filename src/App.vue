<template>
  <div id="app">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h1 class="md-title">News Explorer</h1>
    </md-toolbar>
  
    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Sidenav content</h3>
        </div>
      </md-toolbar>
      <app-nav-list></app-nav-list>
  
    </md-sidenav>
  
    <div class="main-content">
      <app-source-selector></app-source-selector>
      <app-news-list v-for="source in newsSources" :key="source" :source="source"></app-news-list>
    </div>
  
  </div>
</template>

<script>
import SourceSelector from './components/SourceSelector.vue';
import NewsList from './components/NewsList.vue';
import NavList from './components/NavList.vue';
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
    'app-source-selector': SourceSelector,
    'app-nav-list': NavList
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    }
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
