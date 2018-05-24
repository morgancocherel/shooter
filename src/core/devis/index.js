// For each trajet, add a unique id, price and class selected
import $ from 'jquery'
import * as constShooter from '../../store/const'

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

export function getBodyCTO (departureDate, travelerData, originTrain, destinationTrain) {
  console.log(departureDate, travelerData, originTrain, destinationTrain)
  const bodyCTO =
    {
      'trajet': {
        'origin': 'FRNTE',
        'destination': 'FRRNS',
        'departureDatetime': departureDate,
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
  return bodyCTO
}

export function toDateEntered (date, time) {
  let dateNoTime = date.toISOString().replace(/T.*/i, '')
  let datePlusTime = dateNoTime + 'T' + time + ':00:00.000Z'
  return new Date(datePlusTime)
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

export function setOffreSelected (voyage, classSelected) {
  let voyageForAVO = {}
  let offreSelected = classSelected === constShooter.classes.premiere ? voyage.offres[0] : voyage.offres[1]
  voyageForAVO.itineraireAller = voyage.itineraireAller
  voyageForAVO.voyageurs = voyage.voyageurs
  voyageForAVO.offres = [ offreSelected ]

  return voyageForAVO
}

export function setTravelerData (list) {
  for (let element in list) {
    console.log(element)
  }
}
