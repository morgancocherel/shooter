<template>
  <div class="ui form container devis-form-container">
    <div class="split-panel-left js-split-panel-left">
      <div class="ui grid">
        <div class="sixteen wide column left aligned you-travel-question-container">
          <h3 class="ui header you-travel-question">Quel est votre trajet ?</h3>
        </div>
        <div class="sixteen wide column station-input">
          <input placeholder="Saisissez votre gare de départ…"
                 class="search-departure-input empty search-input search-input-top search-input-top js-search-input js-origin-train" type="text"
                 data-input="originTrain" :value="originTrain" @input="updateOriginTrainAction" @focus="displayRightPanelAction">
          <input placeholder="Saisissez votre gare d'arrivée…"
                 class="search-arrival-input empty search-input search-input-down search-input-down js-search-input js-destination-train" type="text"
                 data-input="destinationTrain" :value="destinationTrain" @input="updateDestinationTrainAction" @focus="displayRightPanelAction">
        </div>
        <div class="sixteen wide column date-input">
          <div class="ui grid departure-date-time-container empty" data-active="false">
            <div class="eight wide column left aligned middle aligned departure-date-container js-departure-date-container"
                 @click="editDepartureDateAndTime" data-input="departureDate">
              <span class="search-departure-date js-search-input js-departure-date">Aller</span>
            </div>
            <div class="eight wide column right aligned middle aligned departure-time-container"
                 @click="editDepartureDateAndTime" data-input="departureDate">
              <span class="departure-time-span js-departure-time"></span>
            </div>
          </div>
          <div class="ui grid return-date-time-container empty" data-active="false">
            <div class="eight wide column left aligned middle aligned return-date-container js-return-date-container"
                 @click="editReturnDateAndTime" data-input="returnDate">
              <span class="search-return-date js-search-input js-return-date">Retour</span>
            </div>
            <div class="eight wide column right aligned middle aligned return-time-container"
                 @click="editReturnDateAndTime" data-input="returnDate">
              <span class="return-time-span js-return-time"></span>
            </div>
          </div>
        </div>
        <div class="sixteen wide column left aligned search-section-participants js-add-passenger">
          <input value="1 Adulte (26 - 59)" class="search-input passenger-input" type="button" data-input="addPassenger"
                 @click="displayRightPanelAction">
          <button type="button" class="search-add-participants" data-input="addPassenger" @click="displayRightPanelAction">
            Sélectionner d’autres passagers
          </button>
        </div>
        <div class="sixteen wide column right aligned devis-form-submit-button-container">
          <button class="ui button devis-form-submit-button" @click="submitDevisForm" v-bind:class="{ loading: devisButtonIsLoading }">Rechercher</button>
        </div>
      </div>
    </div>
    <div class="split-panel-right js-split-panel-right" data-panel="origin-train">
      <origin-train class="active right-panel js-right-panel-content js-origin-train-panel"></origin-train>
      <destination-train class="right-panel js-right-panel-content js-destination-train-panel"></destination-train>
      <departure-date class="right-panel js-right-panel-content js-departure-date-panel"></departure-date>
      <return-date class="right-panel js-right-panel-content js-return-date-panel"></return-date>
      <add-passenger class="right-panel js-right-panel-content js-add-passenger-panel"></add-passenger>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../store/modules/mpd-v1/devis/devis-action-types'
import OriginTrain from './split-panel-right/OriginTrain'
import DestinationTrain from './split-panel-right/DestinationTrain'
import DepartureDate from './split-panel-right/DepartureDate'
import ReturnDate from './split-panel-right/ReturnDate'
import AddPassenger from './split-panel-right/AddPassenger'
import filters from '../../../mixins/filters'

const {mapState, mapActions} = createNamespacedHelpers('mpdV1/Devis')

