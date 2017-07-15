<template>
    <div>
        <div class="md-toolbar md-transparent" @click="expanded = !expanded">
            <md-ink-ripple></md-ink-ripple>
            <h2 class="md-title" style="flex: 1">{{ entity }}</h2>
            <button class="md-icon-button">
                <md-icon :class="{'arrow-down': !expanded}">keyboard_arrow_up</md-icon>
            </button>
        </div>
    
        <transition name="slide">
            <div v-if="expanded" class="content-container">
                <md-spinner md-indeterminate v-if="!isDataReady"></md-spinner>
                <md-layout md-gutter v-if="isDataReady">
                    <app-news-card v-for="(article, index) in articles" :key="index" :article="article"></app-news-card>
                </md-layout>
            </div>
        </transition>
    </div>
</template>

<script>
import NewsCard from './NewsCard.vue';
import axios from 'axios';

export default {
    data() {
        return {
            articles: [],
            viewALl: false,
            isDataReady: false,
            expanded: true
        }
    },
    props: ['topic', 'entity'],
    components: {
        'app-news-card': NewsCard
    },
    methods: {

    },
    created() {
        axios.get('/api/entity', {
            params: {
                topic: this.topic,
                entity: this.entity
            }
        }).then(response => {
            // JSON responses are automatically parsed.
            console.log(response);
            this.articles = response.data.newsList;
            this.isDataReady = true;
        }).catch(e => {
            console.error(e);
        });
    }
}
</script>

<style lang="scss" scoped="true">
$animateDuration: 0.4s;

.md-toolbar {
    padding: 0;
    border-bottom: solid 1px #eaecf0;
    margin-bottom: 1em;

    .md-title:first-child {
        margin-left: 0;
    }
    .md-icon-button {
        margin: 0;
        .md-icon {
            transition: transform $animateDuration ease;
            &.arrow-down {
                transform: rotate(-180deg);
            }
        }
    }
}


.slide-enter {
    transform: scaleY(0);
}

.slide-enter-active {
    transition: transform $animateDuration ease-in;
    transform-origin: 50% 0 0;
}

.slide-leave-active {
    transition: transform $animateDuration ease-out;
    transform: scaleY(0);
    transform-origin: 50% 0 0;
}

@keyframes slideUp {
    from {
        max-height: 100%;
    }
    to {
        max-height: 0;
    }
}

@keyframes slideDown {
    from {
        max-height: 0;
    }
    to {
        max-height: 100%;
    }
}
</style>
