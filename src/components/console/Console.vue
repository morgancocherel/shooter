<template>
  <div class="five wide column console-container js-console-content active">
    <div class="main-all-request-container" v-for="req in allRequest" :key="req.id">
      <div class="ui grid all-request-container js-all-request-container">
        <div class="one wide column center aligned plus-icon-container">
          <div class="plus-icon js-plus-icon">
            <div class="line1 js-line1"></div>
            <div class="line2"></div>
          </div>
        </div>
        <div class="fourteen wide column request-console-container js-request-console-container">
          <div class="ui grid method-service-container">
            <div class="two wide column method-request">
              <h5 class="ui header js-method-request" :method="req.requestSent.method">{{ req.requestSent.method }}</h5>
            </div>
            <div class="twelve wide column left aligned service-request">
              <span>{{ req.requestSent.service }}</span>
            </div>
            <div class="two wide column right aligned expand-icon-request">
              <i class="angle down icon"></i>
            </div>
          </div>
          <div class="ui grid request-response-data-container js-request-response-data-container" :active="req.active">
            <div class="sixteen wide column left aligned no-padding-left request-title js-request-title">
              <h4 class="ui header">Requête</h4>
            </div>
            <div class="sixteen wide column left aligned no-padding-left no-padding-right response-received-data js-request-sent-data">
              <div class="ui grid">
                <div class="sixteen wide column right aligned buttons-json">
                  <a class="js-input-json-view">Json</a>
                  <a class="js-input-formated-view">Formaté</a>
                </div>
                <div class="sixteen wide column input-content-json">
                  <p class="js-body" :body="req.requestSent.body">
                    <vue-json-pretty :data="req.requestSent.body" :options="{maxDepth: 3}" class="js-input-json-data input-json-data active"></vue-json-pretty>
                    <tree-view :data="req.requestSent.body" :options="{maxDepth: 10}" class="js-input-formated-data input-formated-data"></tree-view>
                  </p>
                </div>
              </div>
            </div>
            <div class="sixteen wide column left aligned no-padding-left response-title js-response-title">
              <h4 class="ui header">Réponse</h4>
            </div>
            <div class="sixteen wide column left aligned no-padding-left response-status">
              <h5 class="ui header left aligned status-message-request">
                <i class="circle icon js-status" :status="req.responseReceived.status"></i>{{ req.responseReceived.status }} {{ req.requestSent.serviceDescription }}
              </h5>
            </div>
            <div class="sixteen wide column left aligned no-padding-left no-padding-right response-received-data js-response-received-data">
              <div class="ui grid">
                <div class="sixteen wide column right aligned buttons-json">
                  <a class="js-output-json-view">Json</a>
                  <a class="js-output-formated-view">Formaté</a>
                </div>
                <div class="sixteen wide column output-content-json">
                  <p class="js-body" :body="req.responseReceived.data">
                    <vue-json-pretty :data="req.responseReceived.data" :options="{maxDepth: 3}" class="js-output-json-data output-json-data active"></vue-json-pretty>
                    <tree-view :data="req.responseReceived.data" :options="{maxDepth: 10}" class="js-output-formated-data output-formated-data"></tree-view>
                  </p>
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
const { mapState } = createNamespacedHelpers('Console')

