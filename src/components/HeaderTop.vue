<template>
  <div class="ui fixed inverted borderless menu">
    <router-link class="header grey item" to="/">Shooter MPD</router-link>
    <div class="right menu">
      <div class="item">
        <div class="ui button">Créer un compte client</div>
      </div>
      <div class="item">
        <div class="ui button">Se connecter à un compte client</div>
      </div>
      <a class="item js-sidebar">
        <i class="terminal icon"></i>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HeaderTop'
}
</script>

<style scoped>
  .ui.fixed.menu{ background-color: #1B4B5C; }

  .ui.inverted.menu a.item:hover{ background-color: transparent; }

  .header.item{
    color: #FFF;
    font-size: 16px;
  }

  .ui.button{
    text-transform: uppercase;
    background-color: #01C3A7;
    color: #FFF;
  }
</style>
