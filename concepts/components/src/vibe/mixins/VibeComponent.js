
export default {
    props: {
        'tooltip': {
            type: String
        },
        'language': {
            type: String
        },
        'visible': {
            type: Boolean,
            default: true
        },
        'display': {
            type: Boolean,
            default: true
        }
    },
    computed: {
        computedStyle () {
            let mStyle = {}
            if (!this.visible) {
                mStyle.visibility = 'hidden'
            }
            if (!this.display) {
                mStyle.display = 'none'
            }
            return mStyle
        }
    }
}
