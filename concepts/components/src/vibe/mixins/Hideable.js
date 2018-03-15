import { setStyleClass } from '../Util.js'

export default {
    mounted() {
        this.vibeHideable()
    },
    props: {
        hidden: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        hidden() {
            this.vibeHideable()
        }
    },
    methods: {
        vibeHideable() {
            setStyleClass(this.$el, 'vibe-hideable-hidden', this.hidden)
        }
    }
}