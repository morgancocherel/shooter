<template>
  <div class="ui grid main-container">
    <div class="eleven wide column order-in-progress-container active-console js-site-content">
      <div class="ui grid">
        <div class="sixteen wide column center aligned">
          <h1 class="ui header">Commande en cours</h1>
        </div>
        <div class="sixteen wide column">
          <div class="ui segment">
            <div class="ui grid">
              <div class="two wide column left aligned"><strong>Id commande</strong></div>
              <div class="fourteen wide column left aligned">{{ idCommande }}</div>
            </div>
          </div>
        </div>
        <div class="eight wide column left aligned">
          <button class="ui button submit-button back-button" @click="returnToPropositionSelected">Retour</button>
        </div>
        <div class="eight wide column right aligned">
          <button class="ui button submit-button submit-consult-order" @click="consultOrderInProgress" v-bind:class="{ loading: commandeIsLoading }">Continuer</button>
        </div>
      </div>
    </div>
    <console></console>
  </div>
</template>

<script>
import $ from 'jquery'
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../store/modules/mpd-v2/commande/commande-action-types'
import Console from '../../console/Console'

const {mapState, mapActions} = createNamespacedHelpers('mpdV2/commande')

export default {
  name: 'commande',
  components: { Console },
  computed: {
    ...mapState([
      'idCommande',
      'commandeIsLoading'
    ])
  },
  methods: {
    ...mapActions({
      'consultOrderInProgress': actions.CONSULT_ORDER_IN_PROGRESS,
      'returnToPropositionSelected': actions.RETURN_TO_PROPOSITION_SELECTED
    }),
    setStagePoint: function () {
      $('.js-stage-point').attr('data-stage', 'commande')
    }
  },
  mounted () {
    // Set the stage point
    this.setStagePoint()
  }
}
</script>

<style scoped>
  .main-container {
    margin: 0;
  }

  .order-in-progress-container {
    padding: 0 !important;
    margin-top: 40px;
  }

  .order-in-progress-container.active-console {
    padding-right: 20px !important;
  }

  .order-in-progress-container .ui.grid {
    margin: 0;
  }

    /* navigation buttons */
  .submit-button {
    color: #FFF;
    padding: 12px 22px;
    border-radius: 0.3125em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .submit-consult-order {
    background-color: #01C3A7;
  }

  .submit-consult-order:hover,
  .submit-consult-order:focus {
    background-color: #01aa91;
    border-color: #01aa91;
    color: #FFF;
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
