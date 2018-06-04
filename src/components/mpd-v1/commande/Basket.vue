<template>
  <div class="ui grid main-container" data-content="middle-on-hide-console">
    <div class="eleven wide column basket-container active-console js-site-content">
      <div class="ui grid">
        <div class="sixteen wide column">
          <div class="ui grid segment">
            <div class="one wide column center aligned middle aligned">
              <div class="sncf_logo"></div>
            </div>
            <div class="thirteen wide column left aligned basket-information-container">
              <p>Aller simple de <strong>{{ proposalSelected.start_point.label | stationFormat }} à {{ proposalSelected.end_point.label | stationFormat }}</strong> </p>
              <p>Pour un <strong>{{ proposalSelected.voyage.voyageurs[0].typologie }}</strong> </p>
              <p><strong>{{ proposalSelected.departure_time.text }} - {{ proposalSelected.arrival_time.text }} </strong> le {{ proposalSelected.departure_time.value | dateFormat }}</p>
            </div>
            <div class="two wide column right aligned middle aligned">
              <span><strong>{{ priceSelected | priceFormat}}</strong></span>
            </div>
          </div>
        </div>
        <div class="ui header who-travel">Qui voyage ?</div>
        <div class="sixteen wide column">
          <div class="ui grid form segment">
            <div class="sixteen wide column left aligned basket-information-container">
              <p>Information du passager</p>
              <span class="traveler-name-information">Le nom figurera sur les billets</span>
            </div>
            <div class="ten wide column left aligned basket-information-container reduce-padding-bottom">
              <p>Passger 1 - <strong>{{ proposalSelected.voyage.voyageurs[0].typologie }}</strong></p>
            </div>
            <div class="six wide column left aligned basket-information-containe reduce-padding-bottom">
              <label class="birth-traveler">Date de naissance</label>
            </div>
            <div class="two wide column no-padding-top">
              <select class="ui dropdown fluid" title="civility" @input="updateCivility">
                <option disabled selected>Civilité</option>
                <option v-for="civ in allCivilities" :key="civ.id" :value="civ.value">{{ civ.text }}</option>
              </select>
            </div>
            <div class="four wide column no-padding-top">
              <input class="fluid" placeholder="Prénom" type="text" title="firstname" :value="firstname"
                     @input="updateFirstname"/>
            </div>
            <div class="four wide column no-padding-top">
              <input class="fluid" placeholder="Nom" type="text" title="lastname" :value="lastname"
                     @input="updateLastname"/>
            </div>
            <div class="two wide column no-padding-top">
              <input class="fluid" placeholder="JJ" type="text" title="dayBirth" :value="dayBirth"
                     @input="updateDayBirth"/>
            </div>
            <div class="two wide column no-padding-top">
              <select class="ui dropdown fluid" title="monthBirth" @input="updateMonthBirth">
                <option disabled selected>Mois</option>
                <option v-for="mo in allMonths" :key="mo.id" :value="mo.text">{{ mo.text }}</option>
              </select>
            </div>
            <div class="two wide column no-padding-top">
              <input class="fluid" placeholder="AAAA" type="text" title="yearBirth" :value="yearBirth"
                     @input="updateYearBirth"/>
            </div>
          </div>
        </div>
        <div class="sixteen wide column">
          <div class="ui grid form segment">
            <div class="sixteen wide column left aligned basket-information-container">
              <p>Information de contact</p>
              <span class="contact-name-information">Pour envoyer vos billets et effectuer les opérations d'après-vente</span>
            </div>
            <div class="three wide column no-padding-top">
              <select class="ui dropdown fluid" title="travelerContact" @input="updateTravelerContact">
                <option disabled selected>Choisir</option>
                <option v-for="traveler in allTravelers" :key="traveler.id" :value="traveler.text">{{ traveler.text }}</option>
              </select>
            </div>
            <div class="eight wide column no-padding-top">
              <input class="fluid" placeholder="Email" type="text" title="emailTravelerContact" :value="emailTravelerContact"
                     @input="updateEmailTravelerContact"/>
            </div>
          </div>
        </div>
        <div class="eight wide column left aligned">
          <router-link class="ui button submit-button back-button" to="/mpdV1/devis/trajetsOffres">Retour</router-link>
        </div>
        <div class="eight wide column right aligned">
          <button @click="consultCommandeInProgress"  class="ui button submit-button submit-basket" v-bind:class="{ loading: commandeButtonIsLoading }">Réserver ({{ priceSelected | priceFormat }})</button>
        </div>
      </div>
    </div>
    <console></console>
  </div>
