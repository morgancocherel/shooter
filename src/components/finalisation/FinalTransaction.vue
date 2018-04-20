<template>
  <div>
    <sidebar></sidebar>
    <header-top></header-top>
    <main-form></main-form>
    <div class="ui grid container">
      <div class="sixteen wide column left aligned final-transaction-title">
        <h3 class="ui header">Confirmation de votre voyage</h3>
        <p>Un email a été ennvoyé à {{ getEmailTravelerContact }} contenant l'ensemble des informations de votre trajet.</p>
      </div>
      <div class="sixteen wide column left aligned">
        <div class="ui accordion segment js-accordion">
          <div class="title">
            <i class="dropdown icon"></i>
            <h3 class="ui header">Commande</h3>
          </div>
          <div class="content first-level-accordion">
            <div class="ui grid">
              <div class="two wide column"><strong>Id commande</strong></div>
              <div class="two wide column">{{ getFinalData.idCommande }}</div>
              <div class="two wide column"><strong>Statut</strong></div>
              <div class="two wide column">{{ getFinalData.statut }}</div>
              <div class="two wide column"><strong>Montant</strong></div>
              <div class="four wide column left aligned">{{ getFinalData.montant }}</div>

              <div class="two wide column"><strong>Référence</strong></div>
              <div class="two wide column">{{ getFinalData.reference }}</div>
              <div class="two wide column"><strong>Nom Référence</strong></div>
              <div class="two wide column">{{ getFinalData.nomReference }}</div>

              <div class="title">
                <i class="dropdown icon"></i>
                <h3 class="ui header">Voyage</h3>
              </div>
              <div class="content second-level-accordion">
                <div class="ui grid">
                  <div class="two wide column"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>{{ getFinalData }}</div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import HeaderTop from '../header-top/HeaderTop'
import MainForm from '../main-form/HeaderDown'
import Sidebar from '../console/Sidebar'
import $ from 'jquery'

const { mapGetters } = createNamespacedHelpers('Finalisation')

export default {
  name: 'Finalisation',
  components: {Sidebar, MainForm, HeaderTop},
  computed: {
    ...mapGetters([
      'getFinalData',
      'getEmailTravelerContact'
    ])
  },
  mounted () {
    // Set up all accordions menus
    $('.js-accordion').accordion({exclusive: false})
  }
}
</script>

<style scoped>
  .final-transaction-title h3{
    color: #13181A;
    font-size: 20px !important;
    font-weight: 600;
  }

  .final-transaction-title p {
    color: #323E42;
    font-size: 17px;
  }

  /* Accordion View */
  h3.ui.header {
    margin: 0;
    display: inline-block;
    color: #21314D;
  }

  .first-level-accordion {
    margin: 0 25px;
  }

  .second-level-accordion {
    margin: 0 25px;
  }
</style>
