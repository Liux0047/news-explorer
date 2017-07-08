<template>
  <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="25">
    <md-card md-with-hover>
      <md-card-media>
        <img :src="article.urlToImage" alt="Picture">
      </md-card-media>
  
      <md-card-header>
        <div class="md-title">{{ article.title }}</div>
        <div class="md-subhead">{{ article.author }}</div>
      </md-card-header>
  
      <md-card-content>
        {{ article.description }}
      </md-card-content>
    </md-card>
  </md-layout>
</template>

<script>
export default {
  props: ['article']
}
</script>

<style lang="scss">
.md-card {
  margin: 0 4px 16px;
  display: inline-block;
  vertical-align: top;
}
</style>
