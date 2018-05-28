import Axios from 'axios'

export function callServiceNoAccountRef (method, service, env, contentType, data, username, password, versionmpd, XConsumerCustomID) {
  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: service,
      headers: {
        platform: env,
        'X-CORRELATIONID': 'shooter-' + Math.random().toString().slice(2),
        'X-Consumer-Custom-ID': XConsumerCustomID,
        'X-Mock-Pandore': 'CODE_REPONSE_ST1_OK_001',
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
        reject(error)
      })
  })
}

export function callServiceWithAccountRef (method, service, env, contentType, data, username, password, versionmpd, xaccounref, XConsumerCustomID) {
  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: service,
      headers: {
        platform: env,
        'X-CORRELATIONID': 'shooter-' + Math.random().toString().slice(2),
        'X-Consumer-Custom-ID': XConsumerCustomID,
        'X-Mock-Pandore': 'CODE_REPONSE_ST1_OK_001',
        'X-ACCOUNT-REF': xaccounref,
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
        reject(error)
      })
  })
}
