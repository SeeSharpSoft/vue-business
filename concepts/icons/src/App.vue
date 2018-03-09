<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
	  <vibe-icon  @click.native="onEnableDisable" icon="001-home" tooltip="Testerossa" :color="enabled ? 'blue' : 'red'" :hidden="hidden"/>
    <vibe-button @click.native="onEnableDisable" icon="006-pencil" text="Enable/Disable" :enabled="!hidden"></vibe-button>
    <vibe-button @click.native="onShowHide" icon="008-quill" :iconFirst="false" text="Show/Hide"></vibe-button>

    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import VibeIcon from './vibe/components/vibe-icon'
import VibeButton from './vibe/components/vibe-button'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      enabled: true,
      hidden: false
    }
  },
  methods: {
    onEnableDisable() {
      this.enabled = !this.enabled
    },
    onShowHide() {
      this.hidden = !this.hidden
    }
  },
  components:
  {
    VibeIcon, VibeButton
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
