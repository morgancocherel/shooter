<template>
  <div>
    <header-top></header-top>
    <header-down></header-down>
    <booking-form></booking-form>
    <reference-req></reference-req>
    <sidebar></sidebar>
  </div>
</template>

<script>
import BookingForm from './booking-form/BookingForm'
import Sidebar from './Sidebar'
import HeaderTop from '../components/HeaderTop'
import HeaderDown from './main-form/HeaderDown'
import ReferenceReq from './reference-req/ReferenceReq'

export default {
  components: {
    BookingForm,
    Sidebar,
    HeaderTop,
    HeaderDown,
    ReferenceReq
  },
  name: 'Home'
}
</script>