export default {
  name: 'Devis',
  mixins: [filters],
  components: { ReturnDate, AddPassenger, DepartureDate, DestinationTrain, OriginTrain },
  computed: {
    ...mapState([
      'originTrain',
      'destinationTrain',
      'devisButtonIsLoading',
      'returnDate',
      'departureDate'
    ])
  },
  methods: {
    ...mapActions({
      'updateOriginTrain': actions.EDIT_ORIGIN_TRAIN,
      'updateDepartureDate': actions.EDIT_DEPARTURE_DATE,
      'submitDevisForm': actions.SUBMIT_DEVIS_FORM
    }),
    checkInputValue: function () {
      $('.js-search-input').each(function () {
        let value = $(this)[0]._value
        if (value !== null && value !== undefined) {
          $(this).removeClass('empty')
        }
      })
    },
    setHeightpanel: function () {
      let value = $('.js-split-panel-left').outerHeight()
      $('.js-split-panel-right').css({
        'height': value,
        'min-heigh': value
      })
    },
    previousRightPanelToInactive: function () {
      $('.js-right-panel-content').each(function () {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active')
        }
      })
    },
    displayRightPanel: function (attr) {
      switch (attr) {
        case 'originTrain':
          $('.js-origin-train-panel').addClass('active')
          $('.js-split-panel-right').attr('data-panel', 'origin-train')
          break
        case 'destinationTrain':
          $('.js-destination-train-panel').addClass('active')
          $('.js-split-panel-right').attr('data-panel', 'destination-train')
          break
        case 'departureDate':
          $('.js-departure-date-panel').addClass('active')
          $('.js-split-panel-right').attr('data-panel', 'departure-date')
          break
        case 'returnDate':
          $('.js-return-date-panel').addClass('active')
          $('.js-split-panel-right').attr('data-panel', 'return-date')
          break
        case 'addPassenger':
          $('.js-add-passenger-panel').addClass('active')
          $('.js-split-panel-right').attr('data-panel', 'add-passenger')
          break
      }
    },
    displayRightPanelAction: function (event) {
      // Display none every split panel right
      this.previousRightPanelToInactive()

      // Display the right panel
      this.displayRightPanel(event.target.getAttribute('data-input'))

      // Add style on hover and first item on the list station
      this.setStationStyle()
    },
    updateOriginTrainAction: function (event) {
      this.updateOriginTrain(event.target.value)
    },
    updateDestinationTrainAction: function (event) {
      this.updateDestinationTrain(event.target.value)
    },
    editDepartureDateAndTime: function (event) {
      // Set style button
      event.target.parentElement.setAttribute('data-active', 'true')
      $('.js-return-date-container').parent().attr('data-active', 'false')
      if ($('.js-return-date-container span').text() === 'Retour') {
        $('.js-return-date-container').parent().addClass('empty')
      }

      // Display none every split panel right
      this.previousRightPanelToInactive()

      // Display the right panel
      this.displayRightPanel(event.target.getAttribute('data-input'))

      // edit style
      let parent = event.target.parentElement
      parent.classList.remove('empty')
    },
    editReturnDateAndTime: function (event) {
      // Set style button
      event.target.parentElement.setAttribute('data-active', 'true')
      $('.js-departure-date-container').parent().attr('data-active', 'false')
      if ($('.js-departure-date-container span').text() === 'Aller') {
        $('.js-departure-date-container').parent().addClass('empty')
      }

      // Display none every split panel right
      this.previousRightPanelToInactive()

      // Display the right panel
      this.displayRightPanel(event.target.getAttribute('data-input'))

      // edit style
      let parent = event.target.parentElement
      parent.classList.remove('empty')
    },
    setStationStyle: function () {
      // Remove style on list staion link hover
      $('.js-list-station-link').hover(function () {
        $('.js-list-station li a').first().removeClass('selected')
      })
      $('.js-list-station').mouseleave(function () {
        $('.js-list-station li a').first().addClass('selected')
      })
    }
  },
  mounted () {
    $('.js-search-input').on('input', function () {
      $(this).toggleClass('empty', this.value.length === 0)
    })

    function setStyleDatepicker () {
      $('.js-departure-date-container').parent().attr('data-active', 'false')
      $('.js-return-date-container').parent().attr('data-active', 'false')

      if ($('.js-departure-date-container span').text() === 'Aller') {
        $('.js-departure-date-container').parent().addClass('empty')
      }

      if ($('.js-return-date-container span').text() === 'Retour') {
        $('.js-return-date-container').parent().addClass('empty')
      }
    }

    $('.js-search-input').on('focus', function () {
      // Set false date picker for style
      setStyleDatepicker()

      if (this.value.length === 0) {
        $(this).removeClass('empty')
      }
    })

    $('.js-search-input').on('focusout', function () {
      if (this.value.length === 0) {
        $(this).addClass('empty')
      }
    })

    // Check the value of every input of the devis form
    this.checkInputValue()

    // Set the same height for the two panels
    this.setHeightpanel()

    // Set focus by default
    $('.js-origin-train').focus()
  }
}
</script>

