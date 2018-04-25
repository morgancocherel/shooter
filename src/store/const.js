export const today = new Date()

/* devis */
export const devis = {
  travelMode: 'AS',
  originTrain: 'FRNTE',
  departureDate: today,
  departureTime: today.getHours(),
  destinationTrain: 'FRRNS',
  returnDate: null,
  returnTime: today.getHours() + 8,
  returnForm: false,
  dateDisplay: null,
  devisIsLoading: false,
  travelerData: [
    {
      id: 1,
      typologie: 'Adulte',
      age: 30,
      num: 1
    }
  ]
}

/* commande */
export const commande = {
  proposalSelected: null,
  proposalBrut: null,
  priceSelected: null,
  dateDisplay: null,
  proposalSelectedData:
    {
      proposalId: 1,
      classSelected: 'DEUXIEME'
    },
  idCommande: null,
  civility: null,
  allCivilities: [
    {text: 'M.', value: 'monsieur'},
    {text: 'Mme', value: 'madame'}
  ],
  firsname: 'Morgan',
  lastname: 'Cocherel',
  dayBirth: null,
  allMonths: [
    { text: 'Janvier' },
    { text: 'Février' },
    { text: 'Mars' },
    { text: 'Avril' },
    { text: 'Mai' },
    { text: 'Juin' },
    { text: 'Juillet' },
    { text: 'Août' },
    { text: 'Septembre' },
    { text: 'Octobre' },
    { text: 'Novembre' },
    { text: 'Décembre' }
  ],
  monthBirth: null,
  yearBirth: null,
  allTravelers: [
    {text: 'Passager 1'}
  ],
  travelerContact: null,
  emailTravelerContact: 'mcocherel@oui.sncf'
}

/* Finalisation */
export const finalisation = {
  jetonTransaction: null,
  dureeValiditeJeton: null,
  urlIhmPaiement: null,
  operationDistributionId: null,
  finalData: null,
  transactionIsLoading: false
}

/* Travel Mode */
export const travelMode = {
  oneWay: 'AS',
  roundTrip: 'AR'
}

/* Supports Mat */
export const supportsMat = {
  digitalise: 'DIGITALISE'
}

/* console */
export const console = {
  allRequest: []
}

/* header top */
export const headerTop = {
  devisActiveStep: true,
  commandeActiveStep: false,
  paymentActiveStep: false,
  finalisationActiveStep: false
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
  environment: 'cur1 public',
  username: 'mpdWEB',
  password: 'mpdWEB',
  currentHealthCheck: null,
  loadingHealthCheck: null,
  currentEnvVersion: null
}

/* Service MPD */
export const servicesMPD = {
  serviceHealthcheck: '/healthcheck',
  serviceREF: '/references',
  serviceCOP: '/voyages/mono',
  serviceCOH: '/voyages',
  serviceCTO: '/trajetsOffres',
  serviceAVOnew: '/commandes/current/voyages',
  serviceAVO: '/commandes/{idCommande}/voyages',
  serviceCCM: '/commandes/{idCommande}',
  serviceDPC: '/commandes/{idCommande}/paiements',
  serviceRRP: '/soap/finTransaction',
  serviceFRC: '/commandes/{idCommande}/paiements/{jetonTransaction}'
}

export const serviceMPPDescription = {
  '/healthcheck': 'Verifie si le service est up ou down',
  '/references': 'REF - Récupérer les données de références d\'un canal',
  '/voyages/mono': 'COP - Consulter les offres par accès Produit',
  '/voyages': 'COH - Consulter les offres TER par accès Horaire',
  '/trajetsOffres': 'CTO - Consulter les trajest et les offres Consulter les trajest et les offres Consulter les trajest et les offres',
  '/commandes/current/voyages': 'AVO - Ajouter un voyage à une nouvelle commande',
  '/commandes/{idCommande}/voyages': 'AVO - Ajouter un voyage à une commande',
  '/commandes/{idCommande}': 'CCM - Consulter une commande en cours',
  '/commandes/{idCommande}/paiements': 'DPC - Demander le paiement d\'une commande',
  '/soap/finTransaction': 'RRP - Recevoir le résultat du paiement',
  '/commandes/{idCommande}/paiements/{jetonTransaction}': 'FRC - Fournir le résultat du paiement'
}

/* Methods */
export const methods = {
  methodGet: 'get',
  methodPost: 'post'
}

/* Classes */
export const classes = {
  premiere: 'PREMIERE',
  deuxieme: 'DEUXIEME',
  noClass: 'no class'
}

/* Content type */
export const contentType = {
  json: 'application/json',
  xml: 'text/xml'
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
