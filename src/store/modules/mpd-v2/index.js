import CompteClient from './compte-client'
import Proposition from './proposition'
import Commande from './commande'
import Paiement from './paiement'

export default{
  namespaced: true,
  modules: {
    CompteClient,
    Proposition,
    Commande,
    Paiement
  }
}
