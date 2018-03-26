<template>
  <div class="ui form container">
    <div class="ui large header">Produits</div>
    <button class="ui button" @click="getReferences">Afficher les produits</button>
    <div class="field">
      <label>Réponse</label>
      <textarea></textarea>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/reference-req/references-req-action-types'

const {mapActions, mapState} = createNamespacedHelpers('ReferenceReq')

export default {
  name: 'ReferenceReq',
  computed: {
    ...mapState([
      'references'
    ])
  },
  methods: {
    ...mapActions({
      'getReferences': actions.GET_REFERENCES
    })
  }
}
</script>
