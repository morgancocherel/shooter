<template>
  <div class="ui grid main-container" :returnToProposition="returnToProposition">
    <div class="eleven wide column proposition-container js-site-content">
      <div class="ui grid">
        <div class="sixteen wide column center aligned">
          <h1 class="ui header">Propositions STIF</h1>
        </div>
        <div class="sixteen wide column left aligned" v-bind:class="{ loading: propositionIsLoading }">
          <div class="ui cards">
            <div class="card js-card" v-for="prop in listePropositions" :key="prop.id">
              <div class="content">
                <div class="right floated">{{ prop.produit.prix | priceFormat2 }}</div>
                <h4 class="ui header card-libelle">{{ prop.produit.libelle }}</h4>
                <span class="card-id">{{ prop.produit.id }}</span>
                <div class="description card-information" v-if="prop.produit.type === 'ABONNEMENT'">
                  <div class="ui grid">
                    <div class="six wide column left aligned zone">
                      <span>Zones</span>
                      <p>{{ prop.combinaisonZones.libelle }}</p>
                    </div>
                    <div class="ten wide column left aligned duration-available">
                      <span>Durée de validité</span>
                      <p>{{ diff(prop.utilisation.dateFin, prop.utilisation.dateDebut) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="extra content js-bottom-card-container" data-offset="-140">
                <div class="left floated js-ticket-amount-container" :quantitemaxproposable="prop.quantiteMaxProposable">
                  <i class="minus icon" @click="minusTicket"></i>
                  <span class="js-amount-ticket">0</span>
                  <i class="plus icon" @click="plusTicket"></i>
                </div>
                <span class="right floated submit-proposition-selected js-submit-proposition-selected"
                      :idprop="prop.id" :prixprop="prop.produit.prix" @click="submitPropositionSelected">
                  Acheter
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="sixteen wide column center aligned navigation-container">
          <router-link class="ui button submit-button back-button" to="/">Retour</router-link>
          <button class="ui button submit-button submit-proposition" @click="submitProposition">Relancer</button>
        </div>
      </div>
    </div>
    <console></console>
  </div>
</template>

<script>
import moment from 'moment'
import Console from '../../console/Console'
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../store/modules/mpd-v2/proposition/proposition-action-types'
import filters from '../../../mixins/filters'

const {mapState, mapActions} = createNamespacedHelpers('mpdV2/Proposition')

export default {
  name: 'Proposition',
  components: {Console},
  mixins: [filters],
  computed: {
    ...mapState([
      'listePropositions',
      'returnToProposition',
      'propositionIsLoading',
      'propositionSelectedIsLoading'
    ])
  },
  methods: {
    ...mapActions({
      'submitProposition': actions.SUBMIT_PROPOSITION,
      'submitPropositionSelectedWithData': actions.SUBMIT_PROPOSITION_SELECTED
    }),
    plusTicket: function (event) {
      let currentAmountElement = event.target.parentElement
      let currentAmount = currentAmountElement.getElementsByClassName('js-amount-ticket')[0].innerHTML
      let maxTicket = event.target.parentElement.getAttribute('quantitemaxproposable')
      if (currentAmount < maxTicket) {
        let newNumber = Number(currentAmount) + 1
        currentAmountElement.getElementsByClassName('js-amount-ticket')[0].innerHTML = newNumber
        currentAmountElement.parentElement.setAttribute('amountpropselected', newNumber)
      }
    },
    minusTicket: function (event) {
      let currentAmountElement = event.target.parentElement
      let currentAmount = currentAmountElement.getElementsByClassName('js-amount-ticket')[0].innerHTML
      if (currentAmount > 0) {
        let newNumber = Number(currentAmount) - 1
        currentAmountElement.getElementsByClassName('js-amount-ticket')[0].innerHTML = newNumber
        currentAmountElement.parentElement.setAttribute('amountpropselected', newNumber)
      }
    },
    diff: function (fin, debut) {
      return moment.utc(moment(debut, 'YYYY-MM-DDTHH:mm:ss').diff(moment(fin, 'YYYY-MM-DDTHH:mm:ss'))).locale('fr').format('D[ jour(s)], M[ mois ]')
    },
    submitPropositionSelected: function (event) {
      event.target.closest('.js-card').classList.add('loading')
      let el = event.target
      let toSend = {}
      toSend.idProposition = el.getAttribute('idprop')
      toSend.price = el.getAttribute('prixprop')
      toSend.amount = el.parentElement.getAttribute('amountpropselected')
      toSend.priceCalculated = toSend.amount * toSend.price
      this.submitPropositionSelectedWithData(toSend)
    }
  },
  mounted () {
    if (!this.returnToProposition) {
      this.submitProposition()
    }
  }
}
</script>

<style scoped>
  .main-container {
    margin: 0;
  }

  .proposition-container {
    padding-top: 0 !important;
    margin-top: 40px;
  }

  h1.ui.header {
    margin-bottom: 1rem;
  }

  .card {
    width: 370px !important;
  }

  .card-libelle {
    font-weight: bolder;
    font-size: 15px !important;
    margin: 0 0 3px 0;
  }

  .card-id {
    color: #647479;
    font-size: 13px !important;
  }

  .card-information {
    margin-top: 30px;
  }

  .card-information p {
    color: #8C9DA1;
    font-size: 13px !important;
    display: inherit;
  }

  .card-information span {
    font-size: 13px !important;
    display: inherit;
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

  .navigation-container {
    padding: 2rem 0;
  }

  .submit-proposition {
    background-color: #01C3A7;
  }

  .submit-proposition:hover,
  .submit-proposition:focus {
    background-color: #01aa91;
    border-color: #01aa91;
    color: #FFF;
  }

  /* card ticket */
  .minus.icon {
    margin: 0 10px 0 0;
    cursor: pointer;
  }

  .plus.icon {
    margin: 0 0 0 10px;
    cursor: pointer;
  }

  .submit-proposition-selected {
    cursor: pointer;
    color: #01aa91;
  }

  .ui.card {
    width: 100%;
    height: 200px;
  }

  /* loading */
  .loading::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    margin: -1.5em 0 0 -1.5em;
    width: 3em;
    height: 3em;
    -webkit-animation: form-spin .6s linear;
    animation: form-spin .6s linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    border-radius: 500rem;
    border-color: #767676 rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.1);
    border-style: solid;
    border-width: .2em;
    -webkit-box-shadow: 0 0 0 1px transparent;
    box-shadow: 0 0 0 1px transparent;
    visibility: visible;
    z-index: 101;
  }
  .loading::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    background-color: transparent;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
</style>
