import Axios from 'axios/index'
import * as constShooter from '../../../store/const'
import store from '../../../store'

export function consultOrderInProgress (idCommande) {
  return new Promise((resolve, reject) => {
    Axios({
      method: constShooter.methods.methodGet,
      url: 'api' + constShooter.servicesMPDV2.serviceConsultCommandeInProgress.replace(/{idCommande}/i, idCommande),
      headers: {
        platform: store.getters['mainForm/getEnvironment'],
        'X-CORRELATIONID': 'shooter-' + Math.random().toString().slice(2),
        'X-ACCOUNT-REF': store.getters['mpdV2/compteClient/getReferenceExterne'],
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

export function submitPayment () {
  return new Promise((resolve, reject) => {
    Axios({
      method: constShooter.methods.methodPost,
      url: 'api' + constShooter.servicesMPDV2.servicePaiementCommande.replace(/{id}/i, store.getters['mpdV2/commande/getIdCommande']),
      headers: {
        platform: store.getters['mainForm/getEnvironment'],
        'X-CORRELATIONID': 'shooter-' + Math.random().toString().slice(2),
        'X-ACCOUNT-REF': store.getters['mpdV2/compteClient/getReferenceExterne'],
        'X-Consumer-Custom-ID': 'app_sncf',
        'X-Mock-Pandore': 'CODE_REPONSE_ST1_OK_001',
        'versionmpd': constShooter.versionmpd.mpdv2,
        'Content-Type': constShooter.contentType.json
      },
      data: {
        email: 'mcocherel@oui.sncf',
        urlRedirection: 'http://google.com'
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