export default {
  name: 'Console',
  computed: {
    ...mapState(['allRequest', 'active'])
  },
  components: {
    VueJsonPretty
  },
  methods: {
    setColor: function () {
      $('.js-method-request').each(function () {
        let methodType = $(this).attr('method') === 'post' ? 'post' : 'get'
        $(this).addClass('method-' + methodType)
      })

      $('.js-status').each(function () {
        let statusType = $(this).attr('status') === '200' || $(this).attr('status') === '201' ? 'green' : 'red'
        $(this).addClass('status-' + statusType)
      })
    },
    verifyBodyNotNull: function () {
      $('.js-body').each(function () {
        let bodyStatus = $(this).attr('body') === undefined
        if (bodyStatus) {
          let currentRequest = $(this).closest('.js-request-response-data-container')
          currentRequest.find('.js-request-title').hide()
          currentRequest.find('.js-request-sent-data').hide()
          currentRequest.find('.js-response-title').addClass('reduce-padding-top')
        }
      })
    },
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
    }
  },
  updated () {
    this.setColor()
    this.verifyBodyNotNull()
    this.verifyActiveRequest()

    $('.js-plus-icon').click(function () {
      // Toggle active attr and class
      let currentRequest = $(this).closest('.js-all-request-container').find('.js-request-response-data-container')
      let currentPlusIcon = $(this).closest('.js-all-request-container').find('.js-line1')
      let currentRequestStatus = currentRequest.attr('active')
      currentRequestStatus ? currentRequest.attr('active', false) : currentRequest.attr('active', true)
      currentRequest.toggleClass('active')
      currentPlusIcon.toggleClass('active')
    })

    // Remove dotted line from vue json pretty
    $('.vjs__tree__content').css('border-left', 'none')

    // Display the right json view on click
    $('.js-input-json-view').add('.js-input-formated-view').click(function () {
      let formatedViewStatus = $(this).closest('.js-request-sent-data').find('.js-input-formated-data').hasClass('active')
      let jsonViewStatus = $(this).closest('.js-request-sent-data').find('.js-input-json-data').hasClass('active')
      let currentView = $(this).attr('class')
      if (formatedViewStatus && currentView !== 'js-input-formated-view') {
        $(this).closest('.js-request-sent-data').find('.js-input-json-data').addClass('active')
        $(this).closest('.js-request-sent-data').find('.js-input-formated-data').removeClass('active')
      }
      if (jsonViewStatus && currentView !== 'js-input-json-view') {
        $(this).closest('.js-request-sent-data').find('.js-input-formated-data').addClass('active')
        $(this).closest('.js-request-sent-data').find('.js-input-json-data').removeClass('active')
      }
    })

    $('.js-output-json-view').add('.js-output-formated-view').click(function () {
      let formatedViewStatus = $(this).closest('.js-response-received-data').find('.js-output-formated-data').hasClass('active')
      let jsonViewStatus = $(this).closest('.js-response-received-data').find('.js-output-json-data').hasClass('active')
      let currentView = $(this).attr('class')
      if (formatedViewStatus && currentView !== 'js-output-formated-view') {
        $(this).closest('.js-response-received-data').find('.js-output-json-data').addClass('active')
        $(this).closest('.js-response-received-data').find('.js-output-formated-data').removeClass('active')
      }
      if (jsonViewStatus && currentView !== 'js-output-json-view') {
        $(this).closest('.js-response-received-data').find('.js-output-formated-data').addClass('active')
        $(this).closest('.js-response-received-data').find('.js-output-json-data').removeClass('active')
      }
    })
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

  .plus-icon-container,
  .no-content-container {
    padding: 0 !important;
  }

  .request-console-container {
    padding: 0 !important;
  }

  .all-request-container {
    margin: 40px 0;
  }

  .main-all-request-container {
    border-bottom: 1px solid rgba(127, 127, 127, 0.25);
  }

  .method-service-container {
    padding: 10px 5px 10px 20px !important;
    background-color: #222d32;
    margin: 0;
  }

  .request-response-data-container {
    margin: 0 !important;
    display: none !important;
  }

  .console-container .request-console-container:first-child {
    margin: 0;
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

  .method-post {
    background-color: #248fb2;
  }

  .method-get {
    background-color: #6bbd5b;
  }

  .service-request span {
    margin-left: 10px;
    font-size: 15px;
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
    display: inline;
    float: left;
  }

  .status-message-request i {
    font-size: 5px !important;
    margin-right: 5px !important;
    display: inline-table !important;
  }

  .status-green {
    color: #00aa13;
  }

  .status-red {
    color: #e53935;
  }

  .no-padding-left {
    padding-left: 0 !important;
  }

  .no-padding-right {
    padding-right: 0 !important;
  }

  .request-title {
    padding: 20px 0 10px 0 !important;
  }

  .response-received-data,
  .request-sent-data {
    background-color: #222d32;
    padding: 0 !important;
    max-height: 600px;
    overflow-x: hidden;
  }

  .response-received-data .ui.grid,
  .request-sent-data .ui.grid {
    margin: 0;
    padding: 0 20px 20px 20px;
  }

  .output-content-json,
  .input-content-json {
    padding: 0 !important;
  }

  .buttons-json {
    padding: 10px 0 0 0 !important;
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

  .response-received-data {
    padding: 0 !important;
  }

  .output-json-data,
  .output-formated-data,
  .input-json-data,
  .input-formated-data {
    display: none;
  }

  .reduce-padding-top {
    padding-top: 20px !important;
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
</style>
