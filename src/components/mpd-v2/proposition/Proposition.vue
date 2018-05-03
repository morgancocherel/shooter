<template>
    <div class="ui grid proposition-container">
      <div class="sixteen wide column center aligned">
        <h1 class="ui header">Liste des propositions STIF</h1>
      </div>
    </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../store/modules/mpd-v2/proposition/proposition-action-types'

const {mapGetters, mapActions} = createNamespacedHelpers('mpdV2/Proposition')

export default {
  name: 'Proposition',
  computed: {
    ...mapGetters(['getListePropositions'])
  },
  methods: {
    ...mapActions({'submitProposition': actions.EDIT_LISTE_PROPOSITIONS})
  },
  mounted () {
    this.submitProposition()
  }
}
</script>

<style scoped>
  .proposition-container {
    margin: 40px 0 0 0;
    display: inline-flex;
  }
</style>
