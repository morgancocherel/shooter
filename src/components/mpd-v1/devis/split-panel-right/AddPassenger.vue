<template>
  <div class="ui grid add-passenger-container">
    <div class="sixteen wide column left aligned choose-passenger-container">
      <h3 class="ui header choose-passenger">Choisissez vos passagers</h3>
    </div>
    <add-passenger-select class="js-select-container" v-for="trav in listTraveler" :key="trav.num" :value="trav.num"></add-passenger-select>
    <div class="sixteen wide column add-passenger-button-container">
      <button class="ui button fluid add-passenger-button" @click="updateListTraveler">
        <span>Ajouter un autre passager</span>
      </button>
    </div>
    <div class="sixteen wide column left aligned connect-user-container">
      <h3 class="ui class connect-user">Retrouver vos passagers sauvegardés ?</h3>
      <p>Connectez-vous à votre compte pour accéder aux passagers enregistrés lors de vos précédentes recherches.</p>
    </div>
    <div class="sixteen wide column left aligned connect-user-button-container">
      <button class="connect-user-button">Se connecter</button>
    </div>
  </div>
</template>

<script>
import AddPassengerSelect from './add-passenger/AddPassengerSelect'
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../../store/modules/mpd-v1/devis/devis-action-types'

const {mapState, mapActions} = createNamespacedHelpers('mpdV1/Devis')

export default {
  name: 'AddPassenger',
  components: { AddPassengerSelect },
  computed: {
    ...mapState([
      'listTraveler'
    ])
  },
  methods: {
    ...mapActions({
      'updateListTraveler': actions.EDIT_LIST_TRAVELER
    })
  }
}
</script>

<style scoped>
  .add-passenger-container {
    margin: 0;
  }

  .choose-passenger-container {
    padding: 0 !important;
    margin-bottom: 15px;
  }

  .choose-passenger {
    font-size: 20px;
    font-weight: 400;
  }

  .connect-user-button-container,
  .connect-user-container,
  .add-passenger-button-container {
    padding: 0 !important;
  }

  .add-passenger-button:focus,
  .add-passenger-button {
    margin: 0 0 25px 0;
    padding: 10px 13px 9px;
    font-size: 0.9em;
    font-weight: 400;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    outline: none;
    border-radius: 0.3125em;
    cursor: pointer;
    text-align: center;
    background-image: none;
    display: inline-block;
    color: #059E87;
    border: 1px solid #01C3A7;
    box-shadow: none;
    background-color: #D3F9F4;
  }

  .add-passenger-button:hover {
    background-color: #EEFFFD;
    color: #059E87;
  }

  .add-passenger-button span {
    background: no-repeat left center url("../../../../assets/addPassengerIcon.svg");
    padding-left: 30px;
  }

  .connect-user {
    font-size: 1.3em;
    font-weight: 600;
    margin: 1.1875em 0 .2em 0;
  }

  .connect-user-container {
    margin-bottom: 0.5325em;
  }
  .connect-user-button {
    border: 0;
    background: no-repeat left center url("../../../../assets/loginIcon.svg");
    font-size: 13px;
    color: #059E87;
    letter-spacing: 0.02em;
    padding-left: 31px;
    padding-right: 13px;
    text-transform: uppercase;
    cursor: pointer;
  }
</style>
