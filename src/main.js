import Vue from 'vue'
import App from './App.vue'

var __svg__ = { path: './assets/icons/**/*.svg', name: 'assets/svg/[hash].icons.svg' };

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

new Vue({
  el: '#app',
  render: h => h(App)
})
