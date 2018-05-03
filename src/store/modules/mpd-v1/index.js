import Devis from './devis'
import Commande from './commande'
import Payment from './paiement'
import Finalisation from './finalisation'

export default{
  namespaced: true,
  modules: {
    Devis,
    Commande,
    Payment,
    Finalisation
  }
}
