<template>
  <div class="five wide column console-container js-console-content active">
    <div class="clear-all-request">
      <a @click="clearAllRequest">Tout effacer</a>
    </div>
    <div class="main-all-request-container" v-for="req in allRequest" :key="req.id">
      <div class="ui grid all-request-container js-all-request-container">
        <div class="one wide column center aligned plus-icon-container">
          <div class="plus-icon" @click="plusIcon">
            <div class="line1 js-line1"></div>
            <div class="line2"></div>
          </div>
        </div>
        <div class="fourteen wide column request-console-container js-request-console-container">
          <div class="ui grid method-service-container">
            <div class="two wide column method-request" :method="req.requestSent.method">
              <h5 class="ui header js-method-request">{{ req.requestSent.method }}</h5>
            </div>
            <div class="fourteen wide column left aligned service-request">
              <span>{{ req.requestSent.service }}</span>
            </div>
          </div>
          <div class="ui grid request-response-data-container js-request-response-data-container" :active="req.active">
            <div class="sixteen wide column left aligned no-padding-left request-title js-request-title" v-bind:class="{ active: req.requestSent.body !== null }">
              <h4 class="ui header">Requête</h4>
            </div>
            <div class="sixteen wide column left aligned request-sent-data js-request-sent-data js-scroll-bar" v-bind:class="{ active: req.requestSent.body !== null }">
              <div class="ui grid">
                <div class="sixteen wide column right aligned buttons-json">
                  <a @click="inputChangeViewData" class="js-input-json-view">Json</a>
                  <a @click="inputChangeViewData" class="js-input-formated-view">Formaté</a>
                </div>
                <div class="sixteen wide column input-content-json">
                  <vue-json-pretty :data="req.requestSent.body" :options="{maxDepth: 3}" class="js-input-json-data input-json-data active"></vue-json-pretty>
                  <tree-view :data="req.requestSent.body" :options="{maxDepth: 10}" class="js-input-formated-data input-formated-data"></tree-view>
                </div>
              </div>
            </div>
            <div class="sixteen wide column left aligned no-padding-left response-title js-response-title">
              <h4 class="ui header">Réponse</h4>
            </div>
            <div class="sixteen wide column left aligned no-padding-left response-status">
              <h5 class="ui header left aligned status-message-request" :status="req.responseReceived.status">
                <i class="circle icon js-status"></i>
                {{ req.responseReceived.status }} {{ req.requestSent.serviceDescription }}
              </h5>
            </div>
            <div class="sixteen wide column left aligned response-received-data js-response-received-data js-scroll-bar">
              <div class="ui grid">
                <div class="sixteen wide column right aligned buttons-json">
                  <a @click="outputChangeViewData" class="js-output-json-view">Json</a>
                  <a @click="outputChangeViewData" class="js-ouput-formated-view">Formaté</a>
                </div>
                <div class="sixteen wide column output-content-json">
                    <vue-json-pretty :data="req.responseReceived.data" :options="{maxDepth: 3}" class="js-output-json-data output-json-data active"></vue-json-pretty>
                    <tree-view :data="req.responseReceived.data" :options="{maxDepth: 10}" class="js-output-formated-data output-formated-data"></tree-view>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="one wide column no-content-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import VueJsonPretty from 'vue-json-pretty'
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/console/console-action-types'

const {mapState, mapActions} = createNamespacedHelpers('console')

export default {
  name: 'console',
  computed: {
    ...mapState(['allRequest', 'active'])
  },
  components: {
    VueJsonPretty
  },
  methods: {
    ...mapActions({
      'clearAllRequest': actions.CLEAR_ALL_REQUEST
    }),
    verifyActiveRequest: function () {
      $('.js-request-response-data-container').each(function () {
        let status = $(this).attr('active')
        let currentPlusIcon = $(this).closest('.js-all-request-container').find('.js-line1')
        if (status) {
          $(this).addClass('active')
        } else {
          $(this).removeClass('active')
          currentPlusIcon.addClass('active')
        }
      })
    },
    inputChangeViewData: function (event) {
      let jsonDataEl = event.target.closest('.js-request-sent-data').getElementsByClassName('js-input-json-data')[0]
      let formatedDataEl = event.target.closest('.js-request-sent-data').getElementsByClassName('js-input-formated-data')[0]

      let jsonDataElClass = jsonDataEl.className
      let formatedDataElClass = formatedDataEl.className
      let formatedViewStatus = formatedDataElClass.includes('active')
      let jsonViewStatus = jsonDataElClass.includes('active')

      let currentView = event.target._prevClass

      if (formatedViewStatus && currentView !== 'js-input-formated-view') {
        jsonDataEl.classList.add('active')
        formatedDataEl.classList.remove('active')
      }
      if (jsonViewStatus && currentView !== 'js-input-json-view') {
        jsonDataEl.classList.remove('active')
        formatedDataEl.classList.add('active')
      }
    },
    outputChangeViewData: function (event) {
      let jsonDataEl = event.target.closest('.js-response-received-data').getElementsByClassName('js-output-json-data')[0]
      let formatedDataEl = event.target.closest('.js-response-received-data').getElementsByClassName('js-output-formated-data')[0]

      let jsonDataElClass = jsonDataEl.className
      let formatedDataElClass = formatedDataEl.className
      let formatedViewStatus = formatedDataElClass.includes('active')
      let jsonViewStatus = jsonDataElClass.includes('active')

      let currentView = event.target._prevClass

      if (formatedViewStatus && currentView !== 'js-output-formated-view') {
        jsonDataEl.classList.add('active')
        formatedDataEl.classList.remove('active')
      }
      if (jsonViewStatus && currentView !== 'js-output-json-view') {
        jsonDataEl.classList.remove('active')
        formatedDataEl.classList.add('active')
      }
    },
    plusIcon: function (event) {
      let currentRequest = event.target.closest('.js-all-request-container').getElementsByClassName('js-request-response-data-container')[0]
      let currentPlusIcon = event.target.closest('.js-all-request-container').getElementsByClassName('js-line1')[0]
      currentRequest.getAttribute('active') ? currentRequest.setAttribute('active', false) : currentRequest.setAttribute('active', true)
      currentRequest.classList.toggle('active')
      currentPlusIcon.classList.toggle('active')
    },
    checkHeightViewData: function () {
      $('.js-response-received-data').height() > 600 ? $('.js-response-received-data').css('padding', '0 0 20px 20px') : $('.js-response-received-data').css('padding', '0 20px 20px 20px')
      $('.js-request-sent-data').height() > 600 ? $('.js-request-sent-data').css('padding', '0 0 20px 20px') : $('.js-request-sent-data').css('padding', '0 20px 20px 20px')
    }
  },
  updated () {
    this.verifyActiveRequest()
    // this.checkHeightViewData()

    // Remove dotted line from vue json pretty
    $('.vjs__tree__content').css('border-left', 'none')

    $('.js-scroll-bar').mCustomScrollbar()
  },
  mounted () {
    this.verifyActiveRequest()
    // this.checkHeightViewData()

    // Remove dotted line from vue json pretty
    $('.vjs__tree__content').css('border-left', 'none')

    $('.js-scroll-bar').mCustomScrollbar()
  }
}
</script>

