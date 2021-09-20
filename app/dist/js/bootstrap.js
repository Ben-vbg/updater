function uniqueKey(users) {
  let key = keyGenerator(20);
  for (let i = 0; i < users.length; i++) {
    if(key == users[i].id){
      i = 0;
      key = keyGenerator(20);
    }
  }
  return key;
}


function keyGenerator(length){
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}
