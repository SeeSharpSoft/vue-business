<template>
	<div class="vibe-table">
        <div v-if="false">
            <slot></slot>
        </div>
        <table>
            <vibe-template-renderer
                v-for="(column, columnIndex) in columns"
                :key="'th'+columnIndex"
                tag="th"
                :template="column.headerTemplate"
                :data="column.label ?  column.label : column" />
            <tr v-for="(tableItem, itemIndex) in tableItems" :key="'tr'+itemIndex"
                :ref="'tr'+itemIndex"
                :tabindex="selectionMode === 'None' ? null : itemIndex === 0 ? 0 : -1"
                @click.left.stop="onItemSelected(tableItem, itemIndex)"
                @keyup.up="onNavUp(itemIndex)"
                @keyup.down="onNavDown(itemIndex)"
                @keyup.enter="onItemSelected(tableItem, itemIndex)"
            >
                <vibe-template-renderer
                    v-for="(column, columnIndex) in columns"
                    :key="'td'+columnIndex"
                    tag="td"
                    :template="column.cellTemplate"
                    :data="column.field ? tableItem.item[column.field] : tableItem.item" />
            </tr>
        </table>
	</div>
</template>

<script>
import VibeComponent from './VibeComponent.vue'
import VibeTemplateRenderer from './VibeTemplateRenderer.vue'
import { createEvent, setStyleClass } from '../Util.js'

export default {
    name: 'VibeTable',
    extends: VibeComponent,
    components: { VibeTemplateRenderer },

    mounted() {
        console.log(this)
        this.columns = this.$slots.default
            .filter(node => node.componentOptions && node.componentOptions.tag === 'vibe-table-column')
            .map(this.parseColumn)

        this.tableItems = this.items.map(function(item, index) {
                return {
                    item: item,
                    selected: false
                }
            }.bind(this))
    },

    props: {
        items: {
            type: Array | Map
        },
        selectionMode: {
            type: String,
            validator(value) {
                return value === 'None' || value === 'Single' || value === 'Multi'
            },
            default: 'Single'
        }
    },

    data() {
        return {
            columns: [],
            tableItems: []
        }
    },

    watchers: {
        items(oldValue, newValue) {
            this.tableItems = newValue.map(function(item, index) {
                return {
                    item: item,
                    selected: false
                }
            })
        }
    },

    methods: {
        parseColumn(node, index) {
            return {
                headerTemplate: node.data.scopedSlots && node.data.scopedSlots.header,
                cellTemplate: node.data.scopedSlots && (node.data.scopedSlots.cell || node.data.scopedSlots.default),
                label: node.componentOptions.propsData.label,
                field: node.componentOptions.propsData.field,
                index: index
            }
        },

        _getTableRowDomElementAtIndex(index) {
            return this.$refs['tr'+index][0]
        },

        onItemSelected(item, index) {
            this.selectItem(index, !item.selected, true)
        },

        selectItem(itemIndex, selected, updateOthers) {
            let item = this.tableItems[itemIndex]

            if (this.selectionMode === 'None' || item.selected === selected) return

            item.selected = selected
            this.$emit('selectionChange', createEvent(this, { item: item.item, selected: item.selected }))
            setStyleClass(this._getTableRowDomElementAtIndex(itemIndex), 'vibe-selected', item.selected)

            if (!updateOthers) return

            if (this.selectionMode === 'Single' && item.selected) {
                this.tableItems.forEach(function(tableItem, index) {
                    if (itemIndex !== index) {
                        this.selectItem(index, false)
                    }
                }.bind(this))
            }
        },

        onNavUp(index) {
            if (index === 0) return
            let domElement = this._getTableRowDomElementAtIndex(index - 1)
            domElement.focus()
        },

        onNavDown(index) {
            if (index === this.tableItems.length - 1) return
            let domElement = this._getTableRowDomElementAtIndex(index + 1)
            domElement.focus()
        }
    }
}
</script>

<style lang="less">

@tableRowSelectedBackground: lightgrey;
@tableRowFocusBackground: grey;
@tableRowLineHeight: 2rem;

.vibe-table {
    tr {
        line-height: @tableRowLineHeight;
        &.vibe-selected {
            background: @tableRowSelectedBackground;

            &:focus {
                background: @tableRowFocusBackground;
            }
        }
    }
}

</style>
