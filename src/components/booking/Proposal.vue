<template>
  <div>
    <sidebar></sidebar>
    <header-top></header-top>
    <header-down></header-down>
    <div id="proposal-content">
      <div class="ui grid">
        <div class="three wide column"></div>
        <div class="five wide column your-travel left aligned">
          <div class="ui label">
            <span class="your-travel-text">Votre Trajet {{ getOriginTrain }}</span>
            <i class="large right arrow icon"></i>
            <span class="your-travel-text">{{ getDestinationTrain}}</span>
          </div>
        </div>
        <div class="height wide column"></div>
        <div class="three wide column booking-form">
          <div class="ui segment">
            <div class="ui grid form">
              <div class="height wide column left aligned">
                <div class="ui radio checkbox">
                  <input name="devis" type="radio" value="AS" v-model="getDevis" @input="updateDevis">
                  <label>Aller simple</label>
                </div>
              </div>
              <div class="height wide column left aligned">
                <div class="ui radio checkbox">
                  <input name="devis" type="radio" value="AR" v-model="getDevis" @input="updateDevis">
                  <label>Aller-retour</label>
                </div>
              </div>
              <div class="two wide column center aligned middle aligned">
                <div class="swap-button js-swap-origin-destination-train">
                  <span class="swap-button-icon"></span>
                </div>
              </div>
              <div class="fourteen wide column">
                <div class="origin-train">
                  <input class="js-origin-train" placeholder="Départ : gare, adresse, lieu" type="text"
                         :value="getOriginTrain"
                         @input="updateOriginTrain">
                </div>
                <div class="destination-train">
                  <input class="js-destination-train" placeholder="Arrivée : gare, adresse, lieu" type="text"
                         :value="getDestinationTrain"
                         @input="updateDestinationTrain">
                </div>
              </div>
              <div class="height wide column left aligned">
                <div class="ui calendar departure-date" id="js-departure-date">
                  <div class="ui input left icon">
                    <input type="text" placeholder="Date" :value="getDepartureDate" @input="updateDepartureDate">
                    <i class="calendar icon departure-date-icon"></i>
                  </div>
                </div>
              </div>
              <div class="height wide column left aligned departure-time-container">
                <div class="ui calendar" id="js-departure-time">
                  <div class="ui input left icon departure-time">
                    <i class="time icon"></i>
                    <input type="text" placeholder="Time" :value="getDepartureTime" @input="updateDepartureTime">
                  </div>
                </div>
              </div>
              <div v-show="getReturnForm">
                <div class="height wide column left aligned">
                  <div class="ui calendar" id="js-return-date">
                    <div class="ui input left icon">
                      <input type="text" placeholder="Date" :value="getReturnDate" @input="updateReturnDate">
                      <i class="calendar icon"></i>
                    </div>
                  </div>
                </div>
                <div class="height wide column left aligned">
                  <div class="ui calendar" id="js-return-time">
                    <div class="ui input left icon">
                      <i class="time icon"></i>
                      <input type="text" placeholder="Time" :value="getDepartureTime" @input="updateDepartureTime">
                    </div>
                  </div>
                </div>
              </div>
              <div class="sixteen wide column left aligned">
                <div class="ui radio checkbox">
                  <input name="direct-travel" type="radio">
                  <label>Trajet direct</label>
                </div>
              </div>
              <div class="sixteen wide column center aligned">
                <button @click="submitBookingForm" class="ui button submit-booking-form" v-bind:class="{ loading: getBookingIsLoading }">Rechercher</button>
              </div>
            </div>
          </div>
        </div>
        <div class="five wide column list-devis">
          <div class="ui segment">
            <div class="ui grid js-list-devis">
              <div class="sixteen wide column middle aligned">
                <i class="caret up icon"></i> Trajets précédents
              </div>
              <div class="ten wide column left aligned search-result-header">
                <i class="calendar alternate outline icon"></i>
                <span class="search-result-header-date">{{ getDateDisplay }}</span>
              </div>
              <div class="three wide column center aligned search-result-header">
                <span>2<sup>nde</sup> classe</span>
              </div>
              <div class="three wide column center aligned search-result-header">
                <span>1<sup>ère</sup> classe</span>
              </div>
              <div class="ui vertical pointing menu sixteen wide column devis-row-container"  v-for="offre in getProposalFormated" :key="offre.id" :value="offre.id">
                <a class="item js-proposal">
                  <div class="ui grid devis-row">
                    <div class="three wide column">
                      <h5 class="ui header">{{ offre.departure_time }}</h5>
                      <h5 class="ui header">{{ offre.arrival_time }}</h5>
                    </div>
                    <div class="three wide column">
                      <h5 class="ui header">{{ offre.start_point }}</h5>
                      <h5 class="ui header">{{ offre.end_point }}</h5>
                    </div>
                    <div class="four wide column center aligned middle aligned">
                      <h5 class="ui header">
                        {{ offre.duration }} - {{ offre.travel_mode }}
                      </h5>
                    </div>
                    <div class="three wide column center aligned middle aligned">
                      <h5 class="ui header">{{ offre.price_second_class }}</h5>
                    </div>
                    <div class="three wide column center aligned middle aligned">
                      <h5 class="ui header">{{ offre.price_first_class }}</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="sixteen wide column middle aligned">
                <i class="caret down icon"></i> Trajets suivants
              </div>
            </div>
          </div>
        </div>
        <div class="height wide column left aligned proposal-selected">
          <div class="ui segment">
            <div class="ui accordion js-accordion">
              <div class="title active">
                <i class="dropdown icon"></i>
                <h3 class="ui header">Trajet</h3>
              </div>
              <div class="content active first-level-accordion">
                <div class="ui grid travel-accordion">
                  <div class="one wide column center aligned no-padding-left"><i class="user icon"></i></div>
                  <div class="seven wide column traveler-data" v-for="voyageurs in getProposalSelected.voyage.voyageurs" :key="voyageurs.id">
                    <span>{{ voyageurs.num}} Passager</span>
                    <span>{{ voyageurs.typologie }} de {{ voyageurs.age }} ans, sans carte</span>
                    <span>Valable sur TER uniquement pour la date de voyage choisie. Billet non-échangeable et non-remboursable.</span>
                  </div>
                  <div class="one wide column center aligned"><i class="train icon"></i></div>
                  <div class="one wide column">
                    <h5 class="ui header">{{ getProposalSelected.departure_time.text }}</h5>
                    <h5 class="ui header">{{ getProposalSelected.arrival_time.text }}</h5>
                  </div>
                  <div class="two wide column">
                    <h5 class="ui header">{{ getProposalSelected.start_point.label }}</h5>
                    <h5 class="ui header">{{ getProposalSelected.end_point.label }}</h5>
                  </div>
                  <div class="four wide column center aligned middle aligned" v-for="segment in getProposalSelected.voyage.itineraireAller.segments" :key="segment.id">
                    <span>{{ getProposalSelected.duration.text }}</span>
                    <span>{{ segment.libelleEquipement }} {{ segment.numTrain }} | 2<sup>e</sup> class</span>
                  </div>
                </div>
              </div>
              <div class="title">
                <i class="dropdown icon"></i>
                <h3 class="ui header">Proposition</h3>
              </div>
              <div class="content">
                <div class="ui grid first-level-accordion proposal-accordion-stations-data">
                  <div class="one wide column no-padding-left"></div>
                  <div class="one wide column"><strong>Texte</strong></div>
                  <div class="four wide column"><b>Valeur</b></div>
                  <div class="two wide column"><b>Label</b></div>
                  <div class="two wide column"><b>RR code</b></div>
                  <div class="two wide column"><b>UIC code</b></div>
                  <div class="four wide column"><b>Coordonnées</b></div>
                  <div class="one wide column no-padding-left"><b>Départ</b></div>
                  <div class="one wide column">{{ getProposalSelected.departure_time.text }}</div>
                  <div class="four wide column">{{ getProposalSelected.departure_time.value }}</div>
                  <div class="two wide column">{{ getProposalSelected.start_point.label }}</div>
                  <div class="two wide column">{{ getProposalSelected.start_point.rr_code }}</div>
                  <div class="two wide column">{{ getProposalSelected.start_point.uic_code }}</div>
                  <div class="four wide column">[{{ getProposalSelected.start_point.coordinates.latitude }}, {{ getProposalSelected.start_point.coordinates.longitude }}]</div>
                  <div class="one wide column no-padding-left"><b>Arrivée</b></div>
                  <div class="one wide column">{{ getProposalSelected.arrival_time.text }}</div>
                  <div class="four wide column">{{ getProposalSelected.arrival_time.value }}</div>
                  <div class="two wide column">{{ getProposalSelected.end_point.label }}</div>
                  <div class="two wide column">{{ getProposalSelected.end_point.rr_code }}</div>
                  <div class="two wide column">{{ getProposalSelected.end_point.uic_code }}</div>
                  <div class="four wide column">[{{ getProposalSelected.end_point.coordinates.latitude }}, {{ getProposalSelected.end_point.coordinates.longitude }}]</div>
                  <div class="sixteen wide column"></div>
                  <div class="two wide column no-padding-left"><b>Durée texte</b></div>
                  <div class="four wide column">{{ getProposalSelected.duration.text }}</div>
                  <div class="three wide column"><b>Durée valeur</b></div>
                  <div class="four wide column">{{ getProposalSelected.duration.value }}</div>
                </div>
                <div class="ui grid first-level-accordion ">
                  <div class="three wide column no-padding-left"><b>Authorities ids</b></div>
                  <div class="two wide column">{{ getProposalSelected.authorities_ids[0] }}</div>
                  <div class="three wide column"><b>Carbon footprint</b></div>
                  <div class="two wide column">{{ getProposalSelected.carbon_footprint }}</div>
                  <div class="three wide column"><b>Feasible</b></div>
                  <div class="three wide column left aligned">{{ getProposalSelected.feasible }}</div>
                  <div class="three wide column no-padding-left"><b>Most bike</b></div>
                  <div class="two wide column">{{ getProposalSelected.most_bike }}</div>
                  <div class="three wide column"><b>Most walk</b></div>
                  <div class="two wide column">{{ getProposalSelected.most_walk }}</div>
                  <div class="three wide column"><b>Type</b></div>
                  <div class="three wide column left aligned">{{ getProposalSelected.type }}</div>
                </div>
              </div>
              <div class="title">
                <i class="dropdown icon"></i>
                <h3 class="ui header">Legs</h3>
              </div>
              <div class="content">
                <div class="ui grid first-level-accordion legs-accordion-stations-data" v-for="leg in getProposalSelected.legs" :key="leg.id">
                  <div class="one wide column no-padding-left"></div>
                  <div class="one wide column"><b>Texte</b></div>
                  <div class="four wide column"><b>Valeur</b></div>
                  <div class="two wide column"><b>Label</b></div>
                  <div class="two wide column"><b>RR code</b></div>
                  <div class="two wide column"><b>UIC code</b></div>
                  <div class="four wide column"><b>Coordonnées</b></div>
                  <div class="one wide column no-padding-left"><b>Départ</b></div>
                  <div class="one wide column">{{ leg.departure_time.text }}</div>
                  <div class="four wide column">{{ leg.departure_time.value }}</div>
                  <div class="two wide column">{{ leg.start_point.label }}</div>
                  <div class="two wide column">{{ leg.start_point.rr_code }}</div>
                  <div class="two wide column">{{ leg.start_point.uic_code }}</div>
                  <div class="four wide column">[{{ leg.start_point.coordinates.latitude }}, {{ leg.start_point.coordinates.longitude }}]</div>
                  <div class="one wide column no-padding-left"><b>Arrivée</b></div>
                  <div class="one wide column">{{ leg.arrival_time.text }}</div>
                  <div class="four wide column">{{ leg.arrival_time.value }}</div>
                  <div class="two wide column">{{ leg.end_point.label }}</div>
                  <div class="two wide column">{{ leg.end_point.rr_code }}</div>
                  <div class="two wide column">{{ leg.end_point.uic_code }}</div>
                  <div class="four wide column">[{{ leg.end_point.coordinates.latitude }}, {{ leg.end_point.coordinates.longitude }}]</div>
                  <div class="sixteen wide column"></div>
                  <div class="two wide column no-padding-left"><b>Durée texte</b></div>
                  <div class="four wide column">{{ leg.duration.text }}</div>
                  <div class="three wide column"><b>Durée valeur</b></div>
                  <div class="four wide column">{{ leg.duration.value }}</div>
                  <div class="three wide column"></div>
                  <div class="two wide column no-padding-left"><b>Mode</b></div>
                  <div class="four wide column">{{ leg.mode }}</div>
                  <div class="three wide column"><b>Type</b></div>
                  <div class="four wide column">{{ leg.type }}</div>
                  <div class="three wide column"></div>
                </div>
              </div>
              <div class="title">
                <i class="dropdown icon"></i>
                <h3 class="ui header">Voyage</h3>
              </div>
              <div class="content sub-accordion">
                <div class="accordion">
                  <div class="title">
                    <i class="dropdown icon"></i>
                    <h4 class="ui header">Itinéraire Aller</h4>
                  </div>
                  <div class="content">
                    <div class="ui grid second-level-accordion">
                      <div class="three wide column no-padding-left"><b>Date Départ</b></div>
                      <div class="five wide column">{{ getProposalSelected.voyage.itineraireAller.dateDepart }}</div>
                      <div class="three wide column"><b>Id Itinéraire</b></div>
                      <div class="five wide column">{{ getProposalSelected.voyage.itineraireAller.idItineraire }}</div>
                      <div class="three wide column no-padding-left"><b>Date Arrivée</b></div>
                      <div class="five wide column">{{ getProposalSelected.voyage.itineraireAller.dateArrivee }}</div>
                      <div class="three wide column"><b>Id Itinéraire sens</b></div>
                      <div class="five wide column">{{ getProposalSelected.voyage.itineraireAller.idItineraireSens }}</div>
                      <div class="three wide column"></div>
                      <div class="five wide column"><b>UIC</b></div>
                      <div class="eight wide column"></div>
                      <div class="three wide column no-padding-left"><b>Origine</b></div>
                      <div class="five wide column">{{ getProposalSelected.voyage.itineraireAller.origine.uic }}</div>
                      <div class="eight wide column"></div>
                      <div class="three wide column no-padding-left"><b>Destination</b></div>
                      <div class="five wide column">{{ getProposalSelected.voyage.itineraireAller.destination.uic }}</div>
                      <div class="eight wide column"></div>
                    </div>
                    <div class="accordion sub-accordion">
                      <div class="title">
                        <i class="dropdown icon"></i>
                        <h4 class="ui header">Segments</h4>
                      </div>
                      <div class="content">
                        <div class="ui grid second-level-accordion" v-for="segment in getProposalSelected.voyage.itineraireAller.segments" :key="segment.id">
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
                    <div class="ui grid second-level-accordion offers-accordion-data" v-for="offre in getProposalSelected.voyage.offres" :key="offre.id">
                      <div class="four wide column no-padding-left"><b>Id</b></div>
                      <div class="four wide column">{{ offre.id }}</div>
                      <div class="three wide column"><b>Classe</b></div>
                      <div class="four wide column">{{ offre.classe }}</div>
                      <div class="one wide column"></div>
                      <div class="four wide column no-padding-left"><b>Id itinéraire sens aller</b></div>
                      <div class="four wide column">{{ offre.idItineraireSensAller }}</div>
                      <div class="three wide column"><b>Ordre</b></div>
                      <div class="four wide column">{{ offre.ordre }}</div>
                      <div class="one wide column"></div>
                      <div class="four wide column no-padding-left"><b>Prix</b></div>
                      <div class="four wide column">{{ offre.prix }}</div>
                      <div class="three wide column"><b>Région</b></div>
                      <div class="four wide column">{{ offre.region }}</div>
                      <div class="one wide column"></div>
                      <div class="accordion">
                        <div class="title">
                          <i class="dropdown icon"></i>
                          <h4 class="ui header">Devis</h4>
                        </div>
                        <div class="content">
                          <div class="ui grid second-level-accordion devis-accordion-data">
                            <div class="three wide column no-padding-left"><b>CTCR</b></div>
                            <div class="two wide column">{{ offre.devis[0].CTCR }}</div>
                            <div class="three wide column no-padding-left"><b>Durée utilisation</b></div>
                            <div class="two wide column">{{ offre.devis[0].dureeUtilisation }}</div>
                            <div class="three wide column no-padding-left"><b>Date aller</b></div>
                            <div class="two wide column">{{ offre.devis[0].dateAller }}</div>

                            <div class="three wide column no-padding-left"><b>Classe</b></div>
                            <div class="two wide column">{{ offre.devis[0].classe }}</div>
                            <div class="three wide column no-padding-left"><b>Date fin utilisation</b></div>
                            <div class="two wide column">{{ offre.devis[0].nbUtilisation }}</div>
                            <div class="three wide column no-padding-left"><b>Nombre d'utilisation</b></div>
                            <div class="two wide column">{{ offre.devis[0].dateDebutUtilisation }}</div>

                            <div class="three wide column no-padding-left"><b>Utilisable au retour</b></div>
                            <div class="two wide column">{{ offre.devis[0].utilisableRetour }}</div>
                            <div class="three wide column no-padding-left"><b>Id voyageurs</b></div>
                            <div class="two wide column">{{ offre.devis[0].idVoyageurs[0] }}</div>
                            <div class="three wide column no-padding-left"><b>Date fin utilisation</b></div>
                            <div class="two wide column">{{ offre.devis[0].dateFinUtilisation }}</div>

                            <div class="three wide column no-padding-left"><b>Porteur Devis</b></div>
                            <div class="two wide column">{{ offre.devis[0].porteurDevis }}</div>
                            <div class="three wide column no-padding-left"><b>TP contingente au train</b></div>
                            <div class="two wide column">{{ offre.devis[0].typageProduitContingenteAuTrain }}</div>
                            <div class="three wide column no-padding-left"><b>Restriction horaire</b></div>
                            <div class="two wide column">{{ offre.devis[0].restrictionHoraire }}</div>

                            <div class="three wide column no-padding-left"><b>Sens</b></div>
                            <div class="two wide column">{{ offre.devis[0].sens }}</div>
                            <div class="three wide column no-padding-left"><b>Support matérialisation</b></div>
                            <div class="two wide column">{{ offre.devis[0].supportMat }}</div>
                            <div class="three wide column no-padding-left"><b>TP complet avec SSO</b></div>
                            <div class="two wide column">{{ offre.devis[0].typageProduitCompletAvecSSO }}</div>

                            <div class="three wide column no-padding-left"><b>Prix</b></div>
                            <div class="two wide column">{{ offre.devis[0].prix }}</div>
                            <div class="three wide column no-padding-left"><b>TP retriction au train</b></div>
                            <div class="two wide column">{{ offre.devis[0].typageProduitRestrictionAuTrain }}</div>
                            <div class="three wide column no-padding-left"><b>Id produit</b></div>
                            <div class="two wide column">{{ offre.devis[0].idProduit }}</div>

                            TP : Typage Produit
                          </div>
                        </div>
                        <div class="title">
                          <i class="dropdown icon"></i>
                          <h4 class="ui header">Relations Commerciales</h4>
                        </div>
                        <div class="content">
                          <div class="ui grid second-level-accordion">
                            <div class="five wide column no-padding-left"><b>Distance réel commerciale</b></div>
                            <div class="three wide column">{{ offre.relationCommerciale.distanceRelCommerciale }}</div>
                            <div class="five wide column"><b>Emission carbonne transport</b></div>
                            <div class="three wide column">{{ offre.relationCommerciale.emissionCarboneTransport }}</div>

                            <div class="five wide column no-padding-left"><b>Emission carbonne voiture</b></div>
                            <div class="three wide column">{{ offre.relationCommerciale.emissionCarboneVoiture }}</div>
                            <div class="five wide column"><b>Région</b></div>
                            <div class="three wide column">{{ offre.relationCommerciale.region }}</div>

                            <div class="five wide column no-padding-left"></div>
                            <div class="three wide column"><b>UIC</b></div>
                            <div class="eight wide column"></div>

                            <div class="five wide column no-padding-left"><b>Origine relation commerciale</b></div>
                            <div class="three wide column">{{ offre.relationCommerciale.origRelCommerciale.uic }}</div>
                            <div class="eight wide column"></div>

                            <div class="five wide column no-padding-left"><b>Destination relation commerciale</b></div>
                            <div class="three wide column">{{ offre.relationCommerciale.destRelCommerciale.uic }}</div>
                            <div class="eight wide column"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="title">
                    <i class="dropdown icon"></i>
                    <h4 class="ui header">Voyageurs</h4>
                  </div>
                  <div class="content">
                    <div class="ui grid second-level-accordion">
                      <div class="three wide column no-padding-left"><b>Age</b></div>
                      <div class="two wide column">{{ getProposalSelected.voyage.voyageurs[0].age }}</div>
                      <div class="three wide column"><b>Numéro</b></div>
                      <div class="two wide column">{{ getProposalSelected.voyage.voyageurs[0].num }}</div>
                      <div class="three wide column"><b>Typologie</b></div>
                      <div class="two wide column">{{ getProposalSelected.voyage.voyageurs[0].typologie }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/booking/booking-action-types'
import $ from 'jquery'
import HeaderTop from '../HeaderTop'
import HeaderDown from '../main-form/HeaderDown'
import VueJsonPretty from 'vue-json-pretty'
import Sidebar from '../console/Sidebar'

const {mapGetters, mapActions} = createNamespacedHelpers('Booking')

export default {
  name: 'Proposal',
  components: {
    Sidebar,
    HeaderTop,
    HeaderDown,
    VueJsonPretty
  },
  computed: {
    ...mapGetters([
      'getDevis',
      'getOriginTrain',
      'getDepartureDate',
      'getDepartureTime',
      'getDestinationTrain',
      'getReturnDate',
      'getReturnTime',
      'getProposalBrut',
      'getProposalFormated',
      'getToday',
      'getDateDisplay',
      'getReturnForm',
      'getBookingIsLoading',
      'getProposalSelected',
      'getTravelerData'
    ])
  },
  methods: {
    ...mapActions({
      'updateDevis': actions.EDIT_DEVIS,
      'updateOriginTrain': actions.EDIT_ORIGIN_TRAIN,
      'updateDepartureDate': actions.EDIT_DEPARTURE_DATE,
      'updateDepartureTime': actions.EDIT_DEPARTURE_TIME,
      'updateDestinationTrain': actions.EDIT_DESTINATION_TRAIN,
      'updateReturnDate': actions.EDIT_DATE_ARRIVEE,
      'updateReturnTime': actions.EDIT_RETURN_TIME,
      'submitBookingForm': actions.SUBMIT_BOOKING_FORM,
      'swapOriginDestinationTrain': actions.SWAP_ORIGIN_DESTINATION_TRAIN,
      'updateProposalSelected': actions.EDIT_PROPOSAL_SELECTED
    })
  },
  mounted () {
    const today = new Date()
    let self = this
    // Set semantic ui calendar for the departure data form
    $(this.$el).find('#js-departure-date').calendar({
      type: 'date',
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      firstDayOfWeek: 1,
      formatter: {
        date: function (date) {
          if (!date) return ''
          let day = date.getDate()
          let month = date.getMonth() + 1
          let year = date.getFullYear()
          return day + '/' + month + '/' + year
        }
      },
      onChange: function (date) {
        self.updateDepartureDate(date)
      }
    })
    $(this.$el).find('#js-departure-time').calendar({
      type: 'time',
      text: {
        days: ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'],
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Janvier', 'Février', 'Mars', 'Avril', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      ampm: false,
      minDate: new Date(today.getHours(), today.getMinutes()),
      disableMinute: true,
      onChange (mode) {
        self.updateDepartureTime(mode.getHours())
      },
      formatter: {
        time: function (date) {
          return ('0' + date.getHours()).slice(-2) + 'h'
        }
      }
    })

    // Set semantic ui calendar for the return data from
    $(this.$el).find('#js-return-date').calendar({
      type: 'date',
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      formatter: {
        date: function (date) {
          if (!date) return ''
          let day = date.getDate()
          let month = date.getMonth() + 1
          let year = date.getFullYear()
          return day + '/' + month + '/' + year
        }
      },
      onChange (mode) {
        self.updateReturnDate(mode)
      }
    })
    $(this.$el).find('#js-return-time').calendar({
      type: 'time',
      ampm: false,
      minDate: new Date(today.getHours(), today.getMinutes()),
      disableMinute: true,
      onChange (mode) {
        self.updateReturnTime(mode.getHours())
      },
      formatter: {
        time: function (date) {
          return ('0' + date.getHours()).slice(-2) + 'h'
        }
      }
    })

    // Swap stations feature
    $(this.$el).find('.js-swap-origin-destination-train').click(function () {
      let train = {}
      train.origin = $('.js-destination-train').val()
      train.destination = $('.js-origin-train').val()
      self.swapOriginDestinationTrain(train)
    })

    // Set up first active row
    $('.js-list-devis .menu').first().children().addClass('active')

    // Set devis active on click
    $(this.$el).find('.js-proposal').click(function () {
      // Remove active class from other proposal
      $.each($('.js-list-devis .menu a'), function () {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active')
        }
      })

      // Add class active for the new proposal selected
      $(this).addClass('active')
      let id = $(this).parent().attr('value')
      self.updateProposalSelected(id)
    })

    // Set up all accordions menus
    $('.js-accordion').accordion({exclusive: false})
  }
}
</script>

<style scoped>
  /* Mutual Styles */
  .booking-form,
  .list-devis,
  .proposal-selected {
    padding: 24px 40px;
  }

  #proposal-content {
    margin: 50px 30px 0 30px;
  }

  /* Booking Form */
  input:focus {
    border: 1px solid #01C3A7 !important;
  }

  input {
    border: 1px solid transparent !important;
    color: #323E42 !important;
  }

  .origin-train {
    border-bottom: 1px solid #ECECEC;
  }

  .departure-date {
    border-right: 1px solid #ECECEC !important;
  }

  .swap-button {
    width: 32px;
    height: 32px;
    border: 1px solid #DCE3E6;
    border-radius: 22px;
    cursor: pointer;
  }

  .swap-button:hover {
    background-color: #fcfcfd;
  }

  .swap-button-icon {
    display: block;
    height: 30px;
    background: url('../../assets/swap.svg') center no-repeat;
  }

  .submit-booking-form {
    text-transform: uppercase;
    background-color: #01C3A7;
    color: #FFF;
    margin: 0;
  }

  .submit-booking-form:hover,
  .submit-booking-form:focus {
    background-color: #01aa91;
    border-color: #01aa91;
    color: #FFF;
  }

  /* List Devis */
  .your-travel .ui.label {
    background-color: transparent;
  }

  .your-travel-text {
    color: #13181A;
    font-size: 20px;
  }

  .your-travel .ui.label i {
    color: #13181A;
  }

  .five.wide.column.list-devis .sixteen.wide.column.middle.aligned{
    background-color: transparent;
    color: #059E87;
    cursor: pointer;
  }

  .five.wide.column.list-devis .sixteen.wide.column.middle.aligned:first-child{
    border-bottom: 1px solid #DCE3E6;
  }

  .five.wide.column.list-devis .sixteen.wide.column.middle.aligned:last-child{
    border-top: 1px solid #DCE3E6;
  }

  .five.wide.column.list-devis .sixteen.wide.column.middle.aligned:hover {
    background-color: #fcfcfd;
    color: #059E87;
  }

  .search-result-header i {
    margin: 0;
  }

  .search-result-header span {
    font-size: 13px;
    color: #13181A;
  }

  .search-result-header-date {
    font-size: 17px;
    font-weight: 600;
  }

  .devis-row-container {
    margin: 0;
    padding: 0 !important;
    border: none;
  }

  .devis-row {
    border-top: 1px solid #DCE3E6;
  }

  span {
    font-size: 13px;
  }

  /* Accordion View */
  h3.ui.header,
  h4.ui.header {
    margin: 0;
    display: inline-block;
    color: #21314D;
  }

  h3.ui.header {
    font-size: 18px !important;
  }

  h4.ui.header {
    font-size: 16px !important;
  }

  strong {
    font-weight: bolder;
    color: #323E42;
  }

  .traveler-data span {
    display: block;
  }

  .travel-accordion div:last-child span {
    display: block;
  }

  .first-level-accordion {
    margin: 0 25px;
  }

  .proposal-selected .ui.accordion .sub-accordion .accordion {
    margin-top: 0;
  }

  .second-level-accordion,
  .third-level-accordion{
    margin: 0 25px;
  }

  .proposal-accordion-stations-data,
  .legs-accordion-stations-data,
  .offers-accordion-data,
  .devis-accordion-data{
    border-bottom: 1px solid #DCE3E6;
  }

  .content {
    padding: 0 10px;
  }

  .sub-accordion {
    margin-left: 20px !important;
  }

  .no-padding-left {
    padding-left: 0 !important;
  }
</style>
