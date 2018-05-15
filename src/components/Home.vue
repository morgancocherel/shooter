<template>
  <div class="ui container">
    <h1 class="ui header">Shooter MPD</h1>
    <p>
      Bienvenue sur le Shooter MPD, choisissez la version à tester et laissez vous guider.
    </p>
    <div class="ui grid">
      <div class="eight wide column center home-container">
        <div class="title-icon-container">
          <h1 class="ui header home-title">MPD v1</h1>
          <div class="home-icon">+</div>
        </div>
      </div>
      <div class="eight wide column center home-container">
        <div class="title-icon-container">
          <h1 class="ui header home-title">MPD v2</h1>
          <div class="home-icon">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .home-container {
    height: 400px;
    padding: 0 !important;
  }

  .home-icon {
    font-size: 70px;
    font-weight: 100;
  }

  .home-title {
    font-size: 50px !important;
    font-weight: 800;
  }
</style>
