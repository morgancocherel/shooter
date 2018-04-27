<template>
  <div class="console-content js-console-content inactive-console">
    <div class="ui internally celled grid">
      <div class="sixteen wide column right aligned">
        <button type="button" tabindex="11" title="close" class="close-console js-close-console"></button>
      </div>
      <div class="sixteen wide column left aligned">
        <h3 class="ui header centered">Requêtes en cours</h3>
      </div>
      <div class="ui stackable celled grid request-container js-request-container" v-for="req in getAllRequest" :key="req.id">
        <div class="one wide column middle aligned center aligned">
          <div><i class="caret right icon js-open-close-request-icon"></i></div>
        </div>
        <div class="two wide column middle aligned center aligned method-request js-method-request">
          <span>{{ req.requestSent.method }}</span>
        </div>
        <div class="eleven wide column middle aligned right aligned service-description-request js-service-description-request">
          <span>{{ req.requestSent.serviceDescription }}</span>
        </div>
        <div class="two wide column middle aligned center aligned status-request">
          <span>{{ req.responseReceived.status}}</span>
        </div>
        <div class="sixteen wide column data-request js-data-request" style="display: none;">
          <div class="ui pointing menu js-item">
            <a class="item js-input active">
              Input
            </a>
            <a class="item js-output">
              Output
            </a>
          </div>
          <div class="ui segment">
            <div class="ui secondary pointing menu js-item">
              <a class="item js-formated-data active">
                Formaté
              </a>
              <a class="item js-json">
                JSON
              </a>
            </div>
            <div class="ui segment request-data-display-container">
              <p class="js-request-data-display request-data-display">
                <tree-view :data="req.requestSent" :options="{maxDepth: 3}" class="js-input-formated-data active-data-view"></tree-view>
                <vue-json-pretty :data="req.requestSent" :options="{maxDepth: 3}" class="js-input-json inactive-data-view"></vue-json-pretty>
                <tree-view :data="req.responseReceived" :options="{maxDepth: 3}" class="js-output-formated-data inactive-data-view"></tree-view>
                <vue-json-pretty :data="req.responseReceived" :options="{maxDepth: 3}" class="js-output-json inactive-data-view"></vue-json-pretty>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import $ from 'jquery'
import VueJsonPretty from 'vue-json-pretty'

const {mapGetters} = createNamespacedHelpers('Console')

export default {
  name: 'Console',
  components: {
    VueJsonPretty
  },
  computed: {
    ...mapGetters(['getAllRequest'])
  },
  mounted () {
    // Open request on click on the icon
    $('.js-open-close-request-icon').click(function () {
      $(this).closest('.js-request-container').find('.js-data-request').slideToggle()
      $(this).toggleClass('rotate')
    })

    // Display the right data on click with the format selected
    $('.js-input').add('.js-output').add('.js-formated-data').add('.js-json').click(function () {
      let currentMenuSelected = $(this).hasClass('active')
      let classNameSelected = 'js-' + this.className.split('js-')[1].replace(/active.*/i, '')
      console.log(currentMenuSelected, classNameSelected)

      // Set active the menu selected
      if (currentMenuSelected === false) {
        if (classNameSelected === 'js-input' || classNameSelected === 'js-output') {
          $('.js-input').add('.js-output').removeClass('active')
          $('.' + classNameSelected).addClass('active')
        } else {
          $('.js-formated-data').add('.js-json').removeClass('active')
          $('.' + classNameSelected).addClass('active')
        }
      }

      // Append the data with the format selected
      let menuSelectedTable = []
      let newDataView = null
      $('.js-item').children().each(function () {
        if ($(this).hasClass('active')) {
          menuSelectedTable.push($.trim(this.className.split('js-')[1].replace(/active.*/i, '')))
        }
        let menuSelectedString = menuSelectedTable.join(' ')

        switch (true) {
          case (menuSelectedString === 'input formated-data'):
            newDataView = 'js-input-formated-data'
            break
          case (menuSelectedString === 'input json'):
            newDataView = 'js-input-json'
            break
          case (menuSelectedString === 'output formated-data'):
            newDataView = 'js-output-formated-data'
            break
          case (menuSelectedString === 'output json'):
            newDataView = 'js-output-json'
            break
        }
      })

      // Hide previous menu data view selected
      $('.js-request-data-display').children().each(function () {
        if ($(this).hasClass('active-data-view')) {
          $(this).removeClass('active-data-view')
          $(this).addClass('inactive-data-view')
        }
      })

      // Set the new menu data view selected
      $('.' + newDataView).addClass('active-data-view')
      $('.' + newDataView).removeClass('inactive-data-view')
    })

    // Close console
    $('.js-close-console').click(function () {
      $('.js-console-content').toggleClass('inactive-console')
      $('.js-console-content').toggleClass('active-console')
    })

    // Set the right background color for method request
    setMethodColor()

    function setMethodColor () {
      $('.js-method-request').each(function () {
        let currentMethod = $(this).children().html().toLowerCase()
        switch (true) {
          case (currentMethod === 'post'):
            $(this).addClass('post-method')
            $(this).closest('.js-request-container').find('.js-service-description-request').children().addClass('post-service-description-request')
            break
          case (currentMethod === 'get'):
            $(this).addClass('get-method')
            $(this).closest('.js-request-container').find('.js-service-description-request').children().addClass('get-service-description-request')
            break
        }
      })
    }
  }
}

</script>

<style scoped>
  .console-content {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #FFF;
    overflow-x: hidden;
    margin-top: 60px;
    transition: 0.5s;
  }

  @media screen and (max-height: 450px) {
    .console-content { padding-top: 15px; }
  }

  .request-container {
    margin-top: 0 !important;
    padding: 0;
  }

  .service-description-request span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 13px;
  }

  /* row request */
  i.caret.right.icon {
    cursor: pointer;
    margin: 0;
  }

  .rotate{
    -ms-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .method-request {
    border-radius: 2px;
    color: #FFF;
    font-weight: 600;
  }

  .post-method {
    background-color: #10A54A;
  }

  .get-method {
    background-color: #0f6ab4;
  }

  .get-service-description-request {
    color: #0f6ab4;
  }

  .post-service-description-request {
    color: #10A54A;
  }

  .service-request,
  .status-request {
    color: #13181A;
  }

  .service-description-request {
    white-space: nowrap;
  }

  /* Data request */
  .data-request {
    border-top: 1px solid #DCE3E6;
  }

  .request-data-display {
    text-align: left;
  }

  .request-data-display-container {
    max-height: 400px;
    overflow-y: scroll;
  }

  .request-data-display .inactive-data-view {
    display: none !important;
  }

  button.close-console:hover {
    opacity: 1;
    cursor: pointer;
  }

  button.close-console {
    width: 30px;
    height: 30px;
    border: none;
    background: url('../../assets/closeIcon.svg') no-repeat center center transparent;
    background-size: 20px 20px;
    opacity: 0.5;
  }

  /* active - inacive sidebar*/
  .active-console {
    width: 600px;
  }

  .inactive-console {
    width: 0;
  }

  /* tree view data view */
  .request-data-display .vjs__tree .vjs__tree__content {
    border-left: 1px solid red !important;
  }
</style>
