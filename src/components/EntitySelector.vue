<template>
    <md-input-container>
        <label for="options">Select your interested topics</label>
        <md-select name="option" id="option" multiple v-model="selectedEntities" @input="entitiesUpdated">
            <md-option v-for="(option, k) in entities" :key="k" :value="option">
                {{ option }}
            </md-option>
        </md-select>
    </md-input-container>
</template>

<script>
import { eventBus } from '../main';

export default {
    data: () => ({
        selectedEntities: []
    }),
    props: ['entities'],
    methods: {
        entitiesUpdated() {
            eventBus.$emit('entitiesUpdated', this.selectedEntities);
        }
    }
}
</script>

