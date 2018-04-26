import * as constStore from '../../store/const'

export function formatRequestConsole (method, service, env, body, response, idService) {
  let requestSent = {}

  requestSent.method = method.toUpperCase()
  let serviceUsed = service.slice(4)
  requestSent.service = serviceUsed
  requestSent.serviceDescription = constStore.serviceMPPDescription[idService]
  requestSent.body = body

  return { requestSent, response }
}
