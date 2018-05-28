<template>
    <div class="ui grid main-container">
      <div class="eleven wide column payment-container active-console">
        <div class="ui grid">
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
        </div>
        <h1 class="ui header">Demande de paiement</h1>
      </div>
      <console></console>
    </div>
</template>

<script>
import Console from '../../console/Console'
import {createNamespacedHelpers} from 'vuex'

const {mapState} = createNamespacedHelpers('mpdV2/Paiement')

export default {
  name: 'CompteClient',
  components: {Console},
  computed: {
    ...mapState([
      'urlIhmPaiement'
    ])
  }
}
</script>

<style scoped>
  .main-container {
    margin: 0;
  }

  .payment-container {
    padding: 0 !important;
    margin-top: 40px;
  }

  .payment-container.active-console {
    padding-right: 20px !important;
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
</style>
