<template>
  <div class="ui grid main-container">
    <div class="eleven wide column list-proposition-container active-console js-site-content">
      <div class="js-booking-form" style="display: none">
        <devis-form></devis-form>
      </div>
      <div class="ui grid commande-container">
        <div class="sixteen wide column left aligned your-travel">
          <div class="js-result">
          <span>
            Votre trajet {{ proposalSelected.start_point.label | stationFormat }} <span class="unicode">➜</span> {{ proposalSelected.end_point.label | stationFormat }}
          </span>
            <button class="mini ui button" @click="editDevisForm">Modifier la recherche</button>
          </div>
        </div>
        <div class="six wide column list-devis">
          <div class="ui grid segment js-result js-list-devis">
            <div class="eight wide column left aligned search-result-header">
              <i class="calendar alternate outline icon"></i>
              <span class="search-result-header-date">{{ proposalSelected.departure_time.value | dateFormat }}</span>
            </div>
            <div class="four wide column center aligned search-result-header">
              <span>2<sup>nde</sup> classe</span>
            </div>
            <div class="four wide column center aligned search-result-header">
              <span>1<sup>ère</sup> classe</span>
            </div>
            <div class="ui vertical pointing menu sixteen wide column devis-row-container" v-for="prop in proposalBrut" :key="prop.id" :value="prop.id">
              <a class="item" v-bind:class="{ active: prop.proposal.proposalSelected }">
                <div class="ui grid devis-row">
                  <div class="five wide column center aligned middle aligned proposition-time-duration-container js-proposal-no-class">
                    <span>{{ prop.departure_time.text }} <span class="unicode">➜</span> {{ prop.arrival_time.text }}</span>
                    <div class="timeline timeline--animated ember-view"><span class="timeline__label">2h03</span></div>
                  </div>
                  <div class="three wide column center aligned middle aligned js-proposal-no-class">
                    <div title="SNCF" class="train-logo-sncf-monochrome"></div>
                  </div>
                  <div class="four wide column center aligned middle aligned js-set-price js-proposal-second-class second-class">
                    <div class="ui label large devis-price" v-bind:class="{ active: prop.proposal.secondClass.selected }">{{ prop.proposal.secondClass.price | priceFormat }}</div>
                  </div>
                  <div class="four wide column center aligned middle aligned js-set-price js-proposal-first-class first-class">
                    <div class="ui label large devis-price" v-bind:class="{ active: prop.proposal.firstClass.selected }">{{ prop.proposal.firstClass.price | priceFormat }}</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="ten wide column left aligned devis-selected">
          <div class="ui accordion segment js-result js-accordion">
            <div class="title active">
              <i class="dropdown icon"></i>
              <h3 class="ui header">Trajet</h3>
            </div>
            <div class="content active first-level-accordion">
              <div class="ui grid travel-accordion">
                <div class="one wide column center aligned no-padding-left"><i class="user icon"></i></div>
                <div class="seven wide column traveler-data" v-for="voyageurs in proposalSelected.voyage.voyageurs" :key="voyageurs.id">
                  <span>{{ voyageurs.num}} Passager</span>
                  <span>{{ voyageurs.typologie }} de {{ voyageurs.age }} ans, sans carte</span>
                  <span>Valable sur TER uniquement pour la date de voyage choisie. Billet non-échangeable et non-remboursable.</span>
                </div>
                <div class="one wide column center aligned"><i class="train icon"></i></div>
                <div class="one wide column">
                  <h5 class="ui header">{{ proposalSelected.departure_time.text }}</h5>
                  <h5 class="ui header">{{ proposalSelected.arrival_time.text }}</h5>
                </div>
                <div class="two wide column">
                  <h5 class="ui header">{{ proposalSelected.start_point.label }}</h5>
                  <h5 class="ui header">{{ proposalSelected.end_point.label }}</h5>
                </div>
                <div class="four wide column center aligned middle aligned" v-for="segment in proposalSelected.voyage.itineraireAller.segments" :key="segment.id">
                  <span>{{ proposalSelected.duration.value | durationFormat }}</span>
                  <span>{{ segment.libelleEquipement }} {{ segment.numTrain }} | 2<sup>e</sup> class</span>
                </div>
              </div>
            </div>
            <div class="title">
              <i class="dropdown icon"></i>
              <h3 class="ui header">Proposition</h3>
            </div>
            <div class="content">
              <div class="ui grid first-level-accordion commande-accordion-stations-data">
                <div class="one wide column no-padding-left"></div>
                <div class="one wide column"><strong>Texte</strong></div>
                <div class="four wide column"><b>Valeur</b></div>
                <div class="two wide column"><b>Label</b></div>
                <div class="two wide column"><b>RR code</b></div>
                <div class="two wide column"><b>UIC code</b></div>
                <div class="four wide column"><b>Coordonnées</b></div>
                <div class="one wide column no-padding-left"><b>Départ</b></div>
                <div class="one wide column">{{ proposalSelected.departure_time.text }}</div>
                <div class="four wide column">{{ proposalSelected.departure_time.value }}</div>
                <div class="two wide column">{{ proposalSelected.start_point.label }}</div>
                <div class="two wide column">{{ proposalSelected.start_point.rr_code }}</div>
                <div class="two wide column">{{ proposalSelected.start_point.uic_code }}</div>
                <div class="four wide column">[{{ proposalSelected.start_point.coordinates.latitude }}, {{ proposalSelected.start_point.coordinates.longitude }}]</div>
                <div class="one wide column no-padding-left"><b>Arrivée</b></div>
                <div class="one wide column">{{ proposalSelected.arrival_time.text }}</div>
                <div class="four wide column">{{ proposalSelected.arrival_time.value }}</div>
                <div class="two wide column">{{ proposalSelected.end_point.label }}</div>
                <div class="two wide column">{{ proposalSelected.end_point.rr_code }}</div>
                <div class="two wide column">{{ proposalSelected.end_point.uic_code }}</div>
                <div class="four wide column">[{{ proposalSelected.end_point.coordinates.latitude }}, {{ proposalSelected.end_point.coordinates.longitude }}]</div>
                <div class="sixteen wide column"></div>
                <div class="two wide column no-padding-left"><b>Durée texte</b></div>
                <div class="four wide column">{{ proposalSelected.duration.text }}</div>
                <div class="three wide column"><b>Durée valeur</b></div>
                <div class="four wide column">{{ proposalSelected.duration.value }}</div>
              </div>
              <div class="ui grid first-level-accordion ">
                <div class="three wide column no-padding-left"><b>Authorities ids</b></div>
                <div class="two wide column">{{ proposalSelected.authorities_ids[0] }}</div>
                <div class="three wide column"><b>Carbon footprint</b></div>
                <div class="two wide column">{{ proposalSelected.carbon_footprint }}</div>
                <div class="three wide column"><b>Feasible</b></div>
                <div class="three wide column left aligned">{{ proposalSelected.feasible }}</div>
                <div class="three wide column no-padding-left"><b>Most bike</b></div>
                <div class="two wide column">{{ proposalSelected.most_bike }}</div>
                <div class="three wide column"><b>Most walk</b></div>
                <div class="two wide column">{{ proposalSelected.most_walk }}</div>
                <div class="three wide column"><b>Type</b></div>
                <div class="three wide column left aligned">{{ proposalSelected.type }}</div>
              </div>
            </div>
            <div class="title">
              <i class="dropdown icon"></i>
              <h3 class="ui header">Legs</h3>
            </div>
            <div class="content">
              <div class="ui grid first-level-accordion legs-accordion-stations-data" v-for="leg in proposalSelected.legs" :key="leg.id">
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
                    <div class="five wide column">{{ proposalSelected.voyage.itineraireAller.dateDepart }}</div>
                    <div class="three wide column"><b>Id Itinéraire</b></div>
                    <div class="five wide column">{{ proposalSelected.voyage.itineraireAller.idItineraire }}</div>
                    <div class="three wide column no-padding-left"><b>Date Arrivée</b></div>
                    <div class="five wide column">{{ proposalSelected.voyage.itineraireAller.dateArrivee }}</div>
                    <div class="three wide column"><b>Id Itinéraire sens</b></div>
                    <div class="five wide column">{{ proposalSelected.voyage.itineraireAller.idItineraireSens }}</div>
                    <div class="three wide column"></div>
                    <div class="five wide column"><b>UIC</b></div>
                    <div class="eight wide column"></div>
                    <div class="three wide column no-padding-left"><b>Origine</b></div>
                    <div class="five wide column">{{ proposalSelected.voyage.itineraireAller.origine.uic }}</div>
                    <div class="eight wide column"></div>
                    <div class="three wide column no-padding-left"><b>Destination</b></div>
                    <div class="five wide column">{{ proposalSelected.voyage.itineraireAller.destination.uic }}</div>
                    <div class="eight wide column"></div>
                  </div>
                  <div class="accordion sub-accordion">
                    <div class="title">
                      <i class="dropdown icon"></i>
                      <h4 class="ui header">Segments</h4>
                    </div>
                    <div class="content">
                      <div class="ui grid second-level-accordion" v-for="segment in proposalSelected.voyage.itineraireAller.segments" :key="segment.id">
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
                  <div class="ui grid second-level-accordion offers-accordion-data" v-for="offre in proposalSelected.voyage.offres" :key="offre.id">
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
                    <div class="two wide column">{{ proposalSelected.voyage.voyageurs[0].age }}</div>
                    <div class="three wide column"><b>Numéro</b></div>
                    <div class="two wide column">{{ proposalSelected.voyage.voyageurs[0].num }}</div>
                    <div class="three wide column"><b>Typologie</b></div>
                    <div class="two wide column">{{ proposalSelected.voyage.voyageurs[0].typologie }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="ui grid">
              <div class="sixteen wide column right aligned">
                <button @click="addToBasket"  class="ui button add-to-basket" v-bind:class="{ loading: devisButtonIsLoading }">Choisir ({{ priceSelected | priceFormat }})</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <console></console>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import $ from 'jquery'
import * as actions from '../../../store/modules/mpd-v1/devis/devis-action-types'
import DevisForm from '../devis/DevisForm'
import filters from '../../../mixins/filters'
import Console from '../../console/Console'

const {mapState, mapActions} = createNamespacedHelpers('mpdV1/devis')

export default {
  name: 'devis',
  mixins: [filters],
  components: {Console, DevisForm},
  computed: {
    ...mapState([
      'proposalBrut',
      'proposalSelected',
      'priceSelected',
      'devisButtonIsLoading',
      'priceFormated'
    ])
  },
  methods: {
    ...mapActions({
      'updateProposalSelected': actions.EDIT_PROPOSAL_SELECTED,
      'updatePriceSelected': actions.EDIT_PRICE_SELECTED,
      'addToBasket': actions.ADD_TO_BASKET
    }),
    editDevisForm: function () {
      // Display booking form on click
      $('.js-booking-form').slideToggle()
    }
  },
  mounted () {
    let self = this

    // Set travel active on click
    function setProposalSelected (el, classSelected) {
      let data = {}
      data.id = el.parent().parent().parent().attr('value')
      data.classSelected = classSelected
      self.updateProposalSelected(data)
    }

    $(this.$el).find('.js-proposal-no-class').click(function () {
      setProposalSelected($(this), 'no class')
    })

    $(this.$el).find('.js-proposal-first-class').click(function () {
      setProposalSelected($(this), 'PREMIERE')
    })

    $(this.$el).find('.js-proposal-second-class').click(function () {
      setProposalSelected($(this), 'DEUXIEME')
    })

    // Set up all accordions menus
    $('.js-accordion').accordion({exclusive: false})

    $('.js-submit-booking-form').click(function () {
      $('.js-booking-form').hide()
    })
  }
}
</script>

<style scoped>
  /* Mutual Styles */
  .main-container {
    margin: 0 !important;
  }

  .list-proposition-container {
    padding: 0 !important;
    margin-top: 40px;
  }

  .list-proposition-container.active-console {
    padding-right: 20px !important;
  }

  .list-proposition-container .ui.grid {
    margin: 0;
  }

  .commande-container {
    margin: 40px 0 0 0;
    display: inline-flex;
  }

  .your-travel,
  .list-devis{
    padding: 14px 20px !important;
  }

  .no-content-commande,
  .devis-selected {
    padding: 14px 20px !important;
  }

  .segment {
    border: 1px solid #DCE3E6;
    box-shadow: none;
  }

  .hide {
    display: none;
  }

  /* List Devis */
  .ui.grid.segment {
    margin: 0;
  }

  .your-travel span {
    text-rendering: optimizeLegibility;
    color: #13181A;
    font-weight: 600;
    font-size: 18px;
  }

  .your-travel i {
    color: #13181A;
    margin: 0 0 5px 0;
  }

  .your-travel button {
    margin: 0 0 0 10px;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    border: 1px solid #8C9DA1;
    background-color: #8C9DA1;
    color: #FFF;
    padding: 6px 10px;
    vertical-align: text-bottom;
  }

  .your-travel button:hover,
  .your-travel button:focus{
    border-color: #7E9196;
    background-color: #7E9196;
    color: #FFF;
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
    font-size: 14px;
  }

  .search-result-header-date {
    font-weight: 400;
  }

  .devis-row-container {
    margin: 0;
    padding: 0 !important;
    border: none;
  }

  .devis-row-container a.item {
    padding: 0 !important;
  }

  .devis-row {
    border-top: 1px solid #DCE3E6;
  }

  span {
    font-size: 13px;
  }

  .proposition-time-duration-container span {
    font-weight: 600;
  }

  .proposition-time-duration-container div {
    color: #8C9DA1;
    font-size: 13px;
  }

  .unicode {
    font-weight: normal;
    color: #C0C9CC;
  }

  .train-logo-sncf-monochrome {
    height: 18px;
    background: url('../../../assets/sncfIcon.svg') no-repeat center center;
  }

  .devis-price {
    padding: 17px 15px;
    background-color: transparent;
    white-space: nowrap;
    font-size: 15px;
  }

  .devis-price.active {
    color: #FFF;
    background-color: #01C3A7;
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

  .proposal-selected .ui.accordion .sub-accordion {
    margin-top: 0;
  }

  .second-level-accordion {
    margin: 0 25px;
  }

  .commande-accordion-stations-data,
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

  .add-to-basket {
    background-color: #01C3A7;
    color: #FFF;
    padding: 12px 22px;
    border-radius: 0.3125em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .add-to-basket:hover,
  .add-to-basket:focus {
    background-color: #01aa91;
    border-color: #01aa91;
    color: #FFF;
  }
</style>
