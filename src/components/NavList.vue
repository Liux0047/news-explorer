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
                        <md-list-item v-for="(entity, i) in topic.entities" :key="i" @click="selectItem(topic.topic, entity.entity)" class="md-inset" :class="{'md-accent': entity.count >= 15, 
                                                    'md-warn': entity.count < 15 && entity.count >= 10}">
                            <div class="md-list-text-container">
                                <span>{{ entity.entity }}</span>
                                <p>{{ entity.count }} articles</p>
                            </div>
    
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
                entity
            });
        }
    }
}
</script>

