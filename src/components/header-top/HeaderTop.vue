<template>
  <div class="ui fixed inverted menu header-top">
    <div class="left menu">
      <div class="ui header item no-border shooter-mpd" @click="goHome">Shooter MPD</div>
    </div>
    <div class="menu js-stage-point" data-stage="devis">
      <a class="item step-container devis-stage" v-bind:class="{ active: devisActiveStep }">
        <i class="search icon"></i>
        <span class="active">Devis</span>
      </a>
      <a class="item step-container commande-stage" v-bind:class="{ active: commandeActiveStep }">
        <i class="shopping basket icon"></i>
        <span>Commande</span>
      </a>
      <a class="item step-container paiement-stage" v-bind:class="{ active: paymentActiveStep }">
        <i class="credit card icon"></i>
        <span>Paiement</span>
      </a>
      <a class="item step-container finalisation-stage" v-bind:class="{ active: finalisationActiveStep }">
        <i class="align justify icon"></i>
        <span>Finalisation</span>
      </a>
    </div>
    <div class="right menu">
      <a class="item no-border" @click="mainForm">Paramètres</a>
      <a class="item no-border open-console-icon" @click="showHideConsole">
        <i class="terminal icon"></i>
      </a>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/header-top/header-top-action-types'
import $ from 'jquery'

const { mapState, mapActions } = createNamespacedHelpers('headerTop')

export default {
  name: 'headerTop',
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
    }),
    toggleClassMainFormSidebar: function () {
      $('.js-main-form-content').toggleClass('inactive-main-form')
      $('.js-main-form-content').toggleClass('active-main-form')
    },
    mainForm: function () {
      // open close main form (username, password and environment form) sidebar
      this.toggleClassMainFormSidebar()
    },
    toggleShowConsole: function () {
      $('.js-console-content').addClass('active')
      let classNameToInsert = $('.js-site-content').attr('class').replace('sixteen', 'eleven')
      $('.js-site-content').attr('class', classNameToInsert).addClass('active-console')
      $('.js-app').addClass('no-margin-right')
      if ($('.js-site-content').parent().attr('data-content') === 'middle-on-hide-console') {
        $('.js-site-content').parent().removeClass('container').addClass('main-container')
      }
    },
    toggleHideConsole: function () {
      $('.js-console-content').removeClass('active')
      let classNameToInsert = $('.js-site-content').attr('class').replace('eleven', 'sixteen')
      $('.js-site-content').attr('class', classNameToInsert).removeClass('active-console')
      $('.js-app').removeClass('no-margin-right')
      if ($('.js-site-content').parent().attr('data-content') === 'middle-on-hide-console') {
        $('.js-site-content').parent().removeClass('main-container').addClass('container')
      }
    },
    showHideConsole: function () {
      $('.js-console-content').slideToggle(5)
      $('.js-console-content').attr('class').includes('active') ? this.toggleHideConsole() : this.toggleShowConsole()
    }
  }
}
</script>

<style scoped>
  .header-top {
    background-color: #21314D !important;
    height: 60px;
    z-index: 2;
  }

  .header-top .left.menu {
    display: contents !important;
  }

  .header-top .menu {
    height: 60px;
  }

  .item {
    padding: 12px 20px !important;
  }

  .header-top .active.item {
    background-color: transparent !important;
  }

  .header-top a.item:hover {
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

  .menu[data-stage='devis'] .devis-stage span,
  .menu[data-stage='devis'] .devis-stage i,
  .menu[data-stage='commande'] .commande-stage span,
  .menu[data-stage='commande'] .commande-stage i,
  .menu[data-stage='paiement'] .paiement-stage span,
  .menu[data-stage='paiement'] .paiement-stage i,
  .menu[data-stage='finalisation'] .finalisation-stage span,
  .menu[data-stage='finalisation'] .finalisation-stage i {
    color: #FFF;
  }

  .header-top .active.item {
    background: transparent;
  }

  /* Right menu */
  .right.menu a.item.no-border:hover{
    background-color: rgba(255, 255, 255, 0.15);
    color: #FFF;
  }
</style>
