import * as constStore from '../../store/const'

export function formatRequestConsole (response, idService, body, versionmpd) {
  let requestSent = {}
  requestSent.method = response.config.method
  requestSent.service = response.config.url.slice(4)
  requestSent.serviceDescription = versionmpd === 'mpdv1' ? constStore.serviceMPDV1Description[idService] : constStore.serviceMPDV2Description[idService]
  requestSent.body = body

  return { requestSent, response }
}

export function setUpAllRequest (requests) {
  for (let i = 0; i < requests.length; i++) {
    requests[i].active = false
    requests[i].currentRequest = false
  }
}
