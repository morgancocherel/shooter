export function getBodyRRP (jetonTransaction) {
  const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.domter.ritmx.sncf.com/">
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

  return xml
}

export function getBodyFRC (idOperationDistrib, lastname, firstname, dateBirth) {
  const bodyCTO =
    {
      operationDistributions: [
        {
          id: idOperationDistrib,
          titulaire: {
            nom: lastname,
            prenom: firstname,
            dateNaissance: dateBirth
          }
        }
      ]
    }
  return bodyCTO
}

export function getMonthFromString (mon) {
  return new Date(Date.parse(mon + ' 1, 2012')).getMonth() + 1
}
