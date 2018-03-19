<script>

export default {
    name: 'VibeTemplateRenderer',
    props: {
        tag: {
            type: String
        },
        fallbackTag: {
            type: String,
            default: 'span',
            validator(value) {
                return !!value
            }
        },
        template: {
            type: Function
        },
        data: {
            
        }
    },

    render(createElement) {
        let createdElement = this.tag
            ? createElement(this.tag, {}, (this.template || (data => data))(this.data))
            : this.template && this.template(this.data) || createElement(this.fallbackTag, {}, this.data)

        if (Array.isArray(createdElement)) {
            if (createdElement.length !== 1) {
                console.log(this)
                throw this + " template requires exactly one root node"
            }
            return createdElement[0]
        }

        return createdElement
    }
}

</script>