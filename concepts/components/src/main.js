import Vue from 'vue'
import App from './App.vue'

var __svg__ = { path: './assets/icons/**/*.svg', name: 'assets/svg/[hash].icons.svg' }

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__)

window.moment = require('moment')

import VibeCalendar from './vibe/components/VibeCalendar'
import VibeTable from './vibe/components/VibeTable'
import VibeButton from './vibe/components/VibeButton'
import VibeTableColumn from './vibe/components/VibeTableColumn'

Vue.component('vibe-calendar', VibeCalendar)
Vue.component('vibe-table', VibeTable)
Vue.component('vibe-button', VibeButton)
Vue.component('vibe-table-column', VibeTableColumn)

new Vue({
  el: '#app',
  render: h => h(App)
})
