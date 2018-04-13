<template>
  <div class="ui right vertical sidebar menu js-console">
    <div class="ui internally celled grid">
      <div class="row">
        <div class="sixteen wide column">
          <h3 class="ui header centered">Requêtes en cours</h3>
        </div>
      </div>
      <div class="row" v-for="req in getAllRequest" :key="req.id">
        <div class="one wide column middle aligned center aligned">
          <div><i class="caret right icon js-open-close-request-icon"></i></div>
        </div>
        <div class="one wide column middle aligned center aligned">
          <h5 class="ui header">1</h5>
        </div>
        <div class="two wide column middle aligned center aligned">
          <h5 class="ui header">{{ req.requestSent.status }}</h5>
        </div>
        <div class="three wide column middle aligned left aligned">
          <h5 class="ui header"></h5>
        </div>
        <div class="seven wide column middle aligned right aligned">
          <h5 class="ui header"></h5>
        </div>
        <div class="two wide column middle aligned center aligned">
          <h5 class="ui header"></h5>
        </div>
        <div class="sixteen wide column data-request js-data-request" style="display: none;">
          <div class="ui pointing menu">
            <a class="item active">
              Input
            </a>
            <a class="item">
              Output
            </a>
          </div>
          <div class="ui segment">
            <div class="ui secondary pointing menu">
              <a class="active item">
                Formaté
              </a>
              <a class="item">
                JSON
              </a>
            </div>
            <div class="ui segment">
              <p></p>
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

const {mapGetters} = createNamespacedHelpers('Console')

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters(['getAllRequest'])
  },
  mounted () {
    $('.js-console').sidebar('attach events', '.js-sidebar')

    // Open requet on click on the icon
    $('.js-open-close-request-icon').click(function () {
      $('.js-data-request').slideToggle()
      $(this).toggleClass('rotate')
    })
  }
}

</script>

<style scoped>
  .ui.right.vertical.sidebar.menu{
    width: 40% !important;
    margin-left: -40% !important;
  }

  .row {
    border-bottom: 1px solid #DCE3E6
  }

  .ui.header.centered {
    color: #21314D;
    padding: 10px;
  }

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
</style>
