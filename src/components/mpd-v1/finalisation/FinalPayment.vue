<template>
  <div class="ui grid container final-commande-container">
    <div class="sixteen wide column left aligned">
      <h3 class="ui header">Résultat du paiement</h3>
      <p class="sub-travel-information-reminder">
        Un email récapitulatif de confirmation sera envoyé à <strong>{{ getFirstname }} {{ getLastname }}</strong>
        à l'adresse suivante: <strong>{{ getEmailTravelerContact }}</strong>
      </p>
    </div>
    <div class="eight wide column left aligned">
      <button class="ui button submit-button back-button" @click="returnToFinalOperation">Annuler la commande</button>
    </div>
    <div class="eight wide column right aligned">
      <button @click="submitFinalisation"  class="ui button submit-button submit-finalisation" v-bind:class="{ loading: getFinalisationButtonIsLoading }">Terminer</button>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../store/modules/mpd-v1/finalisation/finalisation-action-types'

const {mapGetters, mapActions} = createNamespacedHelpers('mpdV1/Finalisation')

export default {
  name: 'Finalisation',
  computed: {
    ...mapGetters([
      'getFinalisationButtonIsLoading',
      'getEmailTravelerContact',
      'getFirstname',
      'getLastname'
    ])
  },
  methods: {
    ...mapActions({
      'submitFinalisation': actions.SUBMIT_FINALISATION,
      'returnToFinalOperation': actions.RETURN_TO_FINAL_PAYMENT
    })
  }
}
</script>

<style scoped>
  /* Navigation buttons */
  .final-commande-container {
    margin: 40px 0 0 0;
    display: inline-flex;
  }

  .submit-button {
    color: #FFF;
    padding: 12px 22px;
    border-radius: 0.3125em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .submit-finalisation {
    background-color: #01C3A7;
  }

  .submit-finalisation:hover,
  .submit-finalisation:focus {
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
