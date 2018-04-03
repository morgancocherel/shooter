<template>
  <div>
    <header-top></header-top>
    <header-down></header-down>
    <booking-form></booking-form>
    <sidebar></sidebar>
  </div>
</template>

<script>
import BookingForm from './booking/BookingForm'
import Sidebar from './all-request/Sidebar'
import HeaderTop from '../components/HeaderTop'
import HeaderDown from './main-form/HeaderDown'

export default {
  components: {
    BookingForm,
    Sidebar,
    HeaderTop,
    HeaderDown
  },
  name: 'Home'
}
</script>
