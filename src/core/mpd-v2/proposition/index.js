export function getBodyProposition () {
  const bodyProposition =
    {
      contexteBillettique: {

        contexteNfc: {
          listContainerDto: [{
            aid: 'A000000291A000000191',
            calypsoSerialNumber: 'A000000291A00000',
            freeSlotWithCounter: 15,
            freeSlotWithoutCounter: 0,
            listTitleDto: [{
              contractApplicationVersionNumber: 1,
              contractIntercodeVersionNumber: 1,
              contractNetworkId: '250901',
              contractProvider: '00',
              contractTariff: '5000',
              erasable: false,
              recordNumber: 1,
              contractCount: 1,
              mask: 'FF'
            }]
          }]
        }
      }
    }
  return bodyProposition
}

export function removeFalseProposal (data) {
  let availableProposals = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].proposable) {
      availableProposals.push(data[i])
    }
  }
  return availableProposals
}

export function getBodyCreateCommande (idProposition, quantite, totalAffiche) {
  const body =
    {
      'items':
        [
          {
            'idProposition': idProposition,
            'quantite': quantite,
            'totalAffiche': totalAffiche
          }
        ]

    }
  return body
}
