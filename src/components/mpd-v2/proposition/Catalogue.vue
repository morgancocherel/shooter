<template>
    <div class="ui grid main-container">
      <div class="eleven wide column catalogue-container active-console js-site-content">
        <div class="ui container grid">
          <div class="sixteen wide column">
            <h1 class="ui header">Catalogues</h1>
          </div>
          <div class="sixteen wide column">
            <select class="ui dropdown cat-select" title="catalogue" @input="updateCatalogue">
              <option v-for="cat in listCatalogue" :value="cat" :key="cat">{{ cat }}</option>
            </select>
          </div>
          <div class="sixteen wide column center aligned navigation-container">
            <router-link class="ui button submit-button back-button" to="/">Retour</router-link>
            <button class="ui button submit-button submit-catalogue" @click="getPropositionsCatalogueSelected" v-bind:class="{ loading: propositionIsLoading }">Suivant</button>
          </div>
        </div>
      </div>
      <console></console>
    </div>
</template>

<script>
import Console from '../../console/Console'
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../store/modules/mpd-v2/proposition/proposition-action-types'

const {mapState, mapActions} = createNamespacedHelpers('mpdV2/proposition')

export default {
  name: 'proposition',
  components: {Console},
  computed: {
    ...mapState([
      'listCatalogue',
      'propositionIsLoading'
    ])
  },
  methods: {
    ...mapActions({
      'getPropositionsCatalogueSelected': actions.GET_PROPOSITIONS_CATALOGUE_SELECTED,
      'updateCatalogue': actions.EDIT_CATALOGUE_SELECTED
    })
  }
}
</script>

<style scoped>
  .main-container {
    margin: 0;
  }

  .catalogue-container {
    padding: 0 !important;
    margin-top: 40px;
  }

  .catalogue-container.active-console {
    padding-right: 20px !important;
  }

  h1.ui.header {
    margin-bottom: 1rem;
  }

  .cat-select {
    width: 300px;
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

  .submit-catalogue {
    background-color: #01C3A7;
  }

  .submit-catalogue:hover,
  .submit-catalogue:focus {
    background-color: #01aa91;
    border-color: #01aa91;
    color: #FFF;
  }
</style>
