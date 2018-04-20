<template>
  <div class="ui fixed inverted menu">
    <router-link class="header grey item no-border" to="/">Shooter MPD</router-link>
    <div class="ui compact menu">
      <a class="item step-container" v-bind:class="{ active: getDevisActiveStep }">
        <i class="search icon"></i>
        <span class="active">Devis</span>
      </a>
      <a class="item step-container" v-bind:class="{ active: getCommandeActiveStep }">
        <i class="shopping basket icon"></i>
        <span>Commande</span>
      </a>
      <a class="item step-container" v-bind:class="{ active: getPaymentActiveStep }">
        <i class="credit card icon"></i>
        <span>Paiement</span>
      </a>
      <a class="item step-container" v-bind:class="{ active: getFinalisationActiveStep }">
        <i class="align justify icon"></i>
        <span>Finalisation</span>
      </a>
    </div>
    <div class="right menu">
      <a class="item js-sidebar no-border">
        <i class="terminal icon"></i>
      </a>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const { mapGetters } = createNamespacedHelpers('HeaderTop')

export default {
  name: 'HeaderTop',
  computed: {
    ...mapGetters([
      'getDevisActiveStep',
      'getCommandeActiveStep',
      'getPaymentActiveStep',
      'getFinalisationActiveStep'
    ])
  }
}
</script>

<style scoped>
  .ui.fixed.menu {
    background-color: #21314D;
    height: 60px;
  }

  .ui.inverted.menu a.item:hover {
    background-color: transparent;
  }

  .ui.compact.menu {
    background-color: transparent;
  }

  .step-container i{
    width: 20px;
    height: 16px;
    margin-right: 5px;
    color: rgba(255, 255, 255, 0.5);
  }

  .step-container span{
    text-transform: uppercase;
    letter-spacing: 0.025em;
    font-size: 13px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.5);
    padding-right: 25px;
  }

  .no-border::before {
    background: 0 0 !important;
  }

  .step-container::after {
    content: '';
    position: absolute;
    background-color: #37465f;
    width: 3px;
    height: 30px;
    right: 7px;
    z-index: -1;
    top: 29px;
    -webkit-transform: skew(-20deg);
    -moz-transform: skew(-20deg);
    -ms-transform: skew(-20deg);
    -o-transform: skew(-20deg);
    transform: skew(-20deg);
  }

  .step-container::before {
    content: '';
    position: absolute;
    background-color: #37465f !important;
    width: 3px !important;
    height: 30px !important;
    right: 7px !important;
    z-index: -1;
    top: 0;
    -webkit-transform: skew(20deg);
    -moz-transform: skew(20deg);
    -ms-transform: skew(20deg);
    -o-transform: skew(20deg);
    transform: skew(20deg);
  }

  .item.step-container.active span,
  .item.step-container.active i {
    color: #FFF;
  }

  .ui.inverted.menu .active.item {
    background: transparent;
  }
</style>
