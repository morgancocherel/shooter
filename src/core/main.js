import Axios from 'axios'
// import store from '../store/index'
// import * as actionsConsole from '../store/modules/console/console-action-types'

export function callService (method, service, env, contentType, data, username, password, versionMPD) {
  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: service,
      headers: {
        platform: env,
        'X-CorrelationId': 'shooter-' + Math.random(),
        'Content-Type': contentType,
        'IDEXTERNECOMMANDE': 1234567890,
        'versionMPD': versionMPD
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
