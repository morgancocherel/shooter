import Devis from './devis'
import Commande from './commande'
import Paiement from './paiement'
import Finalisation from './finalisation'

export default{
  namespaced: true,
  modules: {
    Devis,
    Commande,
    Paiement,
    Finalisation
  }
}
