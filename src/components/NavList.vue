<template>
    <div class="phone-viewport">
        <md-toolbar md-theme="white">
            <span class="md-title">What's hot in</span>
        </md-toolbar>
        <md-list>
            <md-list-item v-for="topic in topics" :key="topic">
                <span>{{ topic.topic}} </span>
                <md-list-expand>
                    <md-list>
                        <md-list-item v-for="entity in topic.entities" :key="entity" @click="selectItem(topic.topic, entity)" class="md-inset">
                            {{ entity }}
                        </md-list-item>
                    </md-list>
                </md-list-expand>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
import { eventBus } from '../main';

export default {
    props: ['topics'],
    methods: {
        selectItem(topic, entity) {
            eventBus.$emit('topicSelected', {
                topic,
                entities: [entity]
            });
        }
    }
}
</script>

