$(document).ready(function () {

    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    if (isMobile) {
        window.scrollTo({ top: 20 });

    } else {
        var contentDp = 3;
    }

    login();
})

function login() {
    $('#login').unbind('submit').on('submit', function (e) {
        e.preventDefault();

        var form_data = new FormData();
        var email = $('#emailaddress').val().trim();
        var password = $('#password').val().trim();
        if (email.length > 0 && password.length > 0) {      
            form_data.append('email', email);
            form_data.append('password', password);
            form_data.append('key', 'login-admin');    
        }

       
        
        $.ajax({
            url: 'admin/servers/server.php',
            type: 'post',
            data: form_data,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (item) {
                console.log(item)
                if(item['info'].length>0){
                    console.log("error")
         

                }else if(item['admin'].length>0){
                    location.href="admin.html";

                }
            
            }
        })



        console.log(form_data)

        // form_data.append('artwork', artwork[0]);
        // form_data.append('audio', audio[0]);

        // alert()
    })
}