<template>
  <div class="ui grid main-container">
    <div class="eleven wide column final-commande-container active-console js-site-content">
      <div class="ui grid">
        <div class="sixteen wide column center aligned">
          <h1 class="ui header">Consultation commande existante</h1>
        </div>
        <div class="sixteen wide column left aligned">
          <div class="ui accordion segment js-accordion">
            <div class="title active">
              <i class="dropdown icon"></i>
              <h3 class="ui header">Commande</h3>
            </div>
            <div class="content active first-level-accordion">
              <div class="ui grid">
                <div class="two wide column left aligned"><strong>Id</strong></div>
                <div class="fourteen wide column left aligned">{{ finalCommandeData.id }}</div>

                <div class="two wide column left aligned"><strong>Etat</strong></div>
                <div class="four wide column left aligned">{{ finalCommandeData.etat }}</div>
                <div class="two wide column left aligned"><strong>Total</strong></div>
                <div class="eight wide column left aligned">{{ finalCommandeData.total }}</div>
              </div>
              <div class="title">
                <i class="dropdown icon"></i>
                <h4 class="ui header">Items</h4>
              </div>
              <div class="content" v-for="item in finalCommandeData.items" :key="item.id">
                <div class="ui grid second-level-accordion">
                  <div class="two wide column left aligned"><strong>Id</strong></div>
                  <div class="fourteen wide column left aligned">{{ item.id }}</div>

                  <div class="two wide column left aligned"><strong>Quantite</strong></div>
                  <div class="two wide column left aligned">{{ item.quantite }}</div>
                  <div class="two wide column left aligned"><strong>Total</strong></div>
                  <div class="ten wide column left aligned">{{ item.total }}</div>
                </div>
                <div class="accordion sub-accordion">
                  <div class="title">
                    <i class="dropdown icon"></i>
                    <h4 class="ui header">Propositions</h4>
                  </div>
                  <div class="content">
                    <div class="ui grid second-level-accordion">
                      <div class="two wide column left aligned"><strong>Id</strong></div>
                      <div class="five wide column left aligned">{{ item.proposition.id }}</div>
                      <div class="two wide column left aligned"><strong>Proposable</strong></div>
                      <div class="two wide column left aligned">{{ item.proposition.proposable }}</div>
                      <div class="four wide column left aligned"><strong>Quantité max proposable</strong></div>
                      <div class="one wide column left aligned">{{ item.proposition.quantiteMaxProposable }}</div>
                    </div>
                    <div class="accordion sub-accordion" v-if="item.proposition.produit.type === 'ABONNEMENT'">
                      <div class="title">
                        <i class="dropdown icon"></i>
                        <h4 class="ui header">Combinaisons Zones</h4>
                      </div>
                      <div class="content">
                        <div class="ui grid second-level-accordion">
                          <div class="two wide column left aligned"><strong>Id</strong></div>
                          <div class="two wide column left aligned">{{ item.proposition.combinaisonZones.id }}</div>
                          <div class="two wide column left aligned"><strong>Libelle</strong></div>
                          <div class="ten wide column left aligned">{{ item.proposition.combinaisonZones.libelle }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="accordion sub-accordion">
                      <div class="title">
                        <i class="dropdown icon"></i>
                        <h4 class="ui header">Produit</h4>
                      </div>
                      <div class="content">
                        <div class="ui grid second-level-accordion">
                          <div class="two wide column left aligned"><strong>Id</strong></div>
                          <div class="six wide column left aligned">{{ item.proposition.produit.id }}</div>
                          <div class="two wide column left aligned"><strong>Libelle</strong></div>
                          <div class="six wide column left aligned">{{ item.proposition.produit.libelle }}</div>

                          <div class="two wide column left aligned"><strong>prix</strong></div>
                          <div class="two wide column left aligned">{{ item.proposition.produit.prix }}</div>
                          <div class="two wide column left aligned"><strong>Type</strong></div>
                          <div class="ten wide column left aligned">{{ item.proposition.produit.type }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="accordion sub-accordion" v-if="item.proposition.produit.type === 'ABONNEMENT'">
                      <div class="title">
                        <i class="dropdown icon"></i>
                        <h4 class="ui header">Utilisation</h4>
                      </div>
                      <div class="content">
                        <div class="ui grid second-level-accordion">
                          <div class="two wide column left aligned"><strong>Date début</strong></div>
                          <div class="three wide column left aligned">{{ item.proposition.utilisation.dateDebut }}</div>
                          <div class="two wide column left aligned"><strong>Date fin</strong></div>
                          <div class="nine wide column left aligned">{{ item.proposition.utilisation.dateFin }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sixteen wide column center aligned">
          <router-link class="ui button submit-button back-button" to="/mpdV2/commandes">Retour</router-link>
          <router-link class="ui button submit-button back-button" to="/">Page d'accueil</router-link>
        </div>
      </div>
    </div>
    <console></console>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import $ from 'jquery'
import Console from '../../console/Console'
import * as actions from '../../../store/modules/mpd-v2/commande/commande-action-types'

const {mapActions, mapState} = createNamespacedHelpers('mpdV2/Commande')

export default {
  name: 'Commande',
  components: {Console},
  computed: {
    ...mapState(['finalCommandeData'])
  },
  methods: {
    ...mapActions({
      'submitPayment': actions.SUBMIT_PAYMENT
    })
  },
  mounted () {
    // Set up all accordions menus
    $('.js-accordion').accordion({exclusive: false})
  }
}
</script>

<style scoped>
  .main-container {
    margin: 0;
  }

  .final-commande-container {
    padding: 0 !important;
    margin-top: 40px;
  }

  .final-commande-container.active-console {
    padding-right: 20px !important;
  }

  .final-commande-container .ui.grid {
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

  .back-button {
    background-color: #8C9DA1;
    color: #FFF;
  }

  .back-button:hover {
    background-color: #7e9196;
    color: #FFF;
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

  .second-level-accordion {
    margin: 0 10px;
  }

  .content {
    padding: 0 10px;
  }

  .sub-accordion {
    margin-left: 20px !important;
  }
</style>
