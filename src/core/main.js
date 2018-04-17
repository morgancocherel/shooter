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

// For each trajet, add a unique id, price and class selected
export function addData (trajetsData) {
  let id = 1
  let trajets = []
  $.each(trajetsData, function () {
    this.id = id
    let current = this
    let offerLength = this.voyage.offres.length

    this.proposal = proposalSelectedData(current, id, offerLength)
    trajets.push(this)
    id = id + 1
  })

  return trajets
}

function proposalSelectedData (current, id, offerLength) {
  let firstClass = {}
  let secondClass = {}
  let firstProposal = id === 1

  let proposalSelected = firstProposal
  let classSelected = 'DEUXIEME'
  if (offerLength === 2) {
    firstClass.price = current.voyage.offres[0].prix
    secondClass.price = current.voyage.offres[1].prix
  } else {
    firstClass.price = '-'
    secondClass.price = current.voyage.offres[0].prix
  }
  secondClass.selected = firstProposal
  firstClass.selected = false

  return { proposalSelected, classSelected, firstClass, secondClass }
}

/*
function secondsToHm (d) {
  d = Number(d)
  let h = Math.floor(d / 3600)
  let m = Math.floor(d % 3600 / 60)
  let mDisplay = m.toString().length === 1 ? '0' + m : m

  return h + 'H' + mDisplay
}
*/

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
