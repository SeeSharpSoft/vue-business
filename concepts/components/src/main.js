import Vue from 'vue'
import App from './App.vue'

var __svg__ = { path: './assets/icons/**/*.svg', name: 'assets/svg/[hash].icons.svg' }

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__)

window.moment = require('moment')

import VibeCalendar from './vibe/components/VibeCalendar'

Vue.component('vibe-calendar', VibeCalendar)

new Vue({
  el: '#app',
  render: h => h(App)
})
