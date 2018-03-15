import Interactable from './Interactable.js'
import { createEvent } from '../Util.js'

export default {
    extends: Interactable,
    methods: {
        onClick(event) {
            if (this.enabled) {
                this.$emit('click', createEvent(this))
            }
        }
    }
}