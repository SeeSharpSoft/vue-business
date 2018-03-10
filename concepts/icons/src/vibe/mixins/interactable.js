import { setStyleClass, setAttribute} from '../util.js'

export default {
    mounted() {
        this.vibeInteractable()
    },
    props: {
        enabled: {
            type: Boolean,
            default: true
        },
        tabindex: {
            type: Number | String,
            default: 0
        },
        tabindexDisabled: {
            type: Number | String,
            default: null
        }
    },
    watch: {
        enabled() {
            this.vibeInteractable()
        },
        tabindex() {
            this.vibeInteractable()
        },
        tabindexDisabled() {
            this.vibeInteractable()
        }
    },
    methods: {
        vibeInteractable() {
            setStyleClass(this.$el, 'vibe-interactable-disabled', !this.enabled)
            setAttribute(this.$el, 'tabindex', this.enabled ? this.tabindex : this.tabindexDisabled)
        }
    }
}