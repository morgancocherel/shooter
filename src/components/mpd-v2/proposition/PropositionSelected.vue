<template>
  <div class="ui grid main-container">
    <div class="eleven wide column proposition-selected-container active-console js-site-content">
      <div class="ui negative message error-message" v-bind:class="{ active: message !== null }">
        <i class="close icon" @click="closeMessage"></i>
        <div class="header">
          Une erreur s'est produite lors de la création de commande
        </div>
        <p>{{ message }}</p>
      </div>
      <div class="ui grid">
        <div class="sixteen wide column center aligned">
          <h1 class="ui header">Proposition séléctionnée</h1>
        </div>
        <div class="sixteen wide column">
          <div class="ui segment">
            <div class="ui grid">
              <div class="two wide column left aligned"></div>
              <div class="three wide column left aligned"><strong>Id</strong></div>
              <div class="three wide column left aligned"><strong>Libelle</strong></div>
              <div class="three wide column left aligned"><strong>Prix</strong></div>
              <div class="five wide column left aligned"><strong>Type</strong></div>

              <div class="two wide column left aligned"><strong>Produit</strong></div>
              <div class="three wide column left aligned">{{ proposalSelected.produit.id }}</div>
              <div class="three wide column left aligned">{{ proposalSelected.produit.libelle }}</div>
              <div class="three wide column left aligned">{{ proposalSelected.produit.prix }}</div>
              <div class="five wide column left aligned margin-bottom">{{ proposalSelected.produit.type }}</div>

              <div class="two wide column left aligned"><strong>Id</strong></div>
              <div class="five wide column left aligned">{{ proposalSelected.id }}</div>
              <div class="two wide column left aligned"><strong>Proposal</strong></div>
              <div class="two wide column left aligned">{{ proposalSelected.proposable }}</div>
              <div class="three wide column left aligned"><strong>Quantité max proposal</strong></div>
              <div class="two wide column left aligned">{{ proposalSelected.quantiteMaxProposable }}</div>
            </div>
          </div>
        </div>
        <div class="eight wide column left aligned">
          <button class="ui button submit-button back-button" @click="returnToProposition">Retour</button>
        </div>
        <div class="eight wide column right aligned">
          <button class="ui button submit-button submit-create-order" @click="createNewCommande" v-bind:class="{ loading: propositionIsLoading }">Créer la commande</button>
        </div>
      </div>
    </div>
    <console></console>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../store/modules/mpd-v2/proposition/proposition-action-types'
import Console from '../../console/Console'

const {mapState, mapActions} = createNamespacedHelpers('mpdV2/Proposition')

export default {
  name: 'Proposition',
  components: { Console },
  computed: {
    ...mapState([
      'proposalSelected',
      'message',
      'propositionIsLoading'
    ])
  },
  methods: {
    ...mapActions({
      'createNewCommande': actions.CREATE_NEW_COMMANDE,
      'returnToProposition': actions.RETURN_TO_PROPOSITION
    }),
    closeMessage: function (event) {
      event.target.parentElement.classList.remove('active')
    }
  }
}
</script>

<style scoped>
  .main-container {
    margin: 0;
  }

  .proposition-selected-container {
    padding: 0 !important;
    margin-top: 40px;
  }

  .proposition-selected-container.active-console {
    padding-right: 20px !important;
  }

  .proposition-selected-container .ui.grid {
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

  .submit-create-order {
    background-color: #01C3A7;
  }

  .submit-create-order:hover,
  .submit-create-order:focus {
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

  /* Error message */
  .error-message {
    display: none;
    margin-bottom: 40px;
  }

  .active {
    display: block;
  }
</style>
