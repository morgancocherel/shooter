import Axios from 'axios/index'
import * as constShooter from '../../../store/const'
import store from '../../../store'

export function submitPayment () {
  return new Promise((resolve, reject) => {
    Axios({
      method: constShooter.methods.methodPost,
      url: 'api' + constShooter.servicesMPDV1.serviceDPC.replace(/{idCommande}/i, store.getters['mpdV1/commande/getIdCommande']),
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
      data: {
        email: store.getters['mpdV1/commande/getEmailTravelerContact'],
        urlRetourPaiement: 'http://www.test.com'
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
