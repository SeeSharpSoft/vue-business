<template>
  <div class="page">
    <vibe-table :items="items" selectionMode="Multi">
      <vibe-table-column field="firstName" label="FIRST NAME">
        <template slot="header" slot-scope="column">
          <p>{{ column }}</p>
        </template>
        <template slot="cell" slot-scope="firstName">
          <span>{{ firstName }}</span>
        </template>
      </vibe-table-column>
      <vibe-table-column field="lastName" label="Last Name">
      </vibe-table-column>
      <vibe-table-column field="tag">
        <template slot-scope="tag">
          <component :is="getCurrentView(tag)" v-bind="getCurrentProperties(tag)" />
        </template>
      </vibe-table-column>
      <vibe-table-column label="Source">
        <template slot-scope="item">
          <div>{{ item }}</div>
        </template>
      </vibe-table-column>
      <vibe-table-column>
        <template slot="header" slot-scope="column">
          <div>Label: {{ column }}</div>
        </template>
      </vibe-table-column>
    </vibe-table>
    <table>
      <tr>
        <td>
          <vibe-input v-model="newFirstName" />
        </td>
        <td>
          <vibe-input v-model="newLastName" />
        </td>
        <td>
          <vibe-button @click="onAddEntry">Add new entry</vibe-button>
        </td>
      </tr>
    </table>
    <hr />
    <vibe-table :items="items.concat([{ dummy: true }])" selectionMode="Single">
      <vibe-table-column label="First Name">
        <template slot-scope="item">
          <vibe-input v-show="!!item.dummy || item === editItem" v-model="item.firstName" />
          <span v-show="!item.dummy && item !== editItem">{{ item.firstName }}</span>
        </template>
      </vibe-table-column>
      <vibe-table-column label="Last Name">
        <template slot-scope="item">
          <vibe-input v-show="!!item.dummy || item === editItem" v-model="item.lastName" />
          <span v-show="!item.dummy && item !== editItem">{{ item.lastName }}</span>
        </template>
      </vibe-table-column>
      <vibe-table-column label="Confirm">
        <template slot-scope="item">
          <vibe-button v-show="!!item.dummy" @click="onAddEntryInline(item)">Confirm</vibe-button>
          <vibe-button v-show="!item.dummy && item !== editItem" @click="onEditEntryInline(item)">Start Edit</vibe-button>
          <vibe-button v-show="!item.dummy && item === editItem" @click="onEditEntryInline(item)">End Edit</vibe-button>
        </template>
      </vibe-table-column>
    </vibe-table>
  </div>
</template>

<script>

import Button from './../vibe/components/VibeButton.vue'
import Icon from './../vibe/components/VibeIcon.vue'
import VibeInput from './../vibe/components/VibeInput.vue'

export default {
  components: { VibeInput },
  data () {
    return {
      newFirstName: '',
      newLastName: '',
      editItem: null,
      items: [
        {
          firstName: "Peter",
          lastName: "Lustig",
          tag: 42
        },
        {
          firstName: "Frnak",
          lastName: "Hofnudel",
          tag: "001-home"
        }
      ],
      locale: "de"
    }
  },
  methods: {
    onAddEntry() {
      console.log("onAddEntry")
      this.items.push({
        firstName: this.newFirstName,
        lastName: this.newLastName,
        tag: null
      })
      console.log(this.items)
    },
    onAddEntryInline(current) {
      console.log("onAddEntryInline")
      if (!current.firstName || !current.lastName) return

      this.$set(current, 'dummy', undefined)
      this.items.push(current)
    },
    onEditEntryInline(current) {
      console.log(this.editItem)
      if (this.editItem === current) this.editItem = null
      else this.editItem = current
    },
    getCurrentView(data) {
      return typeof data === 'string' ? Icon : { template: '<vibe-button>' + data + '</vibe-button>' }
    },
    getCurrentProperties(data) {
      return typeof data === 'string' ? { icon: data, size: '1rem' } : { tooltip: data }
    }
  }
}
</script>

<style>

</style>
