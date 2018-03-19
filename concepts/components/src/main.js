import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

var __svg__ = { path: './assets/icons/**/*.svg', name: 'assets/svg/[hash].icons.svg' }

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__)

window.moment = require('moment')

// components

import VibeCalendar from './vibe/components/VibeCalendar'
import VibeTable from './vibe/components/VibeTable'
import VibeButton from './vibe/components/VibeButton'
import VibeTableColumn from './vibe/components/VibeTableColumn'

Vue.component('vibe-calendar', VibeCalendar)
Vue.component('vibe-table', VibeTable)
Vue.component('vibe-button', VibeButton)
Vue.component('vibe-table-column', VibeTableColumn)

// pages & routing

Vue.use(VueRouter)

import ButtonPage from './vibe/pages/ButtonPage'
import CalendarPage from './vibe/pages/CalendarPage'
import IconPage from './vibe/pages/IconPage'
import TablePage from './vibe/pages/TablePage'

const routes = [
  { path: '/', component: TablePage },
  { path: '/table', component: TablePage },
  { path: '/calendar', component: CalendarPage },
  { path: '/icon', component: IconPage },
  { path: '/button', component: ButtonPage },
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
