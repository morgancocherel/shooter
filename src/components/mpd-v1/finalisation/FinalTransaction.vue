<template>
  <div class="ui grid main-container" data-content="middle-on-hide-console">
    <div class="eleven wide column final-transaction-container active-console js-site-content">
      <div class="ui grid">
        <div class="sixteen wide column left aligned">
          <h3 class="ui header travel-information-reminder">Rappel du trajet</h3>
          <p class="sub-travel-information-reminder">Vous trouverez ci-dessous le résumé du trajet commandé.</p>
        </div>
        <div class="sixteen wide column">
          <div class="ui grid segment main-segment">
            <div class="one wide column center aligned left aligned no-padding-left no-padding-top-bottom"><i class="user icon"></i></div>
            <div class="seven wide column left aligned traveler-data no-padding-top-bottom" v-for="voyageurs in proposalSelected.voyage.voyageurs" :key="voyageurs.id">
              <span>{{ voyageurs.num}} Passager</span>
              <span>{{ voyageurs.typologie }} de {{ voyageurs.age }} ans, sans carte</span>
              <span>Valable sur TER uniquement pour la date de voyage choisie. Billet non-échangeable et non-remboursable.</span>
            </div>
            <div class="one wide column center aligned no-padding-top-bottom"><i class="train icon"></i></div>
            <div class="one wide column no-padding-top-bottom">
              <h5 class="ui header">{{ proposalSelected.departure_time.text }}</h5>
              <h5 class="ui header">{{ proposalSelected.arrival_time.text }}</h5>
            </div>
            <div class="two wide column no-padding-top-bottom">
              <h5 class="ui header">{{ proposalSelected.start_point.label }}</h5>
              <h5 class="ui header">{{ proposalSelected.end_point.label }}</h5>
            </div>
            <div class="four wide column center aligned middle aligned no-padding-top-bottom no-pading-right" v-for="segment in proposalSelected.voyage.itineraireAller.segments" :key="segment.id">
              <span>{{ proposalSelected.duration.value | durationFormat }}</span>
              <span>{{ segment.libelleEquipement }} {{ segment.numTrain }} | 2<sup>e</sup> class</span>
            </div>
          </div>
        </div>
        <div class="sixteen wide column left aligned">
          <h3 class="ui header travel-information-reminder">Rappel information passager</h3>
          <p class="sub-travel-information-reminder">Vous trouverez ci-dessous les informations relatifs au passager.</p>
        </div>
        <div class="sixteen wide column">
          <div class="ui grid segment">
            <div class="two wide column"></div>
            <div class="eight wide column left aligned">
              <label class="name-traveler">Nom</label>
            </div>
            <div class="six wide column left aligned">
              <label class="email-traveler">Email</label>
            </div>
            <div class="two wide column">
              <span><strong>Passager 1</strong></span>
            </div>
            <div class="eight wide column left aligned">
              <span>{{ firstname }} {{ lastname }}</span>
            </div>
            <div class="six wide column left aligned">
              <span>{{ emailTravelerContact }}</span>
            </div>
          </div>
        </div>
        <div class="sixteen wide column left aligned">
          <div class="ui accordion segment js-accordion">
            <div class="title">
              <i class="dropdown icon"></i>
              <h3 class="ui header">Paiement</h3>
            </div>
            <div class="content first-level-accordion">
              <div class="ui grid">
                <div class="three wide column"><strong>Jeton transaction</strong></div>
                <div class="three wide column"><span>{{ jetonTransaction }}</span></div>
                <div class="three wide column"><strong>Duree validation</strong></div>
                <div class="seven wide column left aligned"><span>{{ dureeValiditeJeton }}</span></div>
                <div class="three wide column"><strong>Url ihm paiement</strong></div>
                <div class="thirteen wide column left aligned"><span>{{ urlIhmPaiement }}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="eight wide column left aligned">
          <router-link class="ui button submit-button back-button" to="/mpdV1/paiement">Annuler transaction</router-link>
        </div>
        <div class="eight wide column right aligned">
          <button @click="submitTransaction"  class="ui button submit-button submit-transaction" v-bind:class="{ loading: finalisationButtonIsLoading }">Continuer</button>
        </div>
      </div>
    </div>
    <console></console>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import $ from 'jquery'
import * as actions from '../../../store/modules/mpd-v1/finalisation/finalisation-action-types'
import filters from '../../../mixins/filters'
import Console from '../../console/Console'

const {mapState, mapActions} = createNamespacedHelpers('mpdV1/finalisation')

export default {
  name: 'finalisation',
  components: {Console},
  computed: {
    ...mapState([
      'emailTravelerContact',
      'firstname',
      'lastname',
      'proposalSelected',
      'jetonTransaction',
      'dureeValiditeJeton',
      'urlIhmPaiement',
      'finalisationButtonIsLoading'
    ])
  },
  mixins: [filters],
  methods: {
    ...mapActions({
      'submitTransaction': actions.SUBMIT_TRANSACTION
    }),
    setStagePoint: function () {
      $('.js-stage-point').attr('data-stage', 'finalisation')
    }
  },
  mounted () {
    // Set up all accordions menus
    $('.js-accordion').accordion({exclusive: false})

    // Set the stage point
    this.setStagePoint()
  }
}
</script>

<style scoped>
  /* mutual style */
  .main-container {
    margin: 0 !important;
  }

  .container {
    display: inline-flex;
    margin: 0 !important;
  }

  .final-transaction-container {
    padding: 0 !important;
    margin-top: 40px;
  }

  .final-transaction-container.active-console {
    padding-right: 20px !important;
  }

  .final-transaction-container .ui.grid {
    margin: 0;
  }

  .no-padding-top-bottom {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .no-padding-left {
    padding-left: 0 !important;
  }

  .no-pading-right {
    padding-left: 0 !important;
  }

  .main-segment {
    padding: 10px 25px;
    line-height: 28px;
  }

  .travel-information-reminder {
    color: #13181A;
    font-size: 20px !important;
    font-weight: 600;
  }

  .sub-travel-information-reminder {
    font-size: 17px;
  }

  label.email-traveler,
  label.name-traveler {
    color: #8C9DA1;
    font-size: 14px;
  }

  .segment {
    border: 1px solid #DCE3E6;
    box-shadow: none;
  }

  /* Accordion View */
  h3.ui.header {
    margin: 0;
    display: inline-block;
    color: #21314D;
  }

  .first-level-accordion {
    margin: 0 25px;
  }

  /* Navigation buttons */
  .submit-button {
    color: #FFF;
    padding: 12px 22px;
    border-radius: 0.3125em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .submit-transaction {
    background-color: #01C3A7;
  }

  .submit-transaction:hover,
  .submit-transaction:focus {
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
