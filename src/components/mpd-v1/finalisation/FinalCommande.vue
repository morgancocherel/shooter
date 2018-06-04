<template>
  <div class="ui grid main-container" data-content="middle-on-hide-console">
    <div class="eleven wide column final-commande-container active-console js-site-content">
      <div class="ui grid">
        <div class="sixteen wide column left aligned final-commande-title">
          <h3 class="ui header">Confirmation de votre voyage</h3>
          <p>Un email de confirmation a été ennvoyé à {{ emailTravelerContact }} contenant l'ensemble des informations de votre trajet.</p>
        </div>
        <div class="sixteen wide column left aligned">
          <div class="ui accordion segment js-accordion">
            <div class="title active">
              <i class="dropdown icon"></i>
              <h3 class="ui header">Commande</h3>
            </div>
            <div class="content active first-level-accordion">
              <div class="ui grid">
                <div class="two wide column"><strong>Id commande</strong></div>
                <div class="two wide column">{{ finalData.idCommande }}</div>
                <div class="two wide column"><strong>Statut</strong></div>
                <div class="two wide column">{{ finalData.statut }}</div>
                <div class="two wide column"><strong>Montant</strong></div>
                <div class="six wide column left aligned">{{ finalData.montant }}</div>

                <div class="two wide column"><strong>Référence</strong></div>
                <div class="two wide column">{{ finalData.reference }}</div>
                <div class="two wide column"><strong>Nom référence</strong></div>
                <div class="ten wide column left aligned">{{ finalData.nomReference }}</div>
              </div>

              <div class="title">
                <i class="dropdown icon"></i>
                <h4 class="ui header">Voyage</h4>
              </div>
              <div class="content">
                <div class="ui grid second-level-accordion" v-for="voyage in finalData.voyages" :key="voyage.id">
                  <div class="two wide column"><strong>Libelle</strong></div>
                  <div class="two wide column left aligned">{{ voyage.libelle }}</div>
                  <div class="two wide column"><strong>Id</strong></div>
                  <div class="ten wide column">{{ voyage.id }}</div>
                  <div class="two wide column"><strong>Prix</strong></div>
                  <div class="two wide column">{{ voyage.prix }}</div>
                  <div class="two wide column"><strong>Validite</strong></div>
                  <div class="ten wide column left aligned">{{ voyage.validite }}</div>
                </div>
              </div>

              <div class="title">
                <i class="dropdown icon"></i>
                <h4 class="ui header">Itinéraire Aller</h4>
              </div>
              <div class="content">
                <div class="ui grid second-level-accordion" v-for="voyage in finalData.voyages" :key="voyage.id">
                  <div class="three wide column no-padding-left"><b>Date Départ</b></div>
                  <div class="five wide column">{{ voyage.itineraireAller.dateDepart }}</div>
                  <div class="three wide column"><b>Id Itinéraire</b></div>
                  <div class="five wide column">{{ voyage.itineraireAller.idItineraire }}</div>
                  <div class="three wide column no-padding-left"><b>Date Arrivée</b></div>
                  <div class="five wide column">{{ voyage.itineraireAller.dateArrivee }}</div>
                  <div class="three wide column"><b>Id Itinéraire sens</b></div>
                  <div class="five wide column">{{ voyage.itineraireAller.idItineraireSens }}</div>
                  <div class="three wide column"></div>
                  <div class="five wide column"><b>UIC</b></div>
                  <div class="eight wide column"></div>
                  <div class="three wide column no-padding-left"><b>Origine</b></div>
                  <div class="five wide column">{{ voyage.itineraireAller.origine.uic }}</div>
                  <div class="eight wide column"></div>
                  <div class="three wide column no-padding-left"><b>Destination</b></div>
                  <div class="five wide column">{{ voyage.itineraireAller.destination.uic }}</div>
                  <div class="eight wide column"></div>
                </div>
                <div class="accordion sub-accordion">
                  <div class="title">
                    <i class="dropdown icon"></i>
                    <h4 class="ui header">Segments</h4>
                  </div>
                  <div class="content">
                    <div class="ui grid second-level-accordion" v-for="segment in finalData.voyages[0].itineraireAller.segments" :key="segment.id">
                      <div class="three wide column no-padding-left"><b>Date Départ</b></div>
                      <div class="four wide column">{{ segment.dateDepart }}</div>
                      <div class="three wide column"><b>Numéro train</b></div>
                      <div class="two wide column">{{ segment.numTrain }}</div>
                      <div class="one wide column"><b>Id</b></div>
                      <div class="one wide column">{{ segment.id}}</div>
                      <div class="three wide column no-padding-left"><b>Date Arrivée</b></div>
                      <div class="four wide column">{{ segment.dateArrivee }}</div>
                      <div class="three wide column"><b>Libellé équipement</b></div>
                      <div class="two wide column">{{ segment.libelleEquipement }}</div>
                      <div class="one wide column"></div>
                      <div class="one wide column"></div>
                      <div class="three wide column"></div>
                      <div class="five wide column"><b>UIC</b></div>
                      <div class="eight wide column"></div>
                      <div class="three wide column no-padding-left"><b>Origine</b></div>
                      <div class="five wide column">{{ segment.origine.uic }}</div>
                      <div class="eight wide column"></div>
                      <div class="three wide column no-padding-left"><b>Destination</b></div>
                      <div class="five wide column">{{ segment.destination.uic }}</div>
                      <div class="eight wide column"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="title">
                <i class="dropdown icon"></i>
                <h4 class="ui header">Offres</h4>
              </div>
              <div class="content">
                <div class="ui grid second-level-accordion" v-for="offre in finalData.voyages[0].offres" :key="offre.id">
                  <div class="four wide column"><b>Id</b></div>
                  <div class="four wide column">{{ offre.id }}</div>
                  <div class="three wide column"><b>Classe</b></div>
                  <div class="four wide column">{{ offre.classe }}</div>
                  <div class="one wide column"></div>
                  <div class="four wide column"><b>Id itinéraire sens aller</b></div>
                  <div class="four wide column">{{ offre.idItineraireSensAller }}</div>
                  <div class="three wide column"><b>Sens</b></div>
                  <div class="four wide column">{{ offre.sens }}</div>
                  <div class="one wide column"></div>
                  <div class="four wide column"><b>Prix</b></div>
                  <div class="four wide column">{{ offre.prix }}</div>
                  <div class="three wide column"><b>Région</b></div>
                  <div class="four wide column">{{ offre.region }}</div>
                  <div class="one wide column"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sixteen wide column">
          <router-link class="ui button submit-button back-button" to="/mpdV1/finalisation/finPaiement">Retour</router-link>
          <router-link class="ui button submit-button back-button" to="/">Accueil</router-link>
        </div>
      </div>
    </div>
    <console></console>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import $ from 'jquery'
