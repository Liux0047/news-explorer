<template>
    <div>
        <h2 class="md-headline">{{ sourceNames[source] }}</h2>
        <md-layout md-gutter>
            <app-news-card v-for="(article, index) in articles" :key="index" :article="article"></app-news-card>
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
            sourceNames: NEWS_SOURCES
        }
    },
    props: ['source'],
    components: {
        'app-news-card': NewsCard
    },
    created() {
        axios.get(`/api/` + this.source)
            .then(response => {
                // JSON responses are automatically parsed.
                console.log(response);
                this.articles = response.data.articles;
            })
            .catch(e => {
                console.log(e);
            });
    }
}
</script>