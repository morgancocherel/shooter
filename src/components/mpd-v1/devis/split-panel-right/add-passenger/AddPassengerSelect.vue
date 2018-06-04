<template>
  <div class="ui grid select-container">
    <div class="eight wide column left aligned passenger-type-container">
      <select class="ui dropdown fluid select-dropdown js-dropdown" title="passengerType" @input="updatePassengerType">
        <option v-for="pass in listPassengerType" :value="pass" :key="pass">{{ pass }}</option>
      </select>
    </div>
    <div class="eight wide column right aligned subscription-card-container">
      <select class="ui dropdown fluid select-dropdown js-dropdown" title="subscriptionCard">
        <option v-for="card in subscriptionCard" :value="card" :key="card">{{ card }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../../../store/modules/mpd-v1/devis/devis-action-types'

const {mapState, mapActions} = createNamespacedHelpers('mpdV1/devis')

export default {
  name: 'AddPassenger',
  computed: {
    ...mapState([
      'listPassengerType',
      'subscriptionCard'
    ])
  },
  methods: {
    ...mapActions({
      'updatePassengerType': actions.EDIT_LIST_TRAVELER
    }),
    updatePassengerType: function (event) {
      console.log(event.target, event.target.value, event.target.parentElement)
    }
  },
  mounted () {
    $('.js-dropdown').dropdown()
  }
}
</script>

<style scoped>
  .select-container {
    padding: 0 !important;
    margin: 0 0 20px 0;
  }

  .select-dropdown {
    border: 1px solid red !important;
  }

  .passenger-type-container,
  .subscription-card-container {
    padding: 0 !important;
  }
</style>