import Console from '../../console/Console'

const { mapState } = createNamespacedHelpers('mpdV1/finalisation')

export default {
  name: 'finalisation',
  components: {Console},
  computed: {
    ...mapState([
      'finalData',
      'emailTravelerContact'
    ])
  },
  mounted () {
    // Set up all accordions menus
    $('.js-accordion').accordion({exclusive: false})
  }
}
</script>

<style scoped>
  /* mutual style */
  .main-container {
    margin: 0 !important;
  }

  .container {
    display: inline-flex;
    margin: 0 !important;
  }

  .final-commande-container {
    padding: 0 !important;
    margin-top: 40px;
  }

  .final-commande-container.active-console {
    padding-right: 20px !important;
  }

  .final-commande-container .ui.grid {
    margin: 0;
  }

  .final-commande-title h3{
    color: #13181A;
    font-size: 20px !important;
    font-weight: 600;
  }

  .final-commande-title p {
    font-size: 17px;
  }

  .segment {
    border: 1px solid #DCE3E6;
    box-shadow: none;
  }

  /* Accordion View */
  h3.ui.header,
  h4.ui.header,
  h5.ui.header {
    margin: 0;
    display: inline-block;
    color: #21314D;
  }

  .first-level-accordion {
    margin: 0 25px;
  }

  .sub-accordion {
    margin-left: 20px !important;
  }

  .second-level-accordion {
    margin: 0 12px;
  }

  .no-padding-left {
    padding-left: 0;
  }

  /* Navigation buttons */
  .submit-button {
    color: #FFF;
    padding: 12px 22px;
    border-radius: 0.3125em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .back-button {
    background-color: #8C9DA1;
    color: #FFF;
  }

  .back-button:hover {
    background-color: #7e9196;
    color: #FFF;
  }
</style>
