import moment from 'moment'

export default {
  filters: {
    priceFormat (val) {
      if (val !== '-') {
        return val.toString().slice(0, -2) + ',00 €'
      } else {
        return val
      }
    },
    durationFormat (val) {
      let d = Number(val)
      let h = Math.floor(d / 3600)
      let m = Math.floor(d % 3600 / 60)
      let mDisplay = m.toString().length === 1 ? '0' + m : m
      return h + 'h' + mDisplay
    },
    stationFormat (val) {
      return val.charAt(0).toUpperCase() + val.slice(1, val.length).toLowerCase()
    },
    dateFormat (val) {
      return moment(val).locale('fr').format('dddd D MMMM')
    }
  }
}
