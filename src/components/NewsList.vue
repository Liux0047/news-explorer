<template>
    <div>
        <md-toolbar class="md-transparent">
            <h2 class="md-title" style="flex: 1">{{ sourceNames[source] }}</h2>
            <md-button class="md-icon-button" md-expand-trigger>
                <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
        </md-toolbar>
    
        <md-spinner md-indeterminate v-if="!isDataReady"></md-spinner>
        <md-layout md-gutter v-if="isDataReady">
            <app-news-card v-for="(article, index) in TopMostArticles" :key="index" :article="article"></app-news-card>
        </md-layout>
    </div>
</template>

<script>
import NewsCard from './NewsCard.vue';
import axios from 'axios';
import { NEWS_SOURCES } from '../../app.config';

export default {
    data() {
        return {
            articles: [],
            sourceNames: NEWS_SOURCES,
            viewALl: false,
            isDataReady: false
        }
    },
    props: ['source'],
    components: {
        'app-news-card': NewsCard
    },
    computed: {
        TopMostArticles() {
            return this.viewALl ? this.articles : this.articles.slice(0, 4);
        }
    },
    created() {
        axios.get(`/api/` + this.source)
            .then(response => {
                // JSON responses are automatically parsed.
                console.log(response);
                this.articles = response.data.articles;
                this.isDataReady = true;
            })
            .catch(e => {
                console.log(e);
            });
    }
}
</script>

<style lang="scss">
.md-toolbar {
    padding: 0;
    border-bottom: solid 1px #eaecf0;
    margin-bottom: 1em;

    .md-title:first-child {
        margin-left: 0;
    }
    .md-button.md-icon-button {
        margin: 0;
    }
}
</style>
