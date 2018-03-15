<template>
    <button class="vibe-button" :title="tooltip" @click="onClick">
        <vibe-icon v-if="iconFirst && icon" :icon="icon" :tooltip="tooltip"/>
        <span class="vibe-text"><slot/></span>
        <vibe-icon v-if="!iconFirst && icon" :icon="icon" :tooltip="tooltip"/>
    </button>
</template>

<script>
import VibeComponent from './VibeComponent.vue'
import VibeIcon from './VibeIcon.vue'
import Clickable from '../mixins/Clickable.js'
import Hideable from '../mixins/Hideable.js'
import { setStyleClass, setAttribute} from '../Util.js'

export default {
    name: 'VibeButton',
    extends: VibeComponent,
    mixins: [Hideable, Clickable],
    components: { VibeIcon },
    props: {
        icon: {
            type: String
        }, 
        iconFirst: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        enabled() {
            setAttribute(this.$el, 'disabled', !this.enabled ? '' : null)
        }
    }
}
</script>

<style>
.vibe-button {
    background: whitesmoke;

    border-radius: 3px;

    padding: 0.5rem;

    display: inline-flex;
    flex-direction: row;
    align-items: center;

    box-sizing: border-box;

    vertical-align: middle;
    cursor: pointer;
}

.vibe-button:not(.vibe-interactable-disabled):hover {
    background: lightgray;
}

.vibe-button > .vibe-text {
   margin: 0 0.5rem;
}

.vibe-button > .vibe-icon {
   width: 1rem;
   height: 1rem;
}

</style>
