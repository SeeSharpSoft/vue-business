import Interactable from './interactable.js'

export default {
    extends: Interactable,
    methods: {
        onClick(event) {
            if (this.enabled) {
                this.$emit('click', { sender: this })
            }
        }
    }
}