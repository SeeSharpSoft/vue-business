import { setStyleClass, setAttribute, createEvent } from '../Util.js'

export default {
    props: {
        editable: {
            type: Boolean,
            default: true
        }
    },

    watch: {
        editable() {
            this.vibeEditable()
        }
    },

    methods: {
        onValueChanged(value) {
            this.$emit('valueChanged', value)
        },
        vibeEditable() {
            setStyleClass(this.$el, 'vibe-editable-locked', !this.editable)
        }
    }
}