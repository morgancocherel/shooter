<template>
  <div class="ui grid">
    <div class="eleven wide column order-in-progress-container js-site-content">
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
          <router-link class="ui button submit-button back-button" to="proposition">Retour</router-link>
        </div>
        <div class="eight wide column right aligned">
          <button class="ui button submit-button submit-consult-order" @click="submitCommande">Terminer</button>
        </div>
      </div>
    </div>
    <console></console>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../store/modules/mpd-v2/commande/commande-action-types'
import Console from '../../console/Console'

const {mapState, mapActions} = createNamespacedHelpers('mpdV2/Commande')

export default {
  name: 'Commande',
  components: {Console},
  computed: {
    ...mapState([ 'idCommande' ])
  },
  methods: {
    ...mapActions({ 'submitCommande': actions.SUBMIT_COMMANDE })
  }
}
</script>

<style scoped>
  .order-in-progress-container {
    padding-top: 0 !important;
    margin-top: 40px;
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
