<template>
  <div id="app">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h1 class="md-title" style="flex: 1 1 0%">News Explorer</h1>
      <md-menu>
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>more_vert</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item>Sign In</md-menu-item>
          <md-menu-item>Others</md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-toolbar>
  
    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Sidenav content</h3>
        </div>
      </md-toolbar>
      <app-nav-list :topics="topics"></app-nav-list>
  
    </md-sidenav>
  
    <div class="main-content">
      <span class="md-display-1">{{ selectedTopic.topic }}</span>
      <app-entity-selector :entities="topicsMap[selectedTopic.topic]"></app-entity-selector>
      <app-news-list v-for="entity in selectedTopic.entities" :key="entity" :topic="selectedTopic.topic" :entity="entity"></app-news-list>
    </div>
  
  </div>
</template>

<script>
import EntitySelector from './components/EntitySelector.vue';
import NewsList from './components/NewsList.vue';
import NavList from './components/NavList.vue';
import { eventBus } from './main';
import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
      selectedTopic: {},
      topics: [],
      topicsMap: {}
    }
  },
  components: {
    'app-news-list': NewsList,
    'app-entity-selector': EntitySelector,
    'app-nav-list': NavList
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    }
  },
  created() {
    eventBus.$on('topicSelected', (data) => {
      this.selectedTopic = data;
      this.$refs.leftSidenav.close();
    });

    eventBus.$on('entitiesUpdated', (data) => {
      this.selectedTopic.entities = data;
    })

    // get the topics
    axios.get('/api/topics')
      .then(response => {
        // JSON responses are automatically parsed.
        this.topics = response.data;
        for (let t of this.topics) {
          this.topicsMap[t.topic] = t.entities;
        }
        this.selectedTopic = {
          topic: this.topics[0].topic,
          entities: this.topics[0].entities.slice(0, 3)
        }
      })
      .catch(e => {
        console.error(e);
      });
  }
}
</script>

<style lang="scss">
.main-content {
  padding: 16px;
}
</style>
