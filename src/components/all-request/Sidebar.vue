<template>
  <div class="ui grid right vertical inverted sidebar menu" id="sidebar-request">
    <div class="row">
      <div class="sixteen wide column">
        <h3 class="ui header centered">Requêtes en cours</h3>
      </div>
    </div>
    <div class="row">
      <div class="one wide column">
        <i class="caret right icon"></i>
      </div>
      <div class="one wide column">
        <h5 class="ui header centered">1</h5>
      </div>
      <div class="two wide column">
        <h5 class="ui header centered">POST</h5>
      </div>
      <div class="eleven wide column">
        <h5 class="ui header centered">/voyages</h5>
      </div>
      <div class="one wide column">
        <h5 class="ui header centered">200</h5>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Sidebar'
}

</script>

<style scoped>
  #sidebar-request{
    width: 40% !important;
    margin-left: -40% !important;
    background-color: #FFF;
  }

  .ui.header.centered{ color: #21314D; padding: 10px; }
</style>
