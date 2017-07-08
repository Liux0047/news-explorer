<template>
    <md-input-container>
        <label for="options">Select your favorite news sources</label>
        <md-select name="option" id="option" multiple v-model="items" @input="sourcesUpdated">
            <md-option v-for="(option, k) in options" :key="k" :value="k">
                {{ option }}
            </md-option>
        </md-select>
    </md-input-container>
</template>

<script>
import { NEWS_SOURCES } from '../../app.config';
import { eventBus } from '../main';

export default {
    data: () => ({
        options: NEWS_SOURCES,
        items: []
    }),
    methods: {
        sourcesUpdated() {
            eventBus.$emit('sourcesUpdated', this.items);
        }
    }   
}
</script>

