<template>
    <div>
        <div class="md-toolbar md-transparent" @click="expanded = !expanded">
            <md-avatar>
                <img :src="icons[source]" alt="Source">
            </md-avatar>
            <h2 class="md-title" style="flex: 1">{{ source }}</h2>
            <md-button class="md-icon-button">
                <md-icon :class="{'arrow-down': !expanded}">keyboard_arrow_up</md-icon>
            </md-button>
        </div>
    
        <transition name="slide">
            <div v-if="expanded" class="content-container">
                <md-layout md-gutter>
                    <app-news-card v-for="(article, index) in articles" :key="index" :article="article"></app-news-card>
                </md-layout>
            </div>
        </transition>
    </div>
</template>

<script>
import NewsCard from './NewsCard.vue';
import axios from 'axios';
import icons from '../icons';

export default {
    data() {
        return {
            viewALl: false,
            expanded: true,
            icons: icons
        }
    },
    props: ['articles', 'source'],
    components: {
        'app-news-card': NewsCard
    },
    methods: {

    },
    created() {

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
    .md-avatar {
        width: 24px;
        min-width: 24px;
        height: 24px;
        min-height: 24px;
        margin-right: 8px;
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
