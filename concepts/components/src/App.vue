<template>
  <div id="app" class="content">
    <div class="list">
      <router-link to="/table">Table</router-link>
      <router-link to="/calendar">Calendar</router-link>
      <router-link to="/icon">Icon</router-link>
      <router-link to="/button">Button</router-link>
    </div>

    <main>
      <router-view></router-view>
    </main> 
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="less">

html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

*:focus {
  outline-style: dashed;
  outline-color: darkcyan;
  outline-offset: -1px;
  outline-width: 1px;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;

  main, .page {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
  }

  .component {
    margin: 0 auto;
  }

  > h1 {
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid #ccc;
    flex-shrink: 0;
  }

  > .list {
    width: 200px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    box-sizing: border-box;
    height: 100vh;

    > a {
      padding: 5px 10px;
    }
  }
}
</style>
