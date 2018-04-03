import Axios from 'axios'

export function healthCheck (method, path, env) {
  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: path,
      headers: {
        platform: env
      }
    })
      .then(() => {
        resolve(true)
      })
      .catch((error) => {
        console.log('rrr', error)
        reject(error, false)
      })
  })
}

export function callService (method, path, env, username, password, data) {
  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: path,
      headers: {
        platform: env
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
