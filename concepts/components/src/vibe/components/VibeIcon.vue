<template>
	<svg class="svg-icon vibe-icon" :style="computedStyle" :lang="language">
        <title>{{ title }}</title>
	    <use :xlink:href="iconId" />
	</svg>
</template>

<script>
import VibeComponent from '@/vibe/mixins/VibeComponent'

export default {
    name: 'VibeIcon',
    mixins: [VibeComponent],
    props: ['icon'],
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