<style scoped>
  .devis-form-container {
    margin-top: 40px;
    display: inline-block;
  }

  /* left panel */
  .split-panel-left {
     float: left;
     display: block;
     width: 48.5%;
     padding: 24px 40px;
     background-color: #FFF;
     border-radius: 0.3125em;
     border: 1px solid #DCE3E6;
   }

  .split-panel-left .ui.grid {
    margin: 0;
  }

  .you-travel-question-container {
    padding: 0 !important;
    margin: 0 0 15px;
  }

  .you-travel-question {
    font-size: 20px;
    font-weight: 400;
  }

  .devis-form-submit-button-container,
  .search-section-participants,
  .date-input,
  .station-input {
    padding: 0 !important;
    margin-bottom: 29px;
  }

  .search-input {
    padding: 11px 0 11px 35px !important;
    line-height: 20px !important;
    color: #323E42 !important;
    border: 1px solid #DCE3E6 !important;
  }

  .search-departure-date.empty,
  .search-input.empty::-moz-placeholder{
    color: #323E42 !important;
  }

  .search-return-date::-moz-placeholder,
  .search-departure-date::-moz-placeholder,
  .search-input::-moz-placeholder {
    color: #323E42 !important;
  }

  .search-input:focus {
    border-color: #01C3A7 !important;
    background-color: #FFF !important;
  }

  .search-input.empty {
    background-color: #F6F7FA !important;
    opacity: 0.5 !important;
  }

  .return-date-container,
  .departure-date-container {
    padding: 11px 0 11px 35px !important;
    background: no-repeat 11px center url("../../../assets/calendarDepartureIcon.svg") !important;
  }

  .return-time-container,
  .departure-time-container {
    padding: 11px 11px 11px 0 !important;
  }

  .return-date-time-container.empty,
  .departure-date-time-container.empty {
    background-color: #F6F7FA !important;
    opacity: 0.5 !important;
    min-height: 44px;
    height: 44px;
  }

  .departure-date-time-container {
    margin: 0;
    border-radius: 0.3125em 0.3125em 0 0;
    cursor: pointer;
    border: 1px solid #DCE3E6;
  }

  .return-date-time-container {
    margin: 0;
    border-radius: 0 0 0.3125em 0.3125em;
    cursor: pointer;
    border: 1px solid #DCE3E6;
    border-top: 1px solid transparent !important;
  }

  .return-date-time-container[data-active="true"],
  .departure-date-time-container[data-active="true"] {
    border: 1px solid #01C3A7 !important;
  }

  .search-departure-input {
    background: no-repeat 11px center url("../../../assets/departureIcon.svg") !important;
  }

  .search-arrival-input {
    background: no-repeat 11px center url("../../../assets/arrivalIcon.svg") !important;
  }

  .search-departure-date {
    line-height: 20px !important;
    border: none !important;
  }

  .return-time-span,
  .departure-time-span {
    line-height: 20px !important;
    color: #323E42;
  }

  .search-input-top {
    border-radius: 0.3125em 0.3125em 0 0 !important;
  }

  .search-input-down {
    border-top: 1px solid transparent !important;
    border-radius: 0 0 0.3125em 0.3125em !important;
  }

  .search-section-participants {
    margin-bottom: 40px !important;
    position: relative;
    padding-right: 44px;
    outline: none;
  }

  .passenger-input {
    background: no-repeat 11px center #FFF url("../../../assets/passengerIcon.svg") !important;
    color: #323E42 !important;
    opacity: 1;
    width: 100%;
    text-align: left;
    cursor: pointer;
    border-radius: 0.3125em;
    border: 1px solid #DCE3E6;
  }

  .search-add-participants {
    position: absolute;
    top: 0;
    right: 0;
    width: 44px;
    height: 100%;
    padding: 0;
    border: none;
    border-left-width: medium;
    border-left-style: none;
    border-left-color: currentcolor;
    border-left: 1px solid #DCE3E6;
    background: transparent url("../../../assets/plusPassengerIcon.svg") no-repeat center;
    background-size: auto auto;
    background-size: 18px 18px;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }

  /* Submit button */
  .devis-form-submit-button {
    width: 180px;
    color: #FFF;
    font-size: 0.9em;
    font-weight: 400;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    border-radius: 0.3125em;
    border: 1px solid #01C3A7;
    border-bottom-color: #017766;
    padding: 12px 22px;
    background-color: #01C3A7;
    box-shadow: 0px 1px 1px -1px #8C9DA1;
  }

  .devis-form-submit-button:hover {
    background-color: #01aa91;
    border-color: #01aa91;
    border-bottom-color: #017766;
    text-decoration: none;
    color: #FFF;
  }

  /* right panel */
  .split-panel-right {
    float: right;
    display: block;
    width: 48.5%;
    padding: 24px 40px;
    background-color: #FFF;
    border-radius: 0.3125em;
    border: 1px solid #DCE3E6;
    position: inherit;
  }

  .split-panel-right:after {
    position: absolute;
  }

  .split-panel-right:before {
    content: "";
    position: absolute;
    left: -21px;
    border-style: solid;
    border-width: 15px 15px 0;
    border-color: #FFF transparent;
    transform: rotate(90deg);
  }

  .split-panel-right[data-panel="origin-train"]:before {
    top: 73px;
  }

  .split-panel-right[data-panel="destination-train"]:before {
    top: 117px;
  }

  .split-panel-right[data-panel="departure-date"]:before {
    top: 190px;
  }

  .split-panel-right[data-panel="return-date"]:before {
    top: 235px;
  }

  .split-panel-right[data-panel="add-passenger"]:before {
    top: 308px;
  }

  .active {
    display: block !important;
  }

  .right-panel {
    display: none;
  }
</style>
