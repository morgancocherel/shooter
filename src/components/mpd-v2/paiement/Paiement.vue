<template>
    <div class="ui grid main-container">
      <div class="eleven wide column payment-container active-console js-site-content">
        <div class="ui grid">
          <div class="sixteen wide column center aligned">
            <h1 class="ui header">Paiement</h1>
          </div>
          <div class="sixteen wide column left aligned">
            <div class="ui accordion segment js-accordion">
              <div class="title active">
                <i class="dropdown icon"></i>
                <h3 class="ui header">Paiement</h3>
              </div>
              <div class="content active first-level-accordion">
                <div class="ui grid">
                  <div class="three wide column left aligned"><strong>Url ihm de paiement</strong></div>
                  <div class="twelve wide column left aligned">{{ urlIhmPaiement }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="sixteen wide column">
            <router-link class="ui button submit-button back-button" to="/mpdV2/commandes/finCommande">Retour</router-link>
            <router-link class="ui button submit-button back-button" to="/">Accueil</router-link>
          </div>
        </div>
      </div>
      <console></console>
    </div>
</template>

<script>
import $ from 'jquery'
import Console from '../../console/Console'
import {createNamespacedHelpers} from 'vuex'

const {mapState} = createNamespacedHelpers('mpdV2/paiement')

export default {
  name: 'paiement',
  components: {Console},
  computed: {
    ...mapState([
      'urlIhmPaiement'
    ])
  },
  methods: {
    setStagePoint: function () {
      $('.js-stage-point').attr('data-stage', 'paiement')
    }
  },
  mounted () {
    this.setStagePoint()
  }
}
</script>

<style scoped>
  .main-container {
    margin: 0 !important;
  }

  .payment-container {
    padding: 0 !important;
    margin-top: 40px;
  }

  .payment-container.active-console {
    padding-right: 20px !important;
  }

  .payment-container .ui.grid {
    margin: 0 !important;
  }

  h1.ui.header {
    margin-bottom: 1rem;
  }

  /* Accordion View */
  h3.ui.header,
  h4.ui.header {
    margin: 0;
    display: inline-block;
    color: #21314D;
  }

  h3.ui.header {
    font-size: 18px !important;
  }

  h4.ui.header {
    font-size: 16px !important;
  }

  strong {
    font-weight: bolder;
  }

  .first-level-accordion {
    margin: 0 25px;
  }

  .content {
    padding: 0 10px;
  }

  /* navigation buttons */
  .submit-button {
    color: #FFF;
    padding: 12px 22px;
    border-radius: 0.3125em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .back-button {
    background-color: #8C9DA1;
    color: #FFF;
  }

  .back-button:hover {
    background-color: #7e9196;
    color: #FFF;
  }
</style>
