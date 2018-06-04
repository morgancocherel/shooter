<template>
    <div class="ui grid departure-date-container-right-panel">
      <div class="sixteen wide column left aligned choose-departure-date-container">
        <h3 class="ui header choose-departure-date">Choisissez votre date de départ</h3>
      </div>
      <div class="sixteen wide column calendar-container">
        <div class="ui calendar calendar-departure-date js-calendar-departure-date"></div>
      </div>
      <div class="sixteen wide column departure-date-time-container-right-panel">
        <ul class="departure-date-time-right-panel js-departure-date-time-right-panel" data-selected="false">
          <li v-for="time in listTime" :value="time.value" :key="time.value" @click="updateListTime">{{ time.text }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
import * as actions from '../../../../store/modules/mpd-v1/devis/devis-action-types'
import {createNamespacedHelpers} from 'vuex'
import moment from 'moment'

const {mapState, mapActions} = createNamespacedHelpers('mpdV1/devis')

export default {
  name: 'departureDate',
  computed: {
    ...mapState([ 'listTime' ])
  },
  methods: {
    ...mapActions({
      'updateDepartureDate': actions.EDIT_DEPARTURE_DATE,
      'updateDepartureTime': actions.EDIT_DEPARTURE_TIME
    }),
    selectTime: function (currentTime, checkTime) {
      $('.js-departure-date-time-right-panel').attr('data-selected', 'true')
      let self = this
      let time = null
      if (checkTime) {
        time = currentTime % 2 === 0 ? currentTime : currentTime + 1
      } else {
        time = currentTime
      }
      $('.js-departure-date-time-right-panel li').each(function () {
        if ($(this).attr('value') === time.toString()) {
          $(this).addClass('selected')
          self.updateDepartureTime(time)
          let timeDisplay = time + 'h00'
          $('.js-departure-time').html('à partir de' + '<p>' + timeDisplay + '</p>')
          $('.js-departure-time p').css({
            'display': 'inline-block',
            'color': '#2D77DB'
          })
        }
      })
    },
    updateListTime: function (event) {
      this.updateDepartureTime(event.target.value)
    },
    dateFormat: function (val) {
      return moment(val).locale('fr').format('dddd D MMMM YYYY')
    }
  },
  mounted () {
    const today = new Date()
    let self = this

    $('.js-calendar-departure-date').calendar({
      inline: true,
      type: 'date',
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      firstDayOfWeek: 1,
      text: {
        days: ['Dim', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      },
      onChange: function (mode) {
        if ($('.js-departure-date-time-right-panel').attr('data-selected') === 'false') {
          self.selectTime(today.getHours(), true)
        }
        self.updateDepartureDate(mode)

        // Update the IHM
        $('.js-departure-date-container').text(self.dateFormat(mode))
      }
    })

    // Choose time
    $('.js-departure-date-time-right-panel li').click(function () {
      $('.js-departure-date-time-right-panel li').each(function () {
        $(this).removeClass('selected')
      })
      $(this).toggleClass('selected')
      self.selectTime($(this).attr('value'), false)
    })
  }
}
</script>

<style scoped>
  .departure-date-container-right-panel {
    margin: 0 !important;
  }

  .choose-departure-date-container {
    padding: 0 !important;
    margin-bottom: 15px;
  }

  .choose-departure-date {
    font-size: 20px;
    font-weight: 400;
  }

  .calendar-container {
    padding: 0 !important;
  }

  .departure-date-time-container-right-panel {
    border: 1px solid #DCE3E6;
    border-top: none;
    padding: 0 !important;
  }

  .departure-date-time-right-panel {
    margin: 13px 0;
    padding: 0 !important;
  }

  .departure-date-time-right-panel li {
    display: inline-block;
    list-style: none;
    cursor: pointer;
    padding: 7px 10px;
    min-width: 33px;
    line-height: 19px;
    border-radius: 3px;
  }

  .departure-date-time-right-panel li:hover {
    background-color: #F0F1F5;
  }

  .departure-date-time-right-panel li.selected {
    background: #01C3A7;
    color: #FFF;
  }
</style>
