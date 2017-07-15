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
      <md-spinner md-indeterminate v-if="!isDataReady"></md-spinner>
      <div v-if="isDataReady">
        <span class="md-display-1">{{ selectedTopic.entity }}</span>
        <!-- <app-entity-selector :entities="topicsMap[selectedTopic.topic]"></app-entity-selector> -->
        <app-news-list v-for="(articlesList, source) in articles" :key="source" :articles="articlesList" :source="source"></app-news-list>
      </div>
    </div>
  
  </div>
</template>

<script>
// import EntitySelector from './components/EntitySelector.vue';
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
      isDataReady: false,
      articles: {}
    }
  },
  components: {
    'app-news-list': NewsList,
    // 'app-entity-selector': EntitySelector,
    'app-nav-list': NavList
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },

    getNewsData() {
      this.isDataReady = false;
      axios.get('/api/entity', {
        params: {
          topic: this.selectedTopic.topic,
          entity: this.selectedTopic.entity
        }
      }).then(response => {
        // JSON responses are automatically parsed.
        this.articles = {};
        for (let item of response.data.newsList) {
          this.articles[item.source] = this.articles[item.source] || [];
          this.articles[item.source].push(item);
        }
        this.isDataReady = true;
      }).catch(e => {
        console.error(e);
      });
    },

  },
  created() {
    eventBus.$on('topicSelected', (data) => {
      this.selectedTopic = data;
      this.$refs.leftSidenav.close();
      this.getNewsData();
    });

    // get the topics
    axios.get('/api/topics')
      .then(response => {
        // JSON responses are automatically parsed.
        this.topics = response.data;
        this.selectedTopic = {
          topic: this.topics[0].topic,
          entity: this.topics[0].entities[0]
        }
        this.getNewsData();
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
