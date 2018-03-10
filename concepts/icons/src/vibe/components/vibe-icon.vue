<template>
	<svg class="vibe-icon" :style="{ 'fill': color }" :lang="language" :width="size" :height="size">
        <title>{{ title }}</title>
	    <use :xlink:href="iconId" />
	</svg>
</template>

<script>
import VibeComponent from '@/vibe/components/vibe-component'
import Hideable from '@/vibe/mixins/hideable.js'

export default {
    name: 'vibe-icon',
    extends: VibeComponent,
    mixins: [Hideable],
    props: {
        icon: {
            type: String
        },
        size: {
            type: String,
            default: '100%'
        },
        color: {
            type: String
        }
    },
    computed: {
        iconId() {
            return '#icon-' + this.icon
        },
        title() {
            return this.tooltip || this.icon
        }
    }
}
</script>

<style>
</style>
