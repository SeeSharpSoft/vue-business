<template>
  <div id="app" class="content">
    <h1>Vibe</h1>

    <vibe-calendar></vibe-calendar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      locale: "de"
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
</style>
