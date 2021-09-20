function form(f){
  console.log('form create')
  $('.forms').append(`

  <p>Ce patient n'a pas encore de documents. <br>Complétez ses informations de bases pour commencer</p>
  <div id="f1">
    <div class="field" data-field="poids">
      <input type="text" placeholder="Poids">
    </div>
    <div class="field" data-field="taille">
      <input type="text" placeholder="Taille">
    </div>
    <div class="field" data-field="mg">
      <input type="text" placeholder="Masse graisseuse">
    </div>
    <div class="field" data-field="eau">
      <input type="text" placeholder="Eau">
    </div>
    <div class="field" data-field="mm">
      <input type="text" placeholder="Masse musculaire">
    </div>
    <div class="field" data-field="os">
      <input type="text" placeholder="Os">
    </div>
  </div>
  <button onclick="collectDataForFile('f1')">Sauvegarder</button>
  `);
}