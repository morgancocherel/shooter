<template>
  <div id='app' class="js-app no-margin-right">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #323E42;
    margin: 60px 20px 0 20px;
  }

  .no-margin-right {
    margin-right: 0 !important;
  }
</style>
