import Axios from 'axios'
import * as constStore from '../store/const'
import $ from 'jquery'

export function healthCheck (method, path, env) {
  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: path,
      headers: {
        platform: env
      }
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error, response) => {
        reject(error, response)
      })
  })
}

export function callService (method, path, env, username, password, data) {
  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: path,
      headers: {
        platform: env,
        'X-CorrelationId': 'shooter-' + Math.random(),
        'Content-Type': 'application/json'
      },
      data,
      withCredentials: true,
      auth: {
        username: username,
        password: password
      }
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function formatRequestConsole (method, service, env, body, response) {
  let requestSent = {}
  let responseReceived = {}

  requestSent.method = method.toUpperCase()
  requestSent.service = service
  requestSent.serviceDescription = constStore.serviceMPDDescription[service]
  requestSent.body = body

  responseReceived.responseReceived = response

  return { requestSent, responseReceived }
}

export function addId (trajetsData) {
  let id = 1
  let trajets = []

  $.each(trajetsData, function () {
    this.id = id
    trajets.push(this)
    id = id + 1
  })

  return trajets
}

export function formatCTOResponse (trajetsData) {
  let trajets = []
  let id = 1

  $.each(trajetsData, function () {
    let offre = {}

    offre.id = id

    if (this.voyage.offres.length === 2) {
      offre.travel_mode = this.legs[0].type
      $.each(this.voyage.offres, function () {
        if (this.classe === 'PREMIERE') {
          offre.price_first_class = this.prix
        } else {
          offre.price_second_class = this.prix
        }
      })
    } else {
      offre.travel_mode = this.legs[0].type

      $.each(this.voyage.offres, function () {
        offre.price_first_class = '-'
        if (this.classe === 'DEUXIEME') {
          offre.price_second_class = this.prix
        }
      })
    }
    // Basic travel information
    offre.departure_time = this.departure_time.text
    offre.arrival_time = this.arrival_time.text
    offre.duration = secondsToHm(this.duration.value)
    offre.start_point = this.start_point.label
    offre.end_point = this.end_point.label

    // Other information
    offre.authorities_ids = this.authorities_ids[0]
    offre.carbon_footprint = this.carbon_footprint
    offre.feasible = this.feasible
    offre.most_bike = this.most_bike
    offre.most_walk = this.most_walk
    offre.type = this.type

    trajets.push(offre)
    id = id + 1
  })

  return trajets
}

function secondsToHm (d) {
  d = Number(d)
  let h = Math.floor(d / 3600)
  let m = Math.floor(d % 3600 / 60)
  let mDisplay = m.toString().length === 1 ? '0' + m : m

  return h + 'H' + mDisplay
}

export function toDisplayDate (date) {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  let year = new Date().getFullYear()
  let dateLocaleTable = date.toLocaleDateString('fr-FR', options).replace(year, '').split(' ').map(String)
  let dateDisplay = []

  $.each(dateLocaleTable, function () {
    if ($.isNumeric(this) && this !== '') {
      let number = this.length === 1 ? '0' + this : this
      dateDisplay.push(number)
    } else {
      dateDisplay.push(this)
    }
  })

  return dateDisplay.join(' ')
}

export function toDateEntered (date, time) {
  let dateNoTime = date.toISOString().replace(/T.*/i, '')
  let datePlusTime = dateNoTime + 'T' + time + ':00:00.000Z'
  return new Date(datePlusTime)
}
