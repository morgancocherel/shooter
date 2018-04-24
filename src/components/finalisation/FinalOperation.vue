<template>
  <div>
    <sidebar></sidebar>
    <header-top></header-top>
    <main-form></main-form>
    <div class="ui grid container">
      <div class="sixteen wide column left aligned">
        <h3 class="ui header travel-information-reminder">Rappel du trajet</h3>
        <p class="sub-travel-information-reminder">Vous trouverez ci-dessous le résumé du trajet commandé.</p>
      </div>
      <div class="sixteen wide column">
        <div class="ui grid segment main-segment">
          <div class="one wide column center aligned left aligned no-padding-left no-padding-top-bottom"><i class="user icon"></i></div>
          <div class="seven wide column left aligned traveler-data no-padding-top-bottom" v-for="voyageurs in getProposalSelected.voyage.voyageurs" :key="voyageurs.id">
            <span>{{ voyageurs.num}} Passager</span>
            <span>{{ voyageurs.typologie }} de {{ voyageurs.age }} ans, sans carte</span>
            <span>Valable sur TER uniquement pour la date de voyage choisie. Billet non-échangeable et non-remboursable.</span>
          </div>
          <div class="one wide column center aligned no-padding-top-bottom"><i class="train icon"></i></div>
          <div class="one wide column no-padding-top-bottom">
            <h5 class="ui header">{{ getProposalSelected.departure_time.text }}</h5>
            <h5 class="ui header">{{ getProposalSelected.arrival_time.text }}</h5>
          </div>
          <div class="two wide column no-padding-top-bottom">
            <h5 class="ui header">{{ getProposalSelected.start_point.label }}</h5>
            <h5 class="ui header">{{ getProposalSelected.end_point.label }}</h5>
          </div>
          <div class="four wide column center aligned middle aligned no-padding-top-bottom no-pading-right" v-for="segment in getProposalSelected.voyage.itineraireAller.segments" :key="segment.id">
            <span>{{ getProposalSelected.duration.text }}</span>
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
            <span>{{ getFirstname }} {{ getLastname }}</span>
          </div>
          <div class="six wide column left aligned">
            <span>{{ getEmailTravelerContact }}</span>
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
              <div class="three wide column"><span>{{ getJetonTransaction }}</span></div>
              <div class="three wide column"><strong>Duree validation</strong></div>
              <div class="seven wide column left aligned"><span>{{ getDureeValiditeJeton }}</span></div>
              <div class="three wide column"><strong>Url ihm paiement</strong></div>
              <div class="thirteen wide column left aligned"><span>{{ getUrlIhmPaiement }}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="eight wide column left aligned">
        <router-link to="/commandes"><button class="ui button submit-button back-button">Annuler transaction</button></router-link>
      </div>
      <div class="eight wide column right aligned">
        <button @click="submitTransaction"  class="ui button submit-button submit-finalisation">Continuer</button>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import HeaderTop from '../header-top/HeaderTop'
import MainForm from '../main-form/Username'
import Sidebar from '../console/Sidebar'
import $ from 'jquery'
import * as actions from '../../store/modules/finalisation/finalisation-action-types'

const {mapGetters, mapActions} = createNamespacedHelpers('Finalisation')

export default {
  name: 'Finalisation',
  components: {Sidebar, MainForm, HeaderTop},
  computed: {
    ...mapGetters([
      'getEmailTravelerContact',
      'getFirstname',
      'getLastname',
      'getProposalSelected',
      'getJetonTransaction',
      'getDureeValiditeJeton',
      'getUrlIhmPaiement'
    ])
  },
  methods: {
    ...mapActions({
      'submitTransaction': actions.SUBMIT_TRANSACTION
    })
  },
  mounted () {
    // Set up all accordions menus
    $('.js-accordion').accordion({exclusive: false})
  }
}
</script>

<style scoped>
  /* Mutual styles */
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
    color: #323E42;
    font-size: 17px;
  }

  label.email-traveler,
  label.name-traveler {
    color: #8C9DA1;
    font-size: 14px;
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
