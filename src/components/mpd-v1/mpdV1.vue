<template>
    <div id="mpd-v1">
      <router-view></router-view>
      <console></console>
      <main-form></main-form>
      <header-top></header-top>
    </div>
</template>

<script>
import devisForm from './devis/DevisForm'
import Console from '../console/Console'
import HeaderTop from '../header-top/HeaderTop'
import MainForm from '../main-form/MainForm'

export default {
  name: 'mpdV1',
  components: { HeaderTop, Console, devisForm, MainForm }
}
</script>
