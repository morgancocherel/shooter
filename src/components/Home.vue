<template>
  <div>
    <sidebar></sidebar>
    <header-top></header-top>
    <username></username>
    <devis-form></devis-form>
  </div>
</template>

<script>
import devisForm from './devis/devisForm'
import HeaderTop from './header-top/HeaderTop'
import Username from './main-form/Username'
import Sidebar from './console/Sidebar'

export default {
  components: {
    Sidebar,
    devisForm,
    HeaderTop,
    Username
  },
  name: 'Home'
}
</script>
