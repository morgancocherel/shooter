// For each trajet, add a unique id, price and class selected
import $ from 'jquery'
import * as constShooter from '../../../store/const'
import Axios from 'axios/index'
import store from '../../../store/index'

function toDateEntered (date, time) {
  let dateNoTime = date.toISOString().replace(/T.*/i, '')
  let datePlusTime = dateNoTime + 'T' + time + ':00:00.000Z'
  return new Date(datePlusTime)
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

export function addData (trajetsData) {
  let id = 1
  let trajets = []

  for (let i = 0; i < trajetsData.length; i++) {
    let current = trajetsData[i]
    if (current.warnings === undefined && current.voyage !== undefined) {
      current.id = id
      let offerLength = current.voyage.offres.length

      current.proposal = proposalSelectedData(current, id, offerLength)

      // Add data required for AVO to the proposal selected and body
      let typeNumTrain = 'SUM'
      let dureeItineraire = 123

      current.voyage.itineraireAller.origine.libelle = current.start_point.label
      current.voyage.itineraireAller.destination.libelle = current.end_point.label
      current.voyage.itineraireAller.dureeItineraire = dureeItineraire

      for (let j = 0; j < current.voyage.itineraireAller.segments.length; j++) {
        current.voyage.itineraireAller.segments[j].typeNumTrain = typeNumTrain
      }

      trajets.push(current)
      id = id + 1
    }
  }

  return trajets
}

export function trajetsOffres () {
  const data = {
    'trajet': {
      'origin': 'FRNTE',
      'destination': 'FRRNS',
      'departureDatetime': toDateEntered(store.getters['mpdV1/devis/getDepartureDate'], store.getters['mpdV1/devis/getDepartureTime']),
      'includeTypes': 'TER'
    },
    'voyageurs': [
      {
        'typologie': 'Adulte',
        'age': 30,
        'num': 1
      }
    ],
    'idDemande': '1',
    'diffusion': 'HORAIRE',

    'supportsMat': [
      'DIGITALISE'
    ]
  }
  return new Promise((resolve, reject) => {
    Axios({
      method: constShooter.methods.methodPost,
      url: 'api' + constShooter.servicesMPDV1.serviceCTO,
      headers: {
        platform: store.getters['mainForm/getEnvironment'],
        'X-CORRELATIONID': 'shooter-' + Math.random().toString().slice(2),
        'versionmpd': constShooter.versionmpd.mpdv1,
        'Content-Type': constShooter.contentType.json
      },
      auth: {
        username: store.getters['mainForm/getUsername'],
        password: store.getters['mainForm/getPassword']
      },
      data
    })
      .then((response) => {
        let fullResponse = {
          response: response,
          body: data
        }
        resolve(fullResponse)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function setProposalSelected (proposalBrut, proposals, proposalSelectedData) {
  // Remove previous proposal selected
  $.each(proposalBrut, function () {
    if (this.proposal.proposalSelected === true) {
      this.proposal.proposalSelected = false
    }

    if (this.proposal.firstClass.selected === true) {
      this.proposal.firstClass.selected = false
    }

    if (this.proposal.secondClass.selected === true) {
      this.proposal.secondClass.selected = false
    }
  })

  // Set up the new proposal selected
  let proposalSelected = null
  $.each(proposalBrut, function () {
    if (this.id.toString() === proposals.id.toString()) {
      this.proposal.proposalSelected = true

      let previousClassSelected = proposalSelectedData.classSelected
      let classSelected = proposals.classSelected
      let firstClassNotNull = this.proposal.firstClass.price === '-'
      let secondClassNotNull = this.proposal.secondClass === '-'

      switch (true) {
        case (firstClassNotNull === true):
          this.proposal.secondClass.selected = true
          break
        case (secondClassNotNull === true):
          this.proposal.firstClass.selected = true
          break
        case (classSelected === constShooter.classes.premiere) || (previousClassSelected === constShooter.classes.premiere && classSelected === constShooter.classes.noClass):
          this.proposal.firstClass.selected = true
          break
        case (classSelected === constShooter.classes.deuxieme) || (previousClassSelected === constShooter.classes.deuxieme && classSelected === constShooter.classes.noClass):
          this.proposal.secondClass.selected = true
          break
      }
      proposalSelected = this
    }
  })

  return proposalSelected
}

export function getPriceSelected (proposalSelected) {
  let priceSelected = proposalSelected.firstClass.selected === true ? proposalSelected.firstClass.price : proposalSelected.secondClass.price
  return priceSelected
}

function setOffreSelected (proposalSelected) {
  let voyageForAVO = {}
  let offreSelected = proposalSelected.proposal.classSelected === constShooter.classes.premiere ? proposalSelected.voyage.offres[0] : proposalSelected.voyage.offres[1]
  voyageForAVO.itineraireAller = proposalSelected.voyage.itineraireAller
  voyageForAVO.voyageurs = proposalSelected.voyage.voyageurs
  voyageForAVO.offres = [ offreSelected ]
  return voyageForAVO
}

export function addToBasket () {
  const data = setOffreSelected(store.getters['mpdV1/devis/getProposalSelected'])
  return new Promise((resolve, reject) => {
    Axios({
      method: constShooter.methods.methodPost,
      url: 'api' + constShooter.servicesMPDV1.serviceAVOnew,
      headers: {
        platform: store.getters['mainForm/getEnvironment'],
        'X-CORRELATIONID': 'shooter-' + Math.random().toString().slice(2),
        'versionmpd': constShooter.versionmpd.mpdv1,
        'Content-Type': constShooter.contentType.json,
        'IDEXTERNECOMMANDE': 1234567890
      },
      auth: {
        username: store.getters['mainForm/getUsername'],
        password: store.getters['mainForm/getPassword']
      },
      data
    })
      .then((response) => {
        let fullResponse = {
          response: response,
          body: data
        }
        resolve(fullResponse)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
