<template>
    <div id="mpd-v1">
      <router-view></router-view>
      <main-form></main-form>
      <header-top></header-top>
    </div>
</template>

<script>
import HeaderTop from '../header-top/HeaderTop'
import MainForm from '../main-form/MainForm'

export default {
  name: 'mpdV1',
  components: { HeaderTop, MainForm }
}
</script>
