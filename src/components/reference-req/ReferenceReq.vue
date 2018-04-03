<template>
  <div class="ui form container">
    <div class="ui large header">Requête REF</div>
    <button class="ui button" @click="getReferences">Afficher la réponse </button>
    <div class='field'>
      <!--<tree-view :data='allReferences' :options='{maxDepth: 3}'></tree-view>
      <vue-json-pretty :data='allReferences'></vue-json-pretty>-->
    </div>
    <div class="ui large header">Requête COP</div>
    <button class="ui button" @click="getCOP">Afficher la réponse</button>
    <div class="field">
      <tree-view :data='copRequestResponse' :options='{maxDepth: 3}'></tree-view>
    </div>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/reference-req/references-req-action-types'

const {mapActions, mapState} = createNamespacedHelpers('ReferenceReq')

export default {
  components: {
    VueJsonPretty
  },
  name: 'ReferenceReq',
  computed: {
    ...mapState([
      'allReferences',
      'copRequestResponse'
    ])
  },
  methods: {
    ...mapActions({
      'getReferences': actions.GET_REFERENCES,
      'getCOP': actions.GET_COP
    })
  }
}

</script>

<style scoped>
  .allReferencesResponse{ text-align: left; }
</style>
