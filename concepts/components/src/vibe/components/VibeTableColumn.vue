<template>
    <div v-if="false">
        <slot name="header" />
        <slot name="cell" />
    </div>
</template>

<script>

import Hideable from '../mixins/Hideable.js'

export default {
    name: 'VibeTableColumn',
    mixins: [Hideable],
    props: {
        field: {
            type: String | Number
        },
        label: {
            type: String
        }
    }
}
</script>

<style>
</style>
