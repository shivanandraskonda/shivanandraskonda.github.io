$(".doc-link a").click(function(){
  var items = $(this).parent().parent().find("ul.docs").find("li.doc-hidden");

  var count = 0;
  items.each(function(){
    if(count < 5){
      $(this).removeClass("doc-hidden");
    }
    count++;
  });

  if(items.length <= 5){
    $(this).parent().hide();
  }

});