const Store = require('electron-store');
const store = new Store();

function initUsersDb() {
  store.set('Users', []);
}

function createUser(build) {
  let users = store.get('Users');
  let key = uniqueKey(users);
  build["id"] = key;
  users.push(build);
  store.set('Users', users);
  //Refresh lists of users
  listUsers();
}

function removeUser(id) {
  console.log('remove')
  let users = store.get('Users');
  store.delete('Users#'+id);
  console.log(users)
  let updatedUsersList = $.grep(users, function (e) {
    return e.id != id;
  });
  store.set('Users', updatedUsersList);
  listUsers();
}


function collectData(id) {
  let build = {};
  $("#" + id).children(".field").each(function () {
    let label = $(this).attr("data-field");
    let value = $(this).find('input, select').val();
    build[label] = value;
  });
  // TODO Vérification des champs avant de créer
  createUser(build);
}



function listUsers(){
  let users = store.get('Users');
  $('[data-listUsers]').empty();
  for (let i = 0; i < users.length; i++) {
    $('[data-listUsers]').append(`
      <li data-id="${users[i].id}" >
        <span onclick="removeUser('${users[i].id}')">
          <img class="icon" src="../images/delete.svg">
        </span>
        <span data-router="dataUser#${users[i].id}">
        ${users[i].name} ${users[i].firstname}
        </span> 
        
      </li>
    `);
  }
}
listUsers();


function urlAnalizer(){
  let path= window.location.href;
  let id = path.split('?');
  if(typeof id[1] !== 'undefined'){
    userInfos(id[1]);
  }
}
urlAnalizer();

function userInfos(id){
  let users = store.get('Users');
  let userinfos;
  for (let i = 0; i < users.length; i++) {
    if(users[i].id == id){
      userinfos = users[i];
    }
  }

  userDraw(userinfos);
  getUserFiles(userinfos.id)

}

function userDraw(userinfos){
  $("[data-user-name]").text(userinfos.name + " " +userinfos.firstname);
  $("[data-user-id]").attr('data-user-id', `${userinfos.id}`);
}

function getUserFiles(id){
  // store.delete('Users#'+id);
  let user = store.get('Users#'+id);
  if(typeof user !== 'undefined'){
    // Utilisateur existe.

    console.log(user);
    // console.log(user[0].files[0].type == "Anamnèse");
    if(user[0].files == 0){
      injectForm("start");
    }else{
      if(user[0].files[0].type == "Anamnèse"){
        for (e in user[0].files[0].data) {
          $('.datas').append(`<li>${e} : ${user[0].files[0].data[e]}</li>`);
        }
      }
    }


    for (let i = 0; i < user[0].files.length; i++) {
      $('.files').append(`
      <li>
        ${user[0].files[i].type} |
        ${user[0].files[i].date} |
        ${user[0].files[i].note} |
        ${user[0].files[i].invoice} |
        ${user[0].files[i].paid} |
        ${user[0].files[i].docs}
      </li>
      `);
    }

  }else{
    console.log("Utilisateur inexistant");

    //Définition de la structure minimum
    store.set('Users#'+id, [{
      "id" : id,
      "files" : []
    }]);

    // arg pas utilisé.
    injectForm("start");

  }
}

function injectForm(idForm){
  form(idForm);
}

function collectDataForFile(idForm) {
  let build = {};
  $('.forms').find('#'+idForm).children(".field").each(function () {
  let label = $(this).attr("data-field");
  let value = $(this).find('input, select').val();
  build[label] = value;
  });
  // TODO Vérification des champs avant de créer
  newFile(build);
}

function newFile(build){
  let id = $("[data-user-id]").attr("data-user-id");
  let user = store.get('Users#'+id);

  let key = keyGenerator(20);
 
  //Faire une fonction 
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;

  user[0].files.push(
    {
      "id" : key,
      "type" : "Anamnèse",
      "date" : today,
      "note" : "note...",
      "invoice" : true,
      "paid" : false,
      "docs" : "texte...",
      "data" : build
    }
  );

  store.set('Users#'+id, user);
}
