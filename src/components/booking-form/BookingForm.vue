<template>
  <div class="ui form container">
    <div class="inline fields">
      <div class="field">
        <div class="ui radio checkbox">
          <input name="travelMode" checked="checked" type="radio" value="AS" @input="updateTravelMode">
          <label>Aller simple</label>
        </div>
      </div>
      <div class="field">
        <div class="ui radio checkbox">
          <input name="travelMode" type="radio" value="AR" @input="updateTravelMode">
          <label>Aller-retour</label>
        </div>
      </div>
    </div>
    <div class="fields">
      <div class="ten wide field">
        <input placeholder="Départ : gare, adresse, lieu" type="text" :value="getOriginTrain" @input="updateOriginTrain">
      </div>
      <div class="three wide field">
        <div class="ui calendar" id="js-departure-date">
          <div class="ui input left icon">
            <i class="calendar icon"></i>
            <input type="text" placeholder="Date" :value="getDepartureDate" @input="updateDepartureDate">
          </div>
        </div>
      </div>
      <div class="three wide field">
        <div class="ui calendar" id="js-departure-time">
          <div class="ui input left icon">
            <i class="time icon"></i>
            <input type="text" placeholder="Time" :value="getDepartureTime" @input="updateDepartureTime">
          </div>
        </div>
      </div>
    </div>
    <div class="fields">
      <div class="ten wide field">
        <input placeholder="Arrivée : gare, adresse, lieu" type="text" :value="getDestinationTrain" @input="updateDestinationTrain">
      </div>
      <div class="three wide field">
        <div class="ui calendar" id="js-return-date">
          <div class="ui input left icon">
            <input type="text" placeholder="Date" :value="getReturnDate" @input="updateReturnDate">
            <i class="calendar icon"></i>
          </div>
        </div>
      </div>
      <div class="three wide field">
        <div class="ui calendar" id="js-return-time">
          <div class="ui input left icon">
            <i class="time icon"></i>
            <input type="text" placeholder="Time" :value="getDepartureTime" @input="updateDepartureTime">
          </div>
        </div>
      </div>
    </div>
    <button class="ui button">
      Rechercher
    </button>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/booking-form/booking-form-action-types'
import $ from 'jquery'

const {mapGetters, mapActions} = createNamespacedHelpers('BookingForm')

export default {
  name: 'BookingForm',
  computed: {
    ...mapGetters([
      'getTravelMode',
      'getOriginTrain',
      'getDepartureDate',
      'getDepartureTime',
      'getDestinationTrain',
      'getReturnDate',
      'getReturnTime'
    ])
  },
  methods: {
    ...mapActions({
      'updateTravelMode': actions.EDIT_TRAVEL_MODE,
      'updateOriginTrain': actions.EDIT_ORIGIN_TRAIN,
      'updateDepartureDate': actions.EDIT_DEPARTURE_DATE,
      'updateDepartureTime': actions.EDIT_DEPARTURE_TIME,
      'updateDestinationTrain': actions.EDIT_DESTINATION_TRAIN,
      'updateReturnDate': actions.EDIT_RETURN_DATE,
      'updateReturnTime': actions.EDIT_RETURN_TIME
    })
  },
  mounted () {
    const today = new Date()
    var self = this
    // Set semantic ui calendar for the departure data form
    $(this.$el).find('#js-departure-date').calendar({
      type: 'date',
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      formatter: {
        date: function (date) {
          if (!date) return ''
          let day = date.getDate()
          let month = date.getMonth() + 1
          let year = date.getFullYear()
          return day + '/' + month + '/' + year
        }
      },
      onChange: function (date) {
        self.updateDepartureDate(date)
      }
    })
    $(this.$el).find('#js-departure-time').calendar({
      type: 'time',
      text: {
        days: ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'],
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Janvier', 'Février', 'Mars', 'Avril', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      ampm: false,
      minDate: new Date(today.getHours(), today.getMinutes()),
      disableMinute: true,
      onChange (mode) {
        self.updateDepartureTime(mode.getHours())
      },
      formatter: {
        time: function (date) {
          return ('0' + date.getHours()).slice(-2) + 'h'
        }
      }
    })

    // Set semantic ui calendar for the return data from
    $(this.$el).find('#js-return-date').calendar({
      type: 'date',
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      formatter: {
        date: function (date) {
          if (!date) return ''
          let day = date.getDate()
          let month = date.getMonth() + 1
          let year = date.getFullYear()
          return day + '/' + month + '/' + year
        }
      },
      onChange (mode) {
        self.updateReturnDate(mode)
      }
    })
    $(this.$el).find('#js-return-time').calendar({
      type: 'time',
      ampm: false,
      minDate: new Date(today.getHours(), today.getMinutes()),
      disableMinute: true,
      onChange (mode) {
        self.updateReturnTime(mode.getHours())
      },
      formatter: {
        time: function (date) {
          return ('0' + date.getHours()).slice(-2) + 'h'
        }
      }
    })
  }
}
</script>

<style scoped>
  .ui.form.container{ margin: 115px 0; }
  .ui.button{
    text-transform: uppercase;
    background-color: #01C3A7;
    color: #FFF;
  }

  .container{
    padding: 24px 40px;
    border: 2px solid #ECECEC;
    border-radius: .3125em;
  }
  input{ color: #323E42 !important; }
  input:focus{ border-color: #01C3A7 !important; }
</style>
