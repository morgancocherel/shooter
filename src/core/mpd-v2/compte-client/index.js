import store from '../../../store'
import * as constShooter from '../../../store/const'
import Axios from 'axios/index'

export function createAccountClient () {
  return new Promise((resolve, reject) => {
    Axios({
      method: constShooter.methods.methodPost,
      url: 'api' + constShooter.servicesMPDV2.serviceCompteClient,
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
