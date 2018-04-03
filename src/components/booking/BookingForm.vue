<template>
  <div class="ui form container">
    <div class="inline fields">
      <div class="field">
        <div class="ui radio checkbox">
          <input name="devis" checked="checked" type="radio" value="AS" @input="updateDevis">
          <label>Aller simple</label>
        </div>
      </div>
      <div class="field">
        <div class="ui radio checkbox">
          <input name="devis" type="radio" value="AR" @input="updateDevis">
          <label>Aller-retour</label>
        </div>
      </div>
    </div>
    <div class="fields booking-form-data">
      <div class="ten wide field train-input">
        <div class="origin-train">
          <input placeholder="Départ : gare, adresse, lieu" type="text" :value="getOriginTrain" @input="updateOriginTrain">
        </div>
        <div class="destination-train">
          <input placeholder="Arrivée : gare, adresse, lieu" type="text" :value="getDestinationTrain" @input="updateDestinationTrain">
        </div>
      </div>
      <div class="three wide field date-input">
        <div class="ui calendar" id="js-departure-date">
          <div class="ui input left icon departure-date">
            <input type="text" placeholder="Date" :value="getDateDepart" @input="updateDateDepart">
            <i class="calendar icon departure-date-icon"></i>
          </div>
        </div>
        <div class="ui calendar" id="js-return-date">
          <div class="ui input left icon">
            <input type="text" placeholder="Date" :value="getDateArrivee" @input="updateDateArrivee">
            <i class="calendar icon"></i>
          </div>
        </div>
      </div>
      <div class="three wide field time-input">
        <div class="ui calendar" id="js-departure-time">
          <div class="ui input left icon departure-time">
            <i class="time icon"></i>
            <input type="text" placeholder="Time" :value="getDepartureTime" @input="updateDepartureTime">
          </div>
        </div>
        <div class="ui calendar" id="js-return-time">
          <div class="ui input left icon">
            <i class="time icon"></i>
            <input type="text" placeholder="Time" :value="getDepartureTime" @input="updateDepartureTime">
          </div>
        </div>
      </div>
    </div>
    <router-link @click.native="submitBookingForm" class="ui button" to="/proposal">Propositions</router-link>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/booking/booking-form-action-types'
import $ from 'jquery'

const {mapGetters, mapActions} = createNamespacedHelpers('Booking')

export default {
  name: 'Booking',
  computed: {
    ...mapGetters([
      'getDevis',
      'getOriginTrain',
      'getDateDepart',
      'getDepartureTime',
      'getDestinationTrain',
      'getDateArrivee',
      'getReturnTime'
    ])
  },
  methods: {
    ...mapActions({
      'updateDevis': actions.EDIT_DEVIS,
      'updateOriginTrain': actions.EDIT_ORIGIN_TRAIN,
      'updateDateDepart': actions.EDIT_DATE_DEPART,
      'updateDepartureTime': actions.EDIT_DEPARTURE_TIME,
      'updateDestinationTrain': actions.EDIT_DESTINATION_TRAIN,
      'updateDateArrivee': actions.EDIT_DATE_ARRIVEE,
      'updateReturnTime': actions.EDIT_RETURN_TIME,
      'submitBookingForm': actions.SUBMIT_BOOKING_FORM
    })
  },
  mounted () {
    const today = new Date()
    let self = this
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
        self.updateDateDepart(date)
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
        self.updateDateArrivee(mode)
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

  input:focus{ border: 1px solid #01C3A7 !important; }

  input{
    border: 1px solid transparent !important;
    color: #323E42 !important;
  }

  .column{ background-color: aliceblue; }

  .origin-train,
  .departure-date,
  .departure-time{
    border-bottom: 1px solid #ECECEC !important;
  }

  .train-input{ padding-right: 16px !important; border-right: 1px solid #ECECEC !important; }

  .date-input{ padding: 0 16px !important; border-right: 1px solid #ECECEC !important; }

  .time-input{ padding-left: 16px !important; }
</style>
