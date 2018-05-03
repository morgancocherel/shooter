export const today = new Date()

/* mutual const for mpd v1 and 2 */

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

/* Methods */
export const methods = {
  methodGet: 'get',
  methodPost: 'post'
}

/* console */
export const console = {
  allRequest: []
}

/* mpd-v1 */

/* devis */
export const devis = {
  travelMode: 'AS',
  originTrain: 'FRUIP',
  departureDate: today,
  departureTime: today.getHours(),
  destinationTrain: 'FRRNS',
  returnDate: null,
  returnTime: null,
  returnForm: false,
  devisIsLoading: false,
  travelerData: [
    {
      id: 1,
      typologie: 'Adulte',
      age: 30,
      num: 1
    }
  ],
  proposalSelected: null,
  proposalBrut: null,
  priceSelected: null,
  proposalSelectedData:
    {
      proposalId: 1,
      classSelected: 'DEUXIEME'
    },
  hideDevisResult: false,
  devisButtonIsLoading: false
}

/* commande */
export const commande = {
  idCommande: null,
  civility: null,
  allCivilities: [
    {text: 'M.', value: 'monsieur'},
    {text: 'Mme', value: 'madame'}
  ],
  firstname: 'Morgan',
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
  emailTravelerContact: 'm.cocherel@icloud.com',
  commandeButtonIsLoading: false,
  proposalSelected: null,
  priceSelected: null
}

/* Payment */
export const payment = {
  paymentButtonIsLoading: false
}

/* Finalisation */
export const finalisation = {
  jetonTransaction: null,
  dureeValiditeJeton: null,
  urlIhmPaiement: null,
  operationDistributionId: null,
  finalData: null,
  finalisationButtonIsLoading: false
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

/* Service MPD-v1 */
export const servicesMPDV1 = {
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

export const serviceMPDV1Description = {
  1: 'Verifie si le service est up ou down',
  2: 'REF - Récupérer les données de références d\'un canal',
  3: 'COP - Consulter les offres par accès Produit',
  4: 'COH - Consulter les offres TER par accès Horaire',
  5: 'CTO - Consulter les trajest et les offres',
  6: 'AVO - Ajouter un voyage à une nouvelle commande',
  7: 'AVO - Ajouter un voyage à une commande',
  8: 'CCM - Consulter une commande en cours',
  9: 'DPC - Demander le paiement d\'une commande',
  10: 'RRP - Recevoir le résultat du paiement',
  11: 'FRC - Fournir le résultat du paiement'
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
    { text: 'usn1 public', value: 'usn1 public' },
    { text: 'usine1 mpdv2', value: 'usine1 mpdv2' }
  ],
  environment: 'usine1 mpdv2',
  username: 'mpdWEB',
  password: 'mpdWEB',
  currentHealthCheck: null,
  loadingHealthCheck: null,
  currentEnvVersion: null
}

/* mpd-v2 */
export const proposition = {
  listePropositions: null,
  catalogueSTIF: 'STIF'
}

/* Service MPD-v2 */
export const servicesMPDV2 = {
  servicePropositions: '/propositions/catalogues/{id}'
}

export const serviceMPDV2Description = {
  1: 'Liste des propositions mise à disposition'
}
