<template>
  <div class="ui container">
    <div class="title-container">
      <h1 class="ui header title-home">Shooter MPD</h1>
      <p>
        Bienvenue sur le Shooter MPD, choisissez la version à tester et laissez vous guider.
      </p>
    </div>
    <div class="ui grid box-container">
      <div class="seven wide column box js-left">
        <div class="ui grid box-content">
          <div class="sixteen wide column box-title-icon-container">
            <h1 class="ui header box-title">MPD v1</h1>
            <div class="box-icon">+</div>
          </div>
          <div class="sixteen wide column box-link js-link-left">
            <a href="/mpdV1/devis/devisForm" class="ui huge">Parcours CTO</a>
          </div>
        </div>
      </div>
      <div class="two wide column"></div>
      <div class="seven wide column box js-right">
        <div class="ui grid box-content">
          <div class="sixteen wide column box-title-icon-container">
            <h1 class="ui header box-title">MPD v2</h1>
            <div class="box-icon">+</div>
          </div>
          <div class="sixteen wide column box-link js-link-right">
            <a href="/mpdV2/comptesclients" class="ui huge">Création d'une commande</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Home',
  mounted () {
    $('.js-right').hover(function () {
      $('.js-link-right').addClass('active')

      $('.js-right').mouseleave(function () {
        $('.js-link-right').removeClass('active')
      })
    })

    $('.js-left').hover(function () {
      $('.js-link-left').addClass('active')

      $('.js-left').mouseleave(function () {
        $('.js-link-left').removeClass('active')
      })
    })
  }
}
</script>

<style scoped>
  .box-container {
    margin: 0;
  }

  .title-home {
    font-size: 55px !important;
    color: #13181A;
    margin-bottom: 0;
  }

  .title-container {
    margin-bottom: 40px;
  }

  .box {
    border: 1px solid #ECECEC;
    height: 400%;
    min-height: 40em;
    background-color: #FFF;
    margin: 0;
    padding: 0 !important;
  }

  .box,
  .box-content {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .box-title-icon-container {
    padding: 0 0 40px 0 !important;
  }

  .box-link {
    padding: 0 !important;
    display: none !important;
  }

  .box-title {
    font-size: 50px !important;
    font-weight: 300;
  }

  .box-icon {
    font-size: 40px;
    font-weight: 100;
  }

  .box-link a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #323E42;
    text-transform: uppercase;
    padding-bottom: 0.5em;
    font-size: 18px;
  }

  .box-link a:hover {
    text-decoration: underline;
  }

  .active {
    display: block !important;
  }
</style>
