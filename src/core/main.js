import Axios from 'axios'

export function getReferences (method, path, env, username, password) {
  Axios({
    method: method,
    url: path,
    headers: {
      platform: env
    },
    withCredentials: true,
    auth: {
      username: username,
      password: password
    }
  })
    .then(function (response) {
      console.log('no error')
      return response.data
    })
    .catch(function (error) {
      console.log('error', error)
    })
}
