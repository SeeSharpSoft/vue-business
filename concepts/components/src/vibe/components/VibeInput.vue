<template>
	<input class="vibe-input" :value="value" @input="onValueChanged($event.target.value)" />
</template>

<script>
import VibeComponent from './VibeComponent.vue'
import Editable from '../mixins/Editable.js'
import { setStyleClass, setAttribute} from '../Util.js'

export default {
    name: 'VibeInput',
    extends: VibeComponent,
    mixins: [Editable],
    model: {
        prop: 'value',
        event: 'valueChanged'
    },
    props: {
        value: {
            type: String
        }
    },
    watch: {
        editable(oldValue, newValue) {
            setAttribute(this.$el, 'disabled', !this.editable ? '' : null)
        }
    }
}
</script>

<style>

</style>
