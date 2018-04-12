<template>
  <div>
    <sidebar></sidebar>
    <header-top></header-top>
    <header-down></header-down>
    <div class="pusher">
      <booking-form></booking-form>
    </div>
  </div>
</template>

<script>
import BookingForm from './booking/BookingForm'
import HeaderTop from '../components/HeaderTop'
import HeaderDown from './main-form/HeaderDown'
import Sidebar from './console/Sidebar'

export default {
  components: {
    Sidebar,
    BookingForm,
    HeaderTop,
    HeaderDown
  },
  name: 'Home'
}
</script>
