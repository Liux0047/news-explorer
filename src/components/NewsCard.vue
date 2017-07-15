<template>
  <md-layout md-flex-xsmall="100" md-flex-medium="50" md-flex-large="25">
    <md-card md-with-hover>
      <md-card-media>
        <img :src="article.urlToImage" alt="Picture">
      </md-card-media>
  
      <md-card-header>
        <div class="md-title">{{ article.title }}</div>
        <div class="md-subhead">
          <md-icon class="md-icon-sm">access_time</md-icon> {{ formatTime(article.publishedAt) }} | {{ article.author }}
        </div>
      </md-card-header>
  
      <md-card-content>
        {{ article.description }}
      </md-card-content>
  
      <md-card-actions>
        <md-button class="md-primary" @click="openUrl(article.url)">See Full Aritcle</md-button>
      </md-card-actions>
    </md-card>
  </md-layout>
</template>

<script>
export default {
  props: ['article'],
  methods: {
    formatTime(dateTime) {
      if (dateTime) {
        return Math.floor((new Date() - new Date(dateTime)) / 36e5) + 'h';
      } else {
        return ' - ';
      }
    },
    openUrl(url) {
      window.open(url, "_blank");
    }
  }
}
</script>

<style lang="scss">
$icon-sm-szie: 14px;
.md-card {
  margin: 0 0px 16px;
  display: inline-block;
  vertical-align: top;

  .md-icon-sm {
    font-size: $icon-sm-szie;
    width: $icon-sm-szie;
    min-width: $icon-sm-szie;
    height: $icon-sm-szie;
    min-height: $icon-sm-szie;
  }
}
</style>
