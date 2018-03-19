<template>
  <div id="app" class="content">
    <h1>Vibe</h1>

    <vibe-calendar></vibe-calendar>
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
  </div>
</template>

<script>

import Button from './vibe/components/VibeButton.vue'
import Icon from './vibe/components/VibeIcon.vue'

export default {
  name: 'app',
  data () {
    return {
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.content {
  text-align: center;
}

.calendar {
  margin: 0 auto;
}

*:focus {
  outline-style: dashed;
  outline-color: darkcyan;
  outline-offset: -1px;
  outline-width: 1px;
}
</style>
