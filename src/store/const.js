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
  allRequest: [],
  id: 1
}

/* versions MPD */
export const versionmpd = {
  mpdv1: 'mpdv1',
  mpdv2: 'mpdv2'
}

export const error = {
  message: null
}

/* mpd-v1 */

/* devis */
export const devis = {
  travelMode: 'AS',
  originTrain: null,
  departureDate: null,
  departureTime: null,
  destinationTrain: null,
  returnDate: null,
  returnTime: null,
  returnForm: false,
  devisIsLoading: false,
  listTraveler: [
    {
      num: 1,
      typologie: 'Adulte',
      age: 30,
      droit: 'Sana carte de réduction'
    }
  ],
  currentNum: 1,
  proposalSelected: null,
  proposalBrut: null,
  priceSelected: null,
  proposalSelectedData:
    {
      proposalId: 1,
      classSelected: 'DEUXIEME'
    },
  hideDevisResult: false,
  devisButtonIsLoading: false,
  listStation: [
    'Nantes',
    'Rennes',
    'Quimper',
    'Brest',
    'Saint-Malo',
    'Angers',
    'Ancenis'
  ],
  listPassengerType: [
    'Adulte (26-59)',
    'Jeune (0-25)',
    'Senior (60+)'
  ],
  subscriptionCard: [
    'Sans carte de réduction',
    'Carte Week-end',
    'Carte jeune',
    'TGVmax'
  ],
  listTime: [
    { text: '6h', value: '6' },
    { text: '8h', value: '8' },
    { text: '10h', value: '10' },
    { text: '12h', value: '12' },
    { text: '14h', value: '14' },
    { text: '16h', value: '16' },
    { text: '18h', value: '18' },
    { text: '20h', value: '20' },
    { text: '22h', value: '22' }
  ]
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
  emailTravelerContact: null,
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
    'integ1 public',
    'cur1 mobile',
    'cur1 private',
    'cur1 public',
    'Pipeline public',
    'Pipeline mobile',
    'usine1 mpdv2',
    'usine5 mpdv2'
  ],
  environment: 'usine1 mpdv2',
  username: 'mpdWEB',
  password: 'mpdWEB',
  currentHealthCheck: null,
  loadingHealthCheck: null,
  currentEnvVersion: null
}

/* mpd-v2 */

/* Service MPD-v2 */
export const constMPDV2 = {
  xConsumerCustomID: 'app_sncf'
}

export const servicesMPDV2 = {
  servicePropositions: '/propositions/catalogues/{id}',
  servicePropositionSelected: '/propositions/{idProposition}',
  serviceCreateCommande: '/commandes',
  serviceFinalCommande: '/commandes/{idCommande}',
  servicePaiementCommande: '/paiement/commandes/{id}',
  serviceCompteClient: '/comptesclients'
}

export const serviceMPDV2Description = {
  0: 'La référence externe du compte client générée',
  1: 'Liste des propositions mise à disposition',
  2: 'Proposition mise à disposition selectionnée',
  3: 'Création d\'une nouvelle commande',
  4: 'Consultation d\'une commande existante',
  5: 'Demande de paiement initialisé'
}

/* proposition */
export const proposition = {
  listProposition: null,
  idProposition: null,
  quantite: null,
  totalAffiche: null,
  proposalSelected: null,
  returnToProposition: false,
  propositionIsLoading: false,
  listCatalogue: [
    'STIF'
  ],
  catalogueSelected: 'STIF'
}

/* commande */
export const commandeMPDV2 = {
  idCommande: null,
  finalCommandeData: null,
  quantite: null,
  totalAffiche: null,
  idProposition: null,
  commandeIsLoading: null
}

/* compte client */
export const compteclient = {
  createAccountClientSubmitIsLoading: false,
  referenceExterne: null
}

/* paiement */
export const paiementMPDV = {
  urlIhmPaiement: null
}
