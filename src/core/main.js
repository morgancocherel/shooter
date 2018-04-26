import Axios from 'axios'
import $ from 'jquery'

export function callService (method, service, env, contentType, data, username, password) {
  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: service,
      headers: {
        platform: env,
        'X-CorrelationId': 'shooter-' + Math.random(),
        'Content-Type': contentType,
        'IDEXTERNECOMMANDE': 1234567890
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

// For each trajet, add a unique id, price and class selected
export function addData (trajetsData) {
  let id = 1
  let trajets = []
  $.each(trajetsData, function () {
    this.id = id
    let current = this
    let offerLength = this.voyage.offres.length

    this.proposal = proposalSelectedData(current, id, offerLength)

    // Add data required for AVO to the proposal selected and body
    let origineLibelle = 'Nantes'
    let destinationLibelle = 'Rennes'
    let typeNumTrain = 'SUM'
    let dureeItineraire = 123

    this.voyage.itineraireAller.origine.libelle = origineLibelle
    this.voyage.itineraireAller.destination.libelle = destinationLibelle
    this.voyage.itineraireAller.dureeItineraire = dureeItineraire
    this.voyage.itineraireAller.segments[0].typeNumTrain = typeNumTrain
    if (this.voyage.itineraireAller.segments.length === 2) {
      this.voyage.itineraireAller.segments[1].typeNumTrain = typeNumTrain
    }

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
