<template>
  <div class="ui fixed inverted menu">
    <div class="left menu">
      <div class="ui header item no-border shooter-mpd" @click="goHome">Shooter MPD</div>
    </div>
    <div class="menu" style="margin: 0 auto;">
      <a class="item step-container js-step" v-bind:class="{ active: devisActiveStep }">
        <i class="search icon"></i>
        <span class="active">Devis</span>
      </a>
      <a class="item step-container js-step" v-bind:class="{ active: commandeActiveStep }">
        <i class="shopping basket icon"></i>
        <span>Commande</span>
      </a>
      <a class="item step-container js-step" v-bind:class="{ active: paymentActiveStep }">
        <i class="credit card icon"></i>
        <span>Paiement</span>
      </a>
      <a class="item step-container" v-bind:class="{ active: finalisationActiveStep }">
        <i class="align justify icon"></i>
        <span>Finalisation</span>
      </a>
    </div>
    <div class="right menu">
      <a class="item no-border js-main-form">Identifiants & Environnements</a>
      <a class="item js-console no-border open-console-icon">
        <i class="terminal icon"></i>
      </a>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/header-top/header-top-action-types'
import $ from 'jquery'

const { mapState, mapActions } = createNamespacedHelpers('HeaderTop')

export default {
  name: 'HeaderTop',
  computed: {
    ...mapState([
      'devisActiveStep',
      'commandeActiveStep',
      'paymentActiveStep',
      'finalisationActiveStep'
    ])
  },
  methods: {
    ...mapActions({
      'goHome': actions.GO_HOME
    })
  },
  mounted () {
    function toggleClassMainFormSidebar () {
      $('.js-main-form-content').toggleClass('inactive-main-form')
      $('.js-main-form-content').toggleClass('active-main-form')
    }

    // open close console sidebar
    $('.js-console').click(function () {
      function showConsole () {
        $('.js-console-content').addClass('active')
        let classNameToInsert = $('.js-site-content').attr('class').replace('sixteen', 'eleven')
        $('.js-site-content').attr('class', classNameToInsert)
      }

      function hideConsole () {
        $('.js-console-content').removeClass('active')
        let classNameToInsert = $('.js-site-content').attr('class').replace('eleven', 'sixteen')
        $('.js-site-content').attr('class', classNameToInsert)
      }

      $('.js-console-content').slideToggle(20, function () {
        $('.js-console-content').attr('class').includes('active') ? hideConsole() : showConsole()
      })
    })

    // open close main form (username, password and environment form) sidebar
    $('.js-main-form').click(function () {
      toggleClassMainFormSidebar()
    })
  }
}
</script>

<style scoped>
  .ui.fixed.menu {
    background-color: #21314D;
    height: 60px;
    z-index: 2;
  }

  .item {
    padding: 12px 20px !important;
  }

  .ui.inverted.menu a.item:hover {
    background-color: transparent;
  }

  .ui.menu {
    background-color: transparent;
  }

  .ui.header {
    font-size: 13px;
    cursor: pointer;
  }

  .item.step-container {
    cursor: context-menu !important;
  }

  .step-container i{
    width: 20px;
    height: 16px;
    margin-right: 5px;
    color: rgba(255, 255, 255, 0.5);
  }

  span,
  .right.menu a.item.no-border{
    text-transform: uppercase;
    letter-spacing: 0.025em;
    font-size: 13px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.5);
    padding-right: 16px;
  }

  .no-border::before {
    background: 0 0 !important;
  }

  .item.step-container::after {
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

  .item.step-container::before {
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

  .item.step-container:last-child::before,
  .item.step-container:last-child::after {
    display: none;
  }

  .item.step-container.active span,
  .item.step-container.active i {
    color: #FFF;
  }

  .ui.inverted.menu .active.item {
    background: transparent;
  }

  /* Right menu */
  .right.menu a.item.no-border:hover{
    background-color: rgba(255, 255, 255, 0.15);
    color: #FFF;
  }

  /* active - inactive sidebars */
  .active-console,
  .active-main-form {
    width: 600px;
  }

  .active-console,
  .active-main-form {
    width: 0;
  }
</style>
