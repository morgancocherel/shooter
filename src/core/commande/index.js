import * as constShooter from '../../store/const'
import $ from 'jquery'

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
