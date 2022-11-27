$(document).on("click","form.contact-form button[type=submit]",function(e){
  if ($("#contact-form").valid()) {
    e.preventDefault();

    var form = jQuery(this).parents("form:first");
    var dataString = form.serialize();
    $('#submit-btn').css('display','none');
        $("#loading").css("display","block");
    
        var action = base_url+'/submit-contact-form';
        $.ajax({
            type: "POST",
            url: action,
            data: dataString,
            success : function(data){
                data = JSON.parse(data);
                if(data.success){    
                    alert(data.message);
                    $("#submit-btn").css('display','block');
                    $("#loading").css("display","none");
                    document.getElementById('contact-form').reset();
                } else {
                  $("#submit-btn").css('display','block');
                  $("#loading").css("display","none");
                  alert(data.message);
                }
           
            }
        });
  }
});