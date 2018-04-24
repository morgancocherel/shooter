<template>
  <div class="console-content js-console-content inactive-console">
    <div class="ui grid">
      <div class="sixteen wide column center aligned middle aligned">
        <h3 class="ui header centered">Requêtes en cours</h3>
      </div>
      <div class="ui stackable celled grid request-container" v-for="req in getAllRequest" :key="req.id">
        <div class="one wide column middle aligned center aligned">
          <div><i class="caret right icon js-open-close-request-icon"></i></div>
        </div>
        <div class="one wide column middle aligned center aligned count-request">
          <span>1</span>
        </div>
        <div class="two wide column middle aligned center aligned method-request">
          <span>{{ req.requestSent.method }}</span>
        </div>
        <div class="three wide column middle aligned left aligned service-request">
          <span>{{ req.requestSent.service }}</span>
        </div>
        <div class="seven wide column middle aligned right aligned service-description-request">
          <span>{{ req.requestSent.serviceDescription }}</span>
        </div>
        <div class="two wide column middle aligned center aligned status-request">
          <span>{{ req.responseReceived.status }}</span>
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
              <a class="item js-formated-data">
                Formaté
              </a>
              <a class="item js-json active">
                JSON
              </a>
            </div>
            <div class="ui segment">
              <p class="js-request-data-display request-data-display">
                <vue-json-pretty :data="req.requestSent" :options="{maxDepth: 3}"></vue-json-pretty>
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
  name: 'Sidebar',
  components: {
    VueJsonPretty
  },
  computed: {
    ...mapGetters(['getAllRequest'])
  },
  mounted () {
    $(document).mouseup(function (e) {
      let container = $('.js-console-content')

      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass('active-sidebar')
        container.addClass('inactive-sidebar')
      }
    })

    // Open request on click on the icon
    $('.js-open-close-request-icon').click(function () {
      $('.js-data-request').slideToggle()
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
      $('.js-item').children().each(function () {
        if ($(this).hasClass('active')) {
          menuSelectedTable.push($.trim(this.className.split('js-')[1].replace(/active.*/i, '')))
        }
        let menuSelectedString = menuSelectedTable.join(' ')

        $('.js-request-data-display').html()
        switch (true) {
          case (menuSelectedString === 'input formated-data'):
            $('.js-request-data-display').html('<vue-tree-view :data="req.requestSent" :options="{maxDepth: 3}"></vue-tree-view>')
            break
          case (menuSelectedString === 'input json'):
            $('.js-request-data-display').html('<vue-json-pretty :data="req.requestSent" :options="{maxDepth: 3}"></vue-json-pretty>')
            break
          case (menuSelectedString === 'output formated-data'):
            $('.js-request-data-display').html('<vue-tree-view :data="req.responseReceived" :options="{maxDepth: 3}"></vue-tree-view>')
            break
          case (menuSelectedString === 'output json'):
            $('.js-request-data-display').html('<vue-json-pretty :data="req.responseReceived" :options="{maxDepth: 3}"></vue-json-pretty>')
            break
        }
      })
    })
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
    padding-top: 60px;
    transition: 0.5s;
  }

  @media screen and (max-height: 450px) {
    .console-content { padding-top: 15px; }
  }

  .request-container {
    margin-top: 0 !important;
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
    background-color: #10A54A;
    border-radius: 2px;
    color: #FFF;
    font-weight: 600;
  }

  .count-request {
    color: #FF0000;
  }

  .service-request,
  .status-request {
    color: #13181A;
  }

  .service-description-request {
    color: #10A54A;
  }

  /* Data request */
  .data-request {
    border-top: 1px solid #DCE3E6;
  }

  .request-data-display {
    text-align: left;
  }

  /* active - inacive sidebar*/
  .active-console {
    width: 600px;
  }

  .inactive-console {
    width: 0;
  }
</style>
