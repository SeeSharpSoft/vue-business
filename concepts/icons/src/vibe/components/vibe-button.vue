<template>
    <button class="vibe-button" :title="tooltip" @click="onClick">
        <vibe-icon v-if="iconFirst && icon" :icon="icon" :tooltip="tooltip"/>
        <span class="vibe-text"><slot/></span>
        <vibe-icon v-if="!iconFirst && icon" :icon="icon" :tooltip="tooltip"/>
    </button>
</template>

<script>
import VibeComponent from '@/vibe/components/vibe-component'
import VibeIcon from '@/vibe/components/vibe-icon'
import Clickable from '@/vibe/mixins/clickable.js'
import Hideable from '@/vibe/mixins/hideable.js'
import { setStyleClass, setAttribute} from '../util.js'

export default {
    name: 'vibe-button',
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
