import compteClient from './compte-client'
import proposition from './proposition'
import commande from './commande'
import paiement from './paiement'

export default{
  namespaced: true,
  modules: {
    compteClient,
    proposition,
    commande,
    paiement
  }
}
