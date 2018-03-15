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
        onValueChanged(property, oldValue, newValue) {
            this.$emit('valueChanged', createEvent(this, {
                property: property,
                oldValue: oldValue,
                newValue: newValue
            }))
        },
        vibeEditable() {
            setStyleClass(this.$el, 'vibe-editable-locked', !this.editable)
        }
    }
}