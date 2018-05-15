<template>
  <div class="ui grid">
    <div class="eleven wide column proposition-container js-site-content">
      <div class="ui grid">
        <div class="sixteen wide column center aligned">
          <h1 class="ui header">Propositions STIF</h1>
        </div>
        <div class="sixteen wide column">
          <div class="ui grid">
            <div class="five wide column center aligned middle aligned" v-for="prop in listePropositions" :key="prop.id">
              <div class="ui card js-card">
                <div class="content left aligned" :quantiteMaxProposable="prop.quantiteMaxProposable">
                  <h4 class="ui header">{{ prop.produit.libelle }}</h4>
                  <div class="description">
                    <div><p>{{ prop.produit.id }}</p></div>
                    <div v-if="prop.produit.type === 'ABONNEMENT'">
                      <span>zones</span><p>{{ prop.combinaisonZones.libelle }}</p>
                      <span>Durée de validité</span><p>{{ diff(prop.utilisation.dateFin, prop.utilisation.dateDebut) }}</p>
                    </div>
                  </div>
                </div>
                <div class="extra content js-bottom-card-container" :idprop="prop.id" :prixprop="prop.produit.prix">
          <span class="left floated js-ticket-amount-container">
            <i class="minus icon" @click="minusTicket"></i>
            <span class="js-amount-ticket">0</span>
            <i class="plus icon" @click="plusTicket"></i>
          </span>
                  <span class="right floated submit-proposition-selected" @click="submitPropositionSelected">
            Acheter
          </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sixteen wide column center aligned navigation-container">
          <router-link class="ui button submit-button back-button" to="/">Retour</router-link>
        </div>
      </div>
    </div>
    <console></console>
  </div>
</template>

<script>
// import $ from 'jquery'
import moment from 'moment'
import Console from '../../console/Console'
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../store/modules/mpd-v2/proposition/proposition-action-types'
const {mapState, mapActions} = createNamespacedHelpers('mpdV2/Proposition')

export default {
  name: 'Proposition',
  components: { Console },
  computed: {
    ...mapState(['listePropositions'])
  },
  methods: {
    ...mapActions({
      'submitProposition': actions.SUBMIT_PROPOSITION,
      'submitPropositionSelectedWithData': actions.SUBMIT_PROPOSITION_SELECTED
    }),
    plusTicket: function (event) {
      let currentAmountElement = event.explicitOriginalTarget.closest('.js-ticket-amount-container').children[1]
      let currentAmount = currentAmountElement.innerHTML
      let maxTicket = event.explicitOriginalTarget.closest('.js-card').children[0].getAttribute('quantiteMaxProposable')
      if (currentAmount < maxTicket) {
        let newNumber = Number(currentAmount) + 1
        currentAmountElement.innerHTML = newNumber
        event.explicitOriginalTarget.closest('.js-bottom-card-container').setAttribute('amountpropselected', newNumber)
      }
    },
    minusTicket: function (event) {
      let currentAmountElement = event.explicitOriginalTarget.closest('.js-ticket-amount-container').children[1]
      let currentAmount = currentAmountElement.innerHTML
      if (currentAmount > 0) {
        let newNumber = Number(currentAmount) - 1
        currentAmountElement.innerHTML = newNumber
        event.explicitOriginalTarget.closest('.js-bottom-card-container').setAttribute('amountpropselected', newNumber)
      }
    },
    diff: function (fin, debut) {
      return moment.utc(moment(debut, 'YYYY-MM-DDTHH:mm:ss').diff(moment(fin, 'YYYY-MM-DDTHH:mm:ss'))).locale('fr').format('D[ jour(s)], M[ mois ]')
    },
    submitPropositionSelected: function (event) {
      let el = event.originalTarget.closest('.js-bottom-card-container')
      let toSend = {}
      toSend.idProposition = el.getAttribute('idprop')
      toSend.price = el.getAttribute('prixprop')
      toSend.amount = el.getAttribute('amountpropselected')
      toSend.priceCalculated = toSend.amount * toSend.price
      this.submitPropositionSelectedWithData(toSend)
    }
  },
  mounted () {
    this.submitProposition()
  }
}
</script>

<style scoped>
  .proposition-container {
    padding-top: 0 !important;
    margin-top: 40px;
  }

  h1.ui.header {
    margin-bottom: 1rem;
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

  .description p {
    font-size: 12px;
    color: #8C8A8C;
  }

  .ui.card {
    width: 100%;
    height: 200px;
  }
</style>
