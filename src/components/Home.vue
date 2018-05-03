<template>
  <div class="ui container">
    <h1>Shooter MPD</h1>
    <p>
      Bienvenue sur le Shooter MPD, clicker sur le service que vous voulez tester et laissez vous guider.
    </p>
    <table class="ui table">
      <thead>
      <tr><th class="eight wide">MPD-V1</th>
        <th class="eight wide">MPD-V2</th>
      </tr></thead>
      <tbody>
      <tr>
        <td><router-link to="/mpdV1/devis/devisForm">Parcours avec CTO (consulter les trajets et offres)</router-link></td>
        <td><router-link to="/mpdV2/propositions/catalogues">Liste des propositions mise à disposition</router-link></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