<style scoped>
  /* console view */
  .console-container {
    background-color: #263238;
    color: #FFF;
    min-height: 100vh;
    padding: 0 !important;
  }

  .clear-all-request {
    margin-top: 10px;
  }

  .clear-all-request a {
    color: #FFF;
    cursor: pointer;
    padding: 2px 10px;
  }

  .clear-all-request a:hover {
    background-color: #455b66;
  }

  .plus-icon-container,
  .no-content-container {
    padding: 0 !important;
  }

  .request-console-container {
    padding: 0 !important;
  }

  .all-request-container {
    margin: 30px 0 !important;
  }

  .main-all-request-container {
    border-bottom: 1px solid rgba(127, 127, 127, 0.25);
  }

  .main-all-request-container:last-child {
    border-bottom: none;
  }

  .method-service-container {
    padding: 10px 5px 10px 20px !important;
    background-color: #222d32;
    margin: 0 !important;
  }

  .request-response-data-container {
    margin: 0 !important;
    display: none !important;
  }

  .console-container .request-console-container:first-child {
    margin: 0 !important;
  }

  .method-request,
  .service-request,
  .expand-icon-request {
    padding: 0 !important;
  }

  .method-request h5 {
    font-size: 0.929em;
    font-weight: 400;
    text-transform: uppercase;
    padding: 3px 10px;
    color: #FFF;
  }

  .method-request[method='post'] {
    background-color: #248fb2;
  }

  .method-request[method='get'] {
    background-color: #6bbd5b;
  }

  .service-request span {
    margin-left: 10px;
    font-size: 14px;
    color: #FFF;
  }

  .request-title h4,
  .response-title h4 {
    text-transform: uppercase;
    font-size: 0.929em !important;
    color: #9fb4be;
    font-weight: normal;
  }

  .status-message-request {
    margin: 2px 0;
    padding: 2px 8px 3px 8px !important;
    background-color: #FFF;
    font-size: 0.929em;
    border-radius: 2px;
    font-weight: 300;
    color: #263238;
    font-weight: 300;
    float: left;
  }

  .status-message-request i {
    font-size: 5px !important;
    margin-right: 5px !important;
    display: inline-table !important;
    color: #e53935;
  }

  .status-message-request[status='200'] i{
    color: #00aa13;
  }

  .request-title {
    padding: 20px 0 10px 0 !important;
    display: none !important;
  }

  .response-received-data,
  .request-sent-data {
    background-color: #222d32;
    max-height: 600px;
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 2px 0 20px 20px !important;
  }

  .response-received-data .ui.grid,
  .request-sent-data .ui.grid {
    margin: 0 !important;
    padding: 0 !important;
  }

  .output-content-json,
  .input-content-json {
    padding: 0 !important;
  }

  .buttons-json {
    padding: 0 !important;
  }

  .buttons-json a {
    color: #FFF;
    cursor: pointer;
    padding: 2px 10px;
  }

  .buttons-json a:hover {
    background-color: #455b66;
  }

  .buttons-json a:first-child {
    padding-right: 10px;
  }

  .response-title {
    padding: 40px 0 10px 0 !important;
  }

  .response-status {
    padding: 5px 0 15px 0 !important;
  }

  .output-json-data,
  .output-formated-data,
  .input-json-data,
  .input-formated-data {
    display: none;
  }

  /* plus icon */
  .line1 {
    position: absolute;
    width: 2px;
    height: 10px;
    background: #fff;
    display: none !important;
  }

  .line2 {
    position: absolute;
    width: 10px;
    height: 2px;
    background: #fff;
  }

  .plus-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px !important;
  }

  .plus-icon {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
  }

  .active {
    display: block !important;
  }

  .expand-icon[_ngcontent-c10] {
    height: 20px;
    width: 20px;
    right: 5px;
    position: absolute;
  }

</style>
