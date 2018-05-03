<template>
  <div id="mpd-v2">
    <router-view></router-view>
    <console></console>
    <main-form></main-form>
    <header-top></header-top>
  </div>
</template>

<script>
import Console from '../console/Console'
import HeaderTop from '../header-top/HeaderTop'
import MainForm from '../main-form/MainForm'

export default {
  name: 'mpdV2',
  components: { HeaderTop, Console, MainForm }
}
</script>
