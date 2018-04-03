<template>
  <div>
    <header-top></header-top>
    <header-down></header-down>
    <div class="proposal-content">
      <div class="ui grid">
        <div class="three wide column"></div>
        <div class="five wide column your-travel">
          <div class="ui label">
            <span class="your-travel-text">Votre Trajet {{ getOriginTrain }}</span>
            <i class="large right arrow icon"></i>
            <span class="your-travel-text">{{ getDestinationTrain}}</span>
          </div>
        </div>
        <div class="eight wide column"></div>
      </div>
      <div class="ui grid">
        <div class="three wide column booking-form">
          <form class="ui grid form">
            <div class="two column row">
              <div class="column booking-form-radio-button">
                <div class="ui radio checkbox">
                  <input name="devis" checked="checked" type="radio" value="AS" @input="updateDevis">
                  <label>Aller simple</label>
                </div>
              </div>
              <div class="column booking-form-radio-button">
                <div class="ui radio checkbox">
                  <input name="devis" type="radio" value="AR" @input="updateDevis">
                  <label>Aller-retour</label>
                </div>
              </div>
            </div>
            <div class="one column row">
              <div class="column origin-train">
                <input placeholder="Départ : gare, adresse, lieu" type="text" :value="getOriginTrain" @input="updateOriginTrain">
              </div>
              <div class="column destination-train">
                <input placeholder="Arrivée : gare, adresse, lieu" type="text" :value="getDestinationTrain" @input="updateDestinationTrain">
              </div>
            </div>
            <div class="two column row">
              <div class="column">
                <div class="ui calendar" id="js-departure-date">
                  <div class="ui input left icon departure-date">
                    <input type="text" placeholder="Date" :value="getDateDepart" @input="updateDateDepart">
                    <i class="calendar icon departure-date-icon"></i>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="ui calendar" id="js-departure-time">
                  <div class="ui input left icon departure-time">
                    <i class="time icon"></i>
                    <input type="text" placeholder="Time" :value="getDepartureTime" @input="updateDepartureTime">
                  </div>
                </div>
              </div>
            </div>
            <div class="one column row">
              <div class="column booking-form-radio-button">
                <div class="ui radio checkbox">
                  <input name="direct-travel" checked="checked" type="radio">
                  <label>Trajet direct</label>
                </div>
              </div>
            </div>
            <div class="two column row">
              <div class="column booking-form-radio-button">
                <div class="ui radio checkbox">
                  <input name="classe" checked="checked" type="radio" value="deuxieme">
                  <label>2ème Classe</label>
                </div>
              </div>
              <div class="column booking-form-radio-button">
                <div class="ui radio checkbox">
                  <input name="classe" type="radio" value="premiere">
                  <label>1ère Classe</label>
                </div>
              </div>
            </div>
            <div class="one column row">
              <div class="column">
                <button class="ui button booking-form-submit-button">Rechercher</button>
              </div>
            </div>
          </form>
        </div>
        <div class="five wide column list-proposal">
          <div class="ui top attached button more-devis">
            <i class="caret up icon"></i>
            Trajets précédents
          </div>
          <div class="ui grid">
            <div class="five column row">
              <div class="column">
                <div class="ui compact menu">
                  <a class="item">
                    <i class="calendar icon"></i>deee
                  </a>
                </div>
              </div>
              <div class="column"></div>
              <div class="column"></div>
              <div class="column centered">
                <h5 class="ui header">2ème Classe</h5>
              </div>
              <div class="column">
                <h5 class="ui header centered">1ère Classe</h5>
              </div>
            </div>
            <div class="five column row list-devis">
              <div v-for="offre in getProposal.voyages[0].offres" :key="offre.idDemande">
                <div class="column">
                  <h5>08h13</h5>
                  <h5>09h36</h5>
                </div>
                <div class="column">
                  <h5>{{ offre.relationCommerciale.origRelCommerciale.uic }}</h5>
                  <h5>{{ offre.relationCommerciale.destRelCommerciale.uic }}</h5>
                </div>
                <div class="column">
                  <h5>01h13</h5>
                  <h5>direct - TER</h5>
                </div>
                <div class="column">
                  <h5>18,00€</h5>
                </div>
                <div class="column">
                  <h5>39,40€</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="ui bottom attached button more-devis">
            <i class="caret down icon"></i>
            Trajets suivants
          </div>
        </div>
        <div class="eight wide column devis-json-view">
          <tree-view :data='getProposal' :options='{maxDepth: 4}'></tree-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/booking/booking-form-action-types'
import $ from 'jquery'
import HeaderTop from '../HeaderTop'
import HeaderDown from '../main-form/HeaderDown'
import VueJsonPretty from 'vue-json-pretty'

const {mapGetters, mapActions} = createNamespacedHelpers('Booking')

export default {
  name: 'Proposal',
  components: {
    HeaderTop,
    HeaderDown,
    VueJsonPretty
  },
  computed: {
    ...mapGetters([
      'getDevis',
      'getOriginTrain',
      'getDateDepart',
      'getDepartureTime',
      'getDestinationTrain',
      'getDateArrivee',
      'getReturnTime',
      'getProposal',
      'getToday'
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
  /* .proposal-content{ margin: 14px 60px; } */

  .devis-json-view{ text-align: left; }

  .booking-form,
  .list-proposal,
  .devis-json-view{
    padding: 24px 40px;
    border: 1px solid #DCE3E6;
    border-radius: .3125em;
  }

  .centered-vertically{
    display: flex !important;
    justify-content: center !important;
    flex-direction: column !important;
  }

  .list-devis{ margin-bottom: 14px; }

  .more-devis{
    background-color: transparent;
    color: #059E87;
    cursor: pointer;
    border: none !important;
  }

  .list-proposal{ /* margin: 0 30px; */ padding: 0 !important; }

  .booking-form-submit-button{
    text-transform: uppercase;
    background-color: #01C3A7;
    color: #FFF;
  }

  .booking-form-radio-button,
  .your-travel{ text-align: left; }

  .your-travel .ui.label{ background-color: transparent; }

  .your-travel-text{ color: #13181A; font-size: 20px; }

  .your-travel .ui.label i{
    margin: 0 0 7px 0;
    padding: 0 5px;
    color: #13181A;
  }
</style>
