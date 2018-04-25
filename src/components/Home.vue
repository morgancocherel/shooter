<template>
  <div>
    <console></console>
    <header-top></header-top>
    <main-form></main-form>
    <devis-form></devis-form>
  </div>
</template>

<script>
import devisForm from './devis/DevisForm'
import HeaderTop from './header-top/HeaderTop'
import MainForm from './main-form/MainForm'
import Console from './console/Console'

export default {
  components: {
    Console,
    devisForm,
    HeaderTop,
    MainForm
  },
  name: 'Home'
}
</script>
