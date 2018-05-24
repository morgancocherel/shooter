<template>
  <div class="ui grid destination-train-container">
    <div class="sixteen wide column left aligned choose-destination-train-title-container">
      <h3 class="ui header choose-destination-train-title">Choisissez une gare d'arrivée</h3>
    </div>
    <div class="sixteen wide column left aligned list-station-container">
      <ul class="list-station js-list-station">
        <li v-for="station in listStation" :key="station.id">
          <a class="js-list-station-link" @click="updateDestinationTrainAction">{{ station }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import * as actions from '../../../../store/modules/mpd-v1/devis/devis-action-types'
import {createNamespacedHelpers} from 'vuex'

const {mapState, mapActions} = createNamespacedHelpers('mpdV1/Devis')

export default {
  name: 'OriginTrain',
  computed: {
    ...mapState([ 'listStation', 'destinationTrain' ])
  },
  methods: {
    ...mapActions({
      'updateDestinationTrain': actions.EDIT_DESTINATION_TRAIN
    }),
    updateDestinationTrainAction: function (event) {
      this.updateDestinationTrain(event.target.innerHTML)
      $('.js-destination-train').removeClass('empty')
      $('.js-departure-date-container').click()
    }
  },
  mounted () {
    $('.js-destination-train').focus(function () {
      $('.js-list-station-link').first().addClass('selected')
    })
  }
}
</script>

<style scoped>
  .destination-train-container {
    margin: 0 !important;
  }

  .list-station-container,
  .choose-destination-train-title-container {
    padding: 0 !important;
    margin-bottom: 15px;
  }

  .choose-destination-train-title {
    font-size: 20px;
    font-weight: 400;
  }

  .list-station {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: auto;
    border-top: 1px solid #DCE3E6;
    border-left: 1px solid #DCE3E6;
    border-right: 1px solid #DCE3E6;
  }

  .list-station {
    border-radius: 0.3125em;
  }

  .list-station li {
    color: #323E42;
    display: block;
    overflow: hidden;
    border-bottom: 1px solid #DCE3E6;
  }

  .list-station li a{
    display: block;
    padding: 12px 0 11px 35px;
    color: #323E42;
    opacity: 0.6;
    background: url("../../../../assets/locationIcon.svg") no-repeat 11px center;
  }

  .list-station li a.selected,
  .list-station li a:hover {
    opacity: 1;
    cursor: pointer;
    background-color: #fcfcfd;
  }
</style>
