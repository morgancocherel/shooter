<template>
  <div class="ui grid return-date-container-right-panel">
    <div class="sixteen wide column left aligned choose-return-date-container">
      <h3 class="ui header choose-return-date">Choisissez votre date d'arrivée</h3>
    </div>
    <div class="sixteen wide column left aligned calendar-container">
      <div class="ui calendar calendar-return-date js-calendar-return-date"></div>
    </div>
    <div class="sixteen wide column return-date-time-container-right-panel">
      <ul class="return-date-time-right-panel js-return-date-time-right-panel" data-selected="false">
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

const {mapState, mapActions} = createNamespacedHelpers('mpdV1/Devis')

export default {
  name: 'returnDate',
  computed: {
    ...mapState([ 'listTime' ])
  },
  methods: {
    ...mapActions({
      'updateReturnDate': actions.EDIT_RETURN_DATE,
      'updateReturnTime': actions.EDIT_RETURN_TIME
    }),
    selectTime: function (currentTime, checkTime) {
      $('.js-return-date-time-right-panel').attr('data-selected', 'true')
      let self = this
      let time = null
      if (checkTime) {
        time = currentTime % 2 === 0 ? currentTime : currentTime + 1
      } else {
        time = currentTime
      }
      $('.js-return-date-time-right-panel li').each(function () {
        if ($(this).attr('value') === time.toString()) {
          $(this).addClass('selected')
          self.updateReturnTime(time)
          let timeDisplay = time + 'h00'
          $('.js-return-time').html('à partir de' + '<p>' + timeDisplay + '</p>')
          $('.js-return-time p').css({
            'display': 'inline-block',
            'color': '#2D77DB'
          })
        }
      })
    },
    updateListTime: function (event) {
      this.updateReturnTime(event.target.value)
    },
    dateFormat: function (val) {
      return moment(val).locale('fr').format('dddd D MMMM YYYY')
    }
  },
  mounted () {
    const today = new Date()
    let self = this

    $('.js-calendar-return-date').calendar({
      inline: true,
      type: 'date',
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      firstDayOfWeek: 1,
      text: {
        days: ['Dim', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      },
      onChange: function (mode) {
        if ($('.js-return-date-time-right-panel').attr('data-selected') === 'false') {
          self.selectTime(today.getHours(), true)
        }
        self.updateReturnDate(mode)

        // Update the IHM
        $('.js-return-date-container').text(self.dateFormat(mode))
      }
    })

    // Choose time
    $('.js-return-date-time-right-panel li').click(function () {
      $('.js-return-date-time-right-panel li').each(function () {
        $(this).removeClass('selected')
      })
      $(this).toggleClass('selected')
      self.selectTime($(this).attr('value'), false)
    })
  }
}
</script>

<style scoped>
  .return-date-container-right-panel {
    margin: 0 !important;
  }

  .choose-return-date-container {
    padding: 0 !important;
    margin-bottom: 15px;
  }

  .choose-return-date {
    font-size: 20px;
    font-weight: 400;
  }

  .calendar-container {
    padding: 0 !important;
  }

  .return-date-time-container-right-panel {
    border: 1px solid #DCE3E6;
    border-top: none;
    padding: 0 !important;
  }

  .return-date-time-right-panel {
    margin: 13px 0;
    padding: 0 !important;
  }

  .return-date-time-right-panel li {
    display: inline-block;
    list-style: none;
    cursor: pointer;
    padding: 7px 10px;
    min-width: 33px;
    line-height: 19px;
    border-radius: 3px;
  }

  .return-date-time-right-panel li:hover {
    background-color: #F0F1F5;
  }

  .return-date-time-right-panel li.selected {
    background: #01C3A7;
    color: #FFF;
  }
</style>
