<template>
  <div class="ui grid container payment-container">
    <div class="sixteen wide column left aligned summary-traveler-information">
      <h3 class="ui header check-your-ticket">Vérifiez votre billet avant le paiement</h3>
      <p class="traveler-information">L'email de confirmation sera envoyé à <strong>{{ getFirstname }} {{ getLastname }}</strong> à l'adresse
        <strong>{{ getEmailTravelerContact }}</strong> juste après le paiement.</p>
    </div>
    <div class="sixteen wide column">
      <div class="ui grid segment main-segment traveler-information-container">
        <div class="two wide column">
          <p>{{ proposalSelected.departure_time.value | dateFormat }}</p>
        </div>
        <div class="one wide column">
          <h5 class="ui header">{{ proposalSelected.departure_time.text }}</h5>
          <h5 class="ui header">{{ proposalSelected.arrival_time.text }}</h5>
        </div>
        <div class="eleven wide column left aligned">
          <h5 class="ui header">{{ proposalSelected.start_point.label }}</h5>
          <h5 class="ui header">{{ proposalSelected.end_point.label }}</h5>
        </div>
        <div class="two wide column right aligned middle aligned">
          <span><strong>{{ getPriceSelected | priceFormat }}</strong></span>
        </div>
        <div class="sixteen wide column ticket-information-container">
          <div class="ui grid segment sub-segment">
            <div class="one wide column left aligned no-padding-top-bottom no-padding-left">
              <span>{{ proposalSelected.departure_time.text }}</span>
              <span>{{ proposalSelected.arrival_time.text }}</span>
            </div>
            <div class="four wide column left aligned start-end-point-ticket no-padding-top-bottom">
              <span>{{ proposalSelected.start_point.label }}</span>
              <span>{{ proposalSelected.end_point.label }}</span>
            </div>
            <div class="three wide column center aligned middle aligned no-padding-top-bottom">
              <div class="sncf_logo"></div>
              <span>{{ proposalSelected.voyage.itineraireAller.segments[0].libelleEquipement }} {{ proposalSelected.voyage.itineraireAller.segments[0].numTrain }}</span>
            </div>
            <div class="two wide column center aligned middle aligned no-padding-top-bottom">
              <span>2<sup>nde</sup></span>
            </div>
            <div class="three wide column center aligned middle aligned no-padding-top-bottom">
              <span>Placement libre</span>
            </div>
            <div class="three wide column center aligned middle aligned no-padding-top-bottom no-pading-right">
              <span>{{ firstname }} {{ lastname }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="eight wide column left aligned">
      <button class="ui button submit-button back-button" @click="returnToBasket">Retour</button>
    </div>
    <div class="eight wide column right aligned">
      <button @click="submitPayment"  class="ui button submit-button submit-payment" v-bind:class="{loading : paymentButtonIsLoading}">Payer {{ priceSelected | priceFormat}}</button>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../store/modules/mpd-v1/paiement/payment-action-types'
import filters from '../../../mixins/filters'

const {mapState, mapActions} = createNamespacedHelpers('mpdV1/Payment')

export default {
  name: 'Payment',
  mixins: [filters],
  computed: {
    ...mapState([
      'firstname',
      'lastname',
      'emailTravelerContact',
      'proposalSelected',
      'priceSelected',
      'paymentButtonIsLoading'
    ])
  },
  methods: {
    ...mapActions({
      'submitPayment': actions.SUBMIT_PAYMENT,
      'returnToBasket': actions.RETURN_TO_BASKET
    })
  }
}
</script>

<style scoped>
  /* Mutual styles */
  .payment-container {
    margin: 40px 0 0 0;
    display: inline-flex;
  }

  .traveler-information-container {
    line-height: 28px;
  }

  .main-segment {
    padding: 10px 25px;
  }

  .sub-segment {
    padding: 10px 18px;
    background-color: #fcfcfd;
    line-height: 1.5;
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

  .segment {
    border: 1px solid #DCE3E6;
    box-shadow: none;
  }

  /* Traveler and ticket information*/
  .check-your-ticket {
    color: #13181A;
    font-size: 20px !important;
    font-weight: 600;
  }

  .traveler-information {
    color: #323E42;
    font-size: 17px;
  }

  .start-end-point-ticket span{
    display: block;
  }

  .sncf_logo {
    background-image: url('../../../assets/sncfLogo.svg');
    height: 15px;
    background-repeat: no-repeat;
  }

  .sub-segment span{
    font-size: 13px;
    color: #323E42;
  }

  /* Navigation buttons */
  .submit-button {
    color: #FFF;
    padding: 12px 22px;
    border-radius: 0.3125em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .submit-payment {
    background-color: #01C3A7;
  }

  .submit-payment:hover,
  .submit-payment:focus {
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
