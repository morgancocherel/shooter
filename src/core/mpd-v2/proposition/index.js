import Axios from 'axios/index'
import * as constShooter from '../../../store/const'
import store from '../../../store'

export function removeFalseProposal (data) {
  let availableProposals = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].proposable) {
      availableProposals.push(data[i])
    }
  }
  return availableProposals
}

const contexteBillettique =
  {
    contexteNfc: {
      listContainerDto: [{
        aid: 'A000000291A000000191',
        calypsoSerialNumber: 'A000000291A00000',
        freeSlotWithCounter: 15,
        freeSlotWithoutCounter: 0,
        listTitleDto: [{
          contractApplicationVersionNumber: 1,
          contractIntercodeVersionNumber: 1,
          contractNetworkId: '250901',
          contractProvider: '00',
          contractTariff: '5000',
          erasable: false,
          recordNumber: 1,
          contractCount: 1,
          mask: 'FF'
        }]
      }]
    }
  }

export function getProposionsCatalogueSelected (cat) {
  return new Promise((resolve, reject) => {
    Axios({
      method: constShooter.methods.methodPost,
      url: 'api' + constShooter.servicesMPDV2.servicePropositions.replace(/{id}/i, cat),
      headers: {
        platform: store.getters['mainForm/getEnvironment'],
        'X-CORRELATIONID': 'shooter-' + Math.random().toString().slice(2),
        'X-ACCOUNT-REF': store.getters['mpdV2/compteClient/getReferenceExterne'],
        'versionmpd': constShooter.versionmpd.mpdv2,
        'Content-Type': constShooter.contentType.json
      },
      data: {
        contexteBillettique
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

export function submitPropositionSelected (idProp) {
  return new Promise((resolve, reject) => {
    Axios({
      method: constShooter.methods.methodGet,
      url: 'api' + constShooter.servicesMPDV2.servicePropositionSelected.replace(/{idProposition}/i, idProp),
      headers: {
        platform: store.getters['mainForm/getEnvironment'],
        'X-CORRELATIONID': 'shooter-' + Math.random().toString().slice(2),
        'versionmpd': constShooter.versionmpd.mpdv2,
        'Content-Type': constShooter.contentType.json
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

export function createNewCommande (idProposition, quantite, totalAffiche) {
  const items =
    [
      {
        'idProposition': idProposition,
        'quantite': quantite,
        'totalAffiche': totalAffiche
      }
    ]
  return new Promise((resolve, reject) => {
    Axios({
      method: constShooter.methods.methodPost,
      url: 'api' + constShooter.servicesMPDV2.serviceCreateCommande,
      headers: {
        platform: store.getters['mainForm/getEnvironment'],
        'X-CORRELATIONID': 'shooter-' + Math.random().toString().slice(2),
        'X-ACCOUNT-REF': store.getters['mpdV2/compteClient/getReferenceExterne'],
        'versionmpd': constShooter.versionmpd.mpdv2,
        'Content-Type': constShooter.contentType.json
      },
      data: {
        items
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
