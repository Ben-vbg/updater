
$( document ).on( "click", "[data-router]", function () {
  let destination = $(this).data("router").split("#");
  let page = destination[0];
  let id = destination[1];
  router(page, id);
} );

function router(page, id){
  if(typeof id !== 'undefined'){
    window.location.replace("./" + page + ".html?" + id);
  }else{
    window.location.replace("./" + page + ".html");
  }
  
}
