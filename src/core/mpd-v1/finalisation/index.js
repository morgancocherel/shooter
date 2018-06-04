import Axios from 'axios/index'
import * as constShooter from '../../../store/const'
import store from '../../../store'

export function submitTransaction (jetonTransaction) {
  const data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.domter.ritmx.sncf.com/">
                           <soapenv:Header/>
                           <soapenv:Body>
                              <ser:finTransaction>
                                 <!--Optional:-->
                                 <transactionPaiement>
                                    <!--Optional:-->
                                    <jetonTransaction>${jetonTransaction}</jetonTransaction>
                                    <codeReponse>CODE_REPONSE_SIPS2_OK_001</codeReponse>
                                    <!--Optional:-->
                                    <idPandore>1187938888205749781</idPandore>
                                    <!--Optional:-->
                                    <cardNumber>1234567891234567890</cardNumber>
                                    <!--Optional:-->
                                    <cardValidity>1710</cardValidity>
                                    <!--Optional:-->
                                    <cardType>CB</cardType>
                                    <!--Optional:-->
                                    <authorizationNumber>123456</authorizationNumber>
                                    <!--Optional:-->
                                    <codeReponseSIPS>00</codeReponseSIPS>
                                    <!--Optional:-->
                                    <transactionCertificate>dshsedbsertsb</transactionCertificate>
                                    <!--Optional:-->
                                    <transactionDate>2015-10-13T15:56:29+01:00</transactionDate>
                                 </transactionPaiement>
                              </ser:finTransaction>
                           </soapenv:Body>
                        </soapenv:Envelope>`
  return new Promise((resolve, reject) => {
    Axios({
      method: constShooter.methods.methodPost,
      url: 'api' + constShooter.servicesMPDV1.serviceRRP,
      headers: {
        platform: store.getters['mainForm/getEnvironment'],
        'X-CORRELATIONID': 'shooter-' + Math.random().toString().slice(2),
        'versionmpd': constShooter.versionmpd.mpdv1,
        'Content-Type': constShooter.contentType.xml,
        'IDEXTERNECOMMANDE': 1234567890
      },
      auth: {
        username: store.getters['mainForm/getUsername'],
        password: store.getters['mainForm/getPassword']
      },
      data
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function submitFinalisation () {
  const data =
    {
      operationDistributions: [
        {
          id: store.getters['mpdV1/finalisation/getOperationDistributionId'],
          titulaire: {
            nom: store.getters['mpdV1/finalisation/getLastname'],
            prenom: store.getters['mpdV1/finalisation/getFirstname'],
            dateNaissance: '1995-01-18'
          }
        }
      ]
    }
  return new Promise((resolve, reject) => {
    Axios({
      method: constShooter.methods.methodPost,
      url: 'api' + constShooter.servicesMPDV1.serviceFRC.replace(/{idCommande}/i, store.getters['mpdV1/commande/getIdCommande']).replace(/{jetonTransaction}/i, store.getters['mpdV1/finalisation/getJetonTransaction']),
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
      data
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
