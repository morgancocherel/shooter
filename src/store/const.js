export const today = new Date()

/* booking */
export const booking = {
  travelMode: 'AS',
  originTrain: 'FRNTE',
  departureDate: today,
  departureTime: today.getHours(),
  destinationTrain: 'FRRNS',
  returnDate: null,
  returnTime: today.getHours() + 8,
  returnForm: false,
  proposalBrut: '',
  proposalFormated: null,
  dateDisplay: null,
  bookingIsLoading: false,
  travelerData: [
    {
      id: 1,
      typologie: 'Adulte',
      age: 30,
      num: 1
    }
  ],
  proposalSelected: ''
}

/* console */
export const console = {
  allRequest: []
}

/* main-form */
export const mainForm = {
  allEnvironments: [
    { text: 'integ1 public', value: 'integ1 public' },
    { text: 'cur1 mobile', value: 'cur1 mobile' },
    { text: 'cur1 private', value: 'cur1 private' },
    { text: 'cur1 public', value: 'cur1 public' },
    { text: 'Pipeline public', value: 'Pipeline public' },
    { text: 'Pipeline mobile', value: 'Pipeline mobile' },
    { text: 'usn1 public', value: 'usn1 public' }
  ],
  environment: 'integ1 public',
  username: 'mpdWEB',
  password: 'mpdWEB',
  currentHealthCheck: null,
  loadingHealthCheck: null,
  currentEnvVersion: null
}

/* Service MPD */
export const servicesMPD = {
  serviceHealthcheck: '/api/healthcheck',
  serviceREF: '/api/references',
  serviceCOP: '/api/voyages/mono',
  serviceCOH: '/api/voyages',
  serviceCTO: '/api/trajetsOffres'
}

export const serviceMPDDescription = {
  '/api/references': 'REF - Récupérer les données de références d\'un canal',
  '/api/voyages/mono': 'COP - Consulter les offres par accès Produit',
  '/api/voyages': 'COH - Consulter les offres TER par accès Horaire',
  '/api/trajetsOffres': 'CTO - Consulter les trajest et les offres'
}

export const serviceMPDMethod = {
  '/references': 'get',
  '/voyages/mono': 'post',
  '/voyages': 'post',
  '/trajetsOffres': 'post'
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
