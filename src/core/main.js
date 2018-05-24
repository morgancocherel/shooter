import Axios from 'axios'
// import store from '../store/index'
// import * as actionsConsole from '../store/modules/console/console-action-types'

export function callService (method, service, env, contentType, data, username, password, versionmpd) {
  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: service,
      headers: {
        platform: env,
        'X-CorrelationId': 'shooter-' + Math.random().toString().slice(2),
        'Content-Type': contentType,
        'IDEXTERNECOMMANDE': 1234567890,
        'versionmpd': versionmpd
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
        console.log(3, error)
        reject(error)
      })
  })
}
