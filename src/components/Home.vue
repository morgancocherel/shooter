<template>
  <div>
    <sidebar></sidebar>
    <header-top></header-top>
    <main-form></main-form>
    <div class="pusher">
      <devis-form></devis-form>
    </div>
  </div>
</template>

<script>
import devisForm from './devis/devisForm'
import HeaderTop from './header-top/HeaderTop'
import MainForm from './main-form/HeaderDown'
import Sidebar from './console/Sidebar'

export default {
  components: {
    Sidebar,
    devisForm,
    HeaderTop,
    MainForm
  },
  name: 'Home'
}
</script>
