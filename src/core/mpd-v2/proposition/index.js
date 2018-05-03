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
