import * as constStore from '../../store/const'

export function formatRequestConsole (method, service, env, body, response, idService, versionMPD) {
  let requestSent = {}

  requestSent.method = method
  requestSent.service = service.slice(4)
  requestSent.serviceDescription = versionMPD === 'mpdv1' ? constStore.serviceMPDV1Description[idService] : constStore.serviceMPDV2Description[idService]
  requestSent.body = body

  return { requestSent, response }
}

export function setUpAllRequest (requests) {
  for (let i = 0; i < requests.length; i++) {
    requests[i].active = false
    requests[i].currentRequest = false
  }
}
