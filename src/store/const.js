export const today = new Date()

/* booking-form */
export const booking = {
  travelMode: 'AS',
  originTrain: 'Nantes',
  dateDepart: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  departureTime: today.getHours(),
  destinationTrain: 'Rennes',
  dateArrivee: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  returnTime: today.getHours() + 8,
  proposal: null
}

/* username */
export const username = {
  username: 'mpdWEB',
  password: 'mpdWEB'
}

/* main-form */
export const env = {
  allEnvironments: [
    { text: 'integ1 public', value: 'integ1 public' },
    { text: 'cur1 mobile', value: 'cur1 mobile' },
    { text: 'cur1 private', value: 'cur1 private' },
    { text: 'cur1 public', value: 'cur1 public' },
    { text: 'Pipeline public', value: 'Pipeline public' },
    { text: 'Pipeline mobile', value: 'Pipeline mobile' },
    { text: 'usn1 public', value: 'usn1 public' }
  ],
  environment: 'integ1 public'
}

/* Service MPD */
export const servicesMPD = {
  serviceHealthcheck: '/api/healthcheck',
  serviceREF: '/api/references',
  serviceCOP: '/api/voyages/mono',
  serviceCOH: '/api/voyages'
}

/* Methods */
export const methods = {
  methodGet: 'get',
  methodPost: 'post'
}

/* COP Body */
export const bodyCOP =
{
  idDemande: '000002',
  diffusion: 'PRODUIT',
  idProduit: 'Ticket T plus unitaire',
  region: 'IDF',
  sens: 'AS',
  supportsMat: ['BILLETTIQUE'],
  informationsContenuSupportBillettique: {
    listContainerDto: [{
      aid: 'A000000291A000000191',
      calypsoSerialNumber: 'A000000291A00000',
      freeSlotWithCounter: '15',
      freeSlotWithoutCounter: '0',
      listTitleDto: [{
        contractApplicationVersionNumber: '1',
        contractIntercodeVersionNumber: '1',
        contractNetworkId: '250901',
        contractProvider: '00',
        contractTariff: '5000',
        erasable: 'false',
        recordNumber: '1',
        contractCount: '1',
        mask: 'FF'
      }]
    }]
  }
}
