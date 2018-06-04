import devis from './devis'
import commande from './commande'
import paiement from './paiement'
import finalisation from './finalisation'

export default{
  namespaced: true,
  modules: {
    devis,
    commande,
    paiement,
    finalisation
  }
}