</template>

<script>
import $ from 'jquery'
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../store/modules/mpd-v1/commande/commande-action-types'
import filters from '../../../mixins/filters'
import Console from '../../console/Console'

const {mapState, mapActions} = createNamespacedHelpers('mpdV1/commande')

export default {
  name: 'commande',
  components: {Console},
  mixins: [filters],
  computed: {
    ...mapState([
      'proposalSelected',
      'priceSelected',
      'allCivilities',
      'firstname',
      'lastname',
      'dayBirth',
      'monthBirth',
      'yearBirth',
      'allMonths',
      'allTravelers',
      'emailTravelerContact',
      'travelerContact',
      'commandeButtonIsLoading'
    ])
  },
  methods: {
    ...mapActions({
      'updateCivility': actions.EDIT_CIVILITY,
      'updateFirstname': actions.EDIT_FIRSTNAME,
      'updateLastname': actions.EDIT_LASTNAME,
      'updateDayBirth': actions.EDIT_DAY_BIRTH,
      'updateMonthBirth': actions.EDIT_MONTH_BIRTH,
      'updateYearBirth': actions.EDIT_YEAR_BIRTH,
      'updateTravelerContact': actions.EDIT_TRAVELER_CONTACT,
      'updateEmailTravelerContact': actions.EDIT_TRAVELER_EMAIL_CONTACT,
      'consultCommandeInProgress': actions.CONSULT_ORDER_IN_PROGRESS
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
  /* Mutual styles */
  .main-container {
    margin: 0 !important;
  }

  .container {
    display: inline-flex;
    margin: 0 !important;
  }

  .basket-container {
    padding: 0 !important;
    margin-top: 40px;
  }

  .basket-container.active-console {
    padding-right: 20px !important;
  }

  .basket-container .ui.grid {
    margin: 0;
  }

  .basket-information-container {
    line-height: 28px;
  }

  .ui.segment {
    padding: 10px 25px;
  }

  .segment {
    border: 1px solid #DCE3E6;
    box-shadow: none;
  }

  .wide.column {
    padding: 0;
  }

  .basket-information-container p {
    display: block;
    font-size: 17px;
    margin-bottom: 0;
  }

  .who-travel{
    color: #13181A;
    font-size: 20px !important;
    font-weight: 600;
  }

  .no-padding-top {
    padding-top: 0 !important;
  }

  .reduce-padding-bottom {
    padding-bottom: 10px !important;
  }

  /* Summary travel block*/
  .sncf_logo {
    background-image: url('../../../assets/sncfLogo.svg');
    height: 15px;
    background-repeat: no-repeat;
  }

  /* Traveler information block */
  span.traveler-name-information {
    color: #E87619;
    font-size: 14px;
  }

  label.birth-traveler {
    color: #8C9DA1;
    font-size: 14px;
  }

  .label-traveler-information p {
    padding-bottom: 0 !important;
  }

  /*Contact information block */
  span.contact-name-information {
    color: #8C9DA1;
    font-size: 14px;
  }

  /* Navigation buttons */
  .submit-button {
    color: #FFF;
    padding: 12px 22px;
    border-radius: 0.3125em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .submit-basket {
    background-color: #01C3A7;
  }

  .submit-basket:hover,
  .submit-basket:focus{
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
