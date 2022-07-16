var agentACCOUNT = true;
$(window).ready(function () {

  

    // user();
    // my_agents();
    notifications();

    $('.back-home-1').on('click', function () {

        $('.home-2-nav-btn').hide();
        $('.agent-artist-activities').hide();
        // my_agents();
        $('.home-nav-btn').show();
        $('.home-activities').show();

    })


    $('.back-home-2').on('click', function () {

        notifications()
        $('.home-2-nav-btn').show();
        $('.home-3-nav-btn').hide();
        $('.agent-artist-activities').show();
        $('.agent-container').show();
        $('.view-artist-1').html("");
        $('.artist-add-btn').hide('');

        if (agentACCOUNT == true) {
            $('.profile-agent-2').html('');
        }

    })


    $('.agent-artist-btn').on('click', function () {
        $('.home-activities').hide();

        preloader('donat-chart');
        // back btns
        $('.home-nav-btn').hide();
        $('.home-2-nav-btn').show()

        $('.agent-artist-activities').show();
        // $('.view-artist-1').html("");
        $('.agent-container').show();

        // my_agents();

    });


    // page back
    $('.back-home-3').on('click', function () {


        if (agentACCOUNT == true) {

            $("#page-playing").html(`
                                            <div class="spinner">
                                                <div class="spinner-border text-primary center" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </div>`)


            $('.page-activities').hide();


            $('.agent-artist-activities').show();
            $('.home-3-nav-btn').show()
            $('.agent-container').hide();
            $('.artist-container').show();
            $('#music-list').html('');
            // alert(agentIDGLO)
            var agent_id = agentIDGLO;
            my_artists(agent_id);
        } else {
            $('.home-activities').hide();
            $('.page-activities').hide();
            notifications();
            // my_agents();

            // back btns
            $('.home-nav-btn').hide();
            $('.home-2-nav-btn').show()

            $('.agent-artist-activities').show();
            $('.view-artist-1').html("");
            $('.agent-container').show();

        }

    })


    // image preview
    $('#artwork-music').change(function () {
        readURL(this);
    })
})


function user() {
    let key = "admin-auth-state";
    var request = $.ajax({url: "admin/servers/server.php", type: "POST", data: {
            key
        }, dataType: "json"});
    request.done(function (response) {
        console.log(response)
        if (response['info'].length == 0) {
            agentACCOUNT = response['admin-position'];
            var src = `assets/images/${
                response['admin-dp']
            }`;
            $('#admin-dp').attr({'src': src});
            $('.agent-name').html(response['admin']);
            logout();
            // my_agents();
            notifications();


            var agent_idSS = response['admin-id'];


        } else {
            location.href = `login.html`;
        }


    })
}


// logout
function logout() {

    $('.sign-out').unbind('click').on('click', function (e) {

        e.preventDefault()

        let key = "log-out";
        var request = $.ajax({url: "admin/servers/server.php", type: "POST", data: {
                key
            }, dataType: "json"});
        request.done(function (response) {
            console.log(response)
            if (response == true) {
                location.href = `login.html`;
            } else {
                alert('Failed to logout please contact administration')
            }
        })

    })

}


function notifications() {

    let key = "notification";
    var request = $.ajax({url: "admin/servers/server.php", type: "POST", data: {
            key
        }, dataType: "json"});
    request.done(function (data) {

        console.log(data)
        $('.notification-list').html('');
        $('.notification-value').html(data.length);

        $.each(data, function (key, item) {
            $('.notification-list').append(`

                <div class="d-flex justify-content-between border-bottom mt-1 p-0 page-select"  >

                <input type="hidden" class="folder-id" value="${
                item['page_id']
            }">
                                          <input type="hidden" class="folder-name" value="${
                item['artist_name']
            }">
                                          <input type="hidden" class="song-title" value="${
                item['song_title']
            }">
                    <div class="not-img">
                    <img src="assets/images/${
                item['artwork']
            }" height="40px" width="40px" class="rounded-circle float-right" alt="...">
                    </div>
                    <div class="p-1"></div>
                    <div class="not-msg">
                        <p class="p-0 font-11 text-black">New song by <span class="bold-text">${
                item['artist_name']
            }</span>  <span class="text-danger">title</span> <span class="text-primary">${
                item['song_title']
            }</span></p>
                    </div>

                  </div>
            
            
            `)
        })

        // console.log(data)

        SETpage_session()


    })


}


function scrollers() {}


// function my_agents() {


//     let key = "my_agentsk";
//     var request = $.ajax({url: "admin/servers/server.php", type: "POST", data: {

//             key
//         }, dataType: "json"});
//     request.done(function (data) {

//         console.log(data)

//         // $(".current-month").html(num_songs = data[0]['month']);
//         // $("#price").attr({
//         //     value: 'MK' + data[0]['monthly_price'] + '.00'
//         // });
//         // $("#agent-rate").attr({value: data[0]['agent_rate'] * 100 + '%'
//         // });
//         // $("#prize-rate").attr({value: data[0]['prize_rate'] * 100 + '%'
//         // });


//         // console.log(data);
//         // $('#total-audios').html(`${
//         //     Intl.NumberFormat('en-US').format(data[0]['total_amount_uploaded_pending'])
//         // }.00`);
//         // $('#uploaded-amount').html(`${
//         //     Intl.NumberFormat('en-US').format(data[0]['total_amount_uploaded'])
//         // }.00`);
//         // $('#pending-amount').html(`${
//         //     Intl.NumberFormat('en-US').format(data[0]['pending_amount'])
//         // }.00`);

//         if (true == true) {
//             var item = data[0];
//             // profile 1;
//             $('.agent-profile').html(`

//                 <div class="rounded-top  bg-transparent position-relative mt-3" style=" background-image: url('assets/images/avatar-the-last-airbender-13608-1920x1200.jpg');background-size: cover; height:100px; padding-top:70px;">
//                     <img src="assets/images/${
//                 item['admin_agent_image']
//             }" class="rounded-circle img-thumbnail " style="width: 80px; height: 80px; margin-left: 7px;">
//                     <div class="position-absolute bottom-0 end-0    text-white d-flex">

//                         <div class="circle-sm bg-primary p-1 center"><i class="fas fa-users"></i><br><span class="text-dark center  border-bottom">${
//                 item['num_artists']
//             }</span></div>
//                         <div class="circle-sm bg-primary p-1 center"><span class="${blink}"><i class="fa fa-hourglass-half"></i> </span><br><span class="text-dark center border-bottom">${
//                 item['pending']
//             }</span></div>
//                         <div class="circle-sm bg-primary p-1 center"><i class="fas fa-check"></i><br><span class="text-dark center border-bottom">${
//                 item['agent_total_uploads'] - item['pending']
//             }</span></div>
//                         <div class="circle-sm bg-primary p-1 center"><i class="fas fa-cloud-upload-alt"></i> <br><span class="text-dark center border-bottom">${
//                 item['agent_total_uploads']
//             }</span></div>


//                     </div>

//                     <div class="position-absolute name-hagging  p-1  ">MK<span class="bulk-commission">${
//                 Intl.NumberFormat('en-US').format(item['commission_gain'])
//             }.00</span></div>
//                 </div>


//                 <div class="w-100 center d-none" >
//                     <button class="btn btn-primary mt-2 view-artists"  value="${
//                 item['id_admins_agents']
//             }">VIEW ARTISTS</button>
//                 </div>


//             `);

//             $.each(data, function (key, item) {


//                 console.log(item)


//                 if (item['pending'] == 0) {
//                     var blink = 'text-white'
//                 } else {
//                     var blink = 'blink text-danger';
//                 }

//                 $('.agent-artist').append(`

//                               <div class="col-lg-6 w-100 view-artists">

//                               <div class="d-flex mb-3 ">

//                                  <div class="card p-0 mb-0  page-ss border border-2 view-artists" style="width: 15rem">

//                                       <input type="hidden" class="agent-id" value="${
//                     item['id_admins_agents']
//                 }">
//                                       <input type="hidden" class="profile-image" value="${
//                     item['admin_agent_image']
//                 }">
//                                       <input type="hidden" class="agent-name" value="${
//                     item['admin_agent_name']
//                 }">
//                                       <input type="hidden" class="commission" value="${
//                     item['commission_gain']
//                 }">
//                                       <input type="hidden" class="num-artists" value="${
//                     item['num_artist']
//                 }">
//                                       <input type="hidden" class="pending" value="${
//                     item['num_pending']
//                 }">
//                                       <input type="hidden" class="total-uploaded" value="${
//                     item['total_audios']
//                 }">


//                                        <div class="card-body bg-light-grey p-0 position-relative center " style="background-image: url('assets/images/${
//                     item['admin_agent_image']
//                 }');background-size: cover; height: 60px; ">


//                                        </div>
//                                    </div>

//                                    <div class="p-1"></div>


//                                    <div class="w-100 border-bottom">


//                                         <div class="d-flex justify-content-between">
//                                             <h6 class="bg-white border-0 left">${
//                     item['admin_agent_name']
//                 }


//                                             </h6>
//                                             <div class="d-flex">
//                                             <h5><i class="far fa-star text-warning"></i></h5>
//                                             <h5><i class="far fa-star text-warning"></i></h5>
//                                             <h5><i class="far fa-star text-warning"></i></h5>
//                                             <h5><i class="far fa-star text-warning"></i></h5>
//                                             <h5><i class="far fa-star text-warning"></i></h5>


//                                             </div>


//                                         </div>

//                                    <h6 class="bold-text">MK${
//                     Intl.NumberFormat('en-US').format(item['commission'])
//                 }.00</h6>


//                                    <div class="d-flex  justify-content-between p-1  bg-primary float-end w-75">
//                                       <h6 class=" header-title font-11  text-white"> <i class="fas fa-users text-white"></i>  ${
//                     item['num_artists']
//                 }</h6>
//                                       <h6 class=" header-title font-11  text-white"><span class=" ${blink} "> <i class="fas fa-hourglass-half"></i></span>  ${
//                     item['pending']
//                 }</h6>
//                                       <h6 class=" header-title font-11  text-white"><span class="text-white"> <i class="fas fa-check"></i></span>  ${
//                     item['agent_total_uploads'] - item['pending']
//                 }</h6>
//                                       <h6 class=" header-title font-11  text-white"> <i class="fa fa-cloud-upload-alt text-white"></i>  ${
//                     item['agent_total_uploads']
//                 }</h6>

//                                    </div>


//                                    </div>


//                                    </div>

//                                 </div>


//                                 `);


//             })


//         } else {

//             $('.profile-name').html(data[0]['admin_agent_name']);

//             var item = data[0];
//             $('.agent-tb').html('');
//             // $('.agent-container').html('<span class="mt-5">sd</span>');
//             if (item['pending'] == 0) {
//                 var blink = 'text-primary'
//             } else {
//                 var blink = 'blink text-danger';
//             }

//             $('.agent-profile').html(`

//                 <div class="rounded-top  bg-transparent position-relative mt-3" style="background-image: url('assets/images/avatar-the-last-airbender-13608-1920x1200.jpg');background-size: cover; height:100px; padding-top:70px;">
//                     <img src="assets/images/${
//                 item['admin_agent_image']
//             }" class="rounded-circle img-thumbnail " style="height:70px; width:70px; margin-left: 7px;">
//                     <div class="position-absolute bottom-0 end-0    text-white d-flex">

//                         <div class="circle-sm bg-primary p-1 center"><i class="fas fa-users"></i><br><span class="text-dark center  border-bottom">${
//                 item['num_artists']
//             }</span></div>
//                         <div class="circle-sm bg-primary p-1 center"><span class="${blink}"><i class="fa fa-hourglass-half"></i> </span><br><span class="text-dark center border-bottom">${
//                 item['pending']
//             }</span></div>
//                         <div class="circle-sm bg-primary p-1 center"><i class="fas fa-check"></i><br><span class="text-dark center border-bottom">${
//                 item['agent_total_uploads'] - item['pending']
//             }</span></div>
//                         <div class="circle-sm bg-primary p-1 center"><i class="fas fa-cloud-upload-alt"></i> <br><span class="text-dark center border-bottom">${
//                 item['agent_total_uploads']
//             }</span></div>


//                     </div>

//                     <div class="position-absolute name-hagging  p-1  ">MK<span class="bulk-commission">${
//                 item['bulk_commission']
//             }</span></div>
//                 </div>


//                 <div class="w-100 center d-none" >
//                     <button class="btn btn-primary mt-2 view-artists"  value="${
//                 item['id_admins_agents']
//             }">VIEW ARTISTS</button>
//                 </div>


//             `);

//             var agent_id = data[0]['id_admins_agents'];
//             agentIDGLO = agent_id;
//
//             addARTIST(agent_id);


//         }


//         $(".view-artists").on('click', function (e) {
//             $(".home-2-nav-btn").hide();
//             $(".home-3-nav-btn").show();
//             $(".agent-container").hide();
//             $(".artist-container").show();
//             $('.artist-add-btn').show('');
//             if (agentACCOUNT == true) { // preloader('agent-artist');
//             }

//             // `<input type="hidden" class="num-artists" value="${item['num_artist']}">
//             // <input type="hidden" class="pending" value="${item['pending']}">
//             // <input type="hidden" class="total-uploaded" value="${item['agent_total_uploads']}">`;


//             let agent_id = $(this).find('.agent-id').val().trim();
//             let profilIMAGE = $(this).find('.profile-image').val().trim();
//             let commission = $(this).find('.commission').val().trim();
//             let num_artists = $(this).find('.num-artists').val().trim();
//             let pending = $(this).find('.pending').val().trim();
//             let total_uploaded = $(this).find('.total-uploaded').val().trim();


//             $('.agent-name').html($(this).find('.agent-name').val().trim());
//             // let agent_id = $(this).find('.agent-id').val().trim();
//             agentIDGLO = agent_id;

//             if (agentACCOUNT == true) {
//                 $('.profile-agent-2').html(`


//                 <div class="rounded-top mt-3 bg-transparent position-relative" style="background-image: url('assets/images/${profilIMAGE}');background-size: cover; height:100px; padding-top:70px;">
//                 <img src="assets/images/${profilIMAGE}" class="rounded-circle img-thumbnail " style="height:80px; width:80px; margin-left: 7px;">
//                 <div class="position-absolute bottom-0 end-0    text-white d-flex">

//                     <div class="circle-sm bg-primary p-1 center"><i class="fas fa-users"></i><br><span class="text-dark center  border-bottom">${num_artists}</span></div>
//                     <div class="circle-sm bg-primary p-1 center"><i class="fa fa-hourglass-half"></i><br><span class="text-dark center border-bottom">${pending}</span></div>
//                     <div class="circle-sm bg-primary p-1 center"><i class="fas fa-check"></i> <br><span class="text-dark center border-bottom">${
//                     total_uploaded - pending
//                 }</span></div>
//                     <div class="circle-sm bg-primary p-1 center"><i class="fas fa-cloud-upload-alt"></i> <br><span class="text-dark center border-bottom">${total_uploaded}</span></div>


//                 </div>

//                 <div class="position-absolute name-hagging  p-1  ">MK<span class="bulk-commission">${
//                     Intl.NumberFormat('en-US').format(commission)
//                 }.00</span></div>
//             </div>


//                 `);
//             }


//             my_artists(agent_id);


//         })

//         agent_add();
//         updateRATINGS();
//         notifications();

//     });


// }


function preloader(containerNAME) {
    $(`.${containerNAME}`).html(`
                 
                     <div class="center w-100  mt-5">
                    <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                     <span class="sr-only">Loading...</span>
                        </div>
                         <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                       <span class="sr-only">Loading...</span>
                              </div>

                           <p>Please wait...</p>

                    </div>
                
                `);
}


function agent_add() {
    $("#agent-add-form").on("submit", function (e) {
        e.preventDefault();

        let formDATA = new FormData();
        var agentName = $("#Agent-name").val().trim();
        var agentEmail = $("#Agent-email").val().trim();
        var agentPhone = $("#Agent-phone").val().trim();
        var agentpassword = $("#Agent-password").val().trim();
        var agentpasswordrpt = $("#Agent-passwordrpt").val().trim();
        if (agentpassword == agentpasswordrpt) {
            formDATA.append('agentName', agentName);
            formDATA.append('agentEmail', agentEmail);
            formDATA.append('agentPhone', agentPhone);
            formDATA.append('password', agentpasswordrpt);
            formDATA.append('key', 'agent-add');

            $.ajax({
                url: 'admin/servers/server.php',
                type: 'post',
                data: formDATA,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (item) {
                    if (item['info'] == true) {
                        $('#full-screen-modal').modal('toggle');
                        // my_agents();
                    }

                }
            })

        }

    })
}


function my_artists(agent_id) { // alert(agent_id)


    let key = "my_artists";


    var request = $.ajax({

        url: "admin/servers/server.php",
        type: "POST",
        data: {
            key,
            agent_id
        },
        dataType: "json"
    });
    request.done(function (data) {

        console.log(data);

        // if (agentACCOUNT == 2) {

        $('.artist-container').show();

        // }


        // if(agentACCOUNT==true) {
        $('.view-artist-1').html('');
        // }


        // console.log(data);


        $.each(data['folders'], function (key, item) { // console.log(item['folder_name']);
            console.log(item)

            if (selectPAGE == item['folder_name'].trim()) {
                var border = 'select-border';
            } else {
                var border = '';
            }

            // console.log(selectPAGE)
            if (item['pending'] == false) {
                var pending = "d-none";
            } else {
                var pending = "d-block blink";

            }
            if (item['num_music'] > 0 && item['pending'] == 0) {
                var bg_ped = `<div class="bg-success font-10 text-white"><i class="fas fa-check"></i></div>`;
            } else {
                var bg_ped = '';
            }


            // hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
            $('.view-artist-1').append(`

                                <div class="card p-0  page-select page-ss ${border}">
                                            <input type="hidden" class="folder-id" value="${
                item['id']
            }">
                                        <input type="hidden" class="folder-name" value="${
                item['folder_name']
            }">
                                        <input type="hidden" class="song-title" value="${
                item['song_title']
            }">

                                <div class="folder-image ">
                                           <h6 class=" header-title font-11"> ${
                item['num_music']
            }<i class="fas fa-music"></i></h6>
                                                                <h6 class="${pending} header-title font-11 text-danger "> ${
                item['pending']
            }<i class="fas fa-hourglass-start"></i></h6>
                                                                ${bg_ped}
                                        </div>

                                    <div class="card-body pb-0 pt-0 position-relative center">
                                        <div class=" center p-0 dark-gd-text" style="font-size: 50px;">
                                            <img src="assets/images/${
                item['artwork']
            }" class="rounded-circle " height="60" width="60">
                                        </div>
                                        ${
                item['folder_name']
            }

                                     
                                    </div>
                                </div>
                                
    
                             `);

        })

        addARTIST(agent_id);

        SETpage_session();

    });


}


function addARTIST(agent_id) {
    $('#add-artist').unbind('submit').on('submit', function (e) {
        e.preventDefault();
        var foldername = $('#artist-name-add').val().trim();
        let key = "add_folder";

        var request = $.ajax({
            url: "admin/servers/server.php",
            type: "POST",
            data: {
                key,
                foldername,
                agent_id
            },
            dataType: "json"
        });
        request.done(function (data) {

            if (data['info'] == true) {
                $('.view-artist-1').html('');

                if (agentACCOUNT == true) {

                    my_artists(agent_id);
                } else {
                    selectPAGE = foldername;

                    my_artists(agent_id)
                }

            }

        });

    })
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var img_height = "img-height img-thumbnail";

        reader.onload = function (e) {
            $("#preview-img").attr({'src': e.target.result, 'class': img_height})
        }

        reader.readAsDataURL(input.files[0]);
    }
}


function upload() {
    $("#upload-form").unbind('submit').on('submit', function (e) {
        e.preventDefault();

        var statePage = pageStateHOME();
        console.log(statePage);
        var form_data = new FormData();
        let song_title = $(this).find('#song-title-upd').val().trim();
        let genre = $(this).find('#genre').text().trim();
        var artwork = $('#artwork-music')[0].files;
        var audio = $('#audio-file')[0].files;
        var agent_id = statePage['agent_id'];

        if (artwork.length > 0 && audio.length > 0 && statePage['page_name'].length > 0 && statePage['page_id'].length > 0) {


            form_data.append('artwork', artwork[0]);
            form_data.append('audio', audio[0]);
            form_data.append('title', song_title);
            form_data.append('agent_id', agent_id);
            form_data.append('genre', genre);
            // form_data.append('page_id', statePage['page_id']);
            // form_data.append('page_name', statePage['page_name']);

            $('.spinner').show();
            form_data.append('key', 'upload_music');
            $.ajax({
                url: 'admin/servers/server.php',
                type: 'post',
                data: form_data,
                contentType: false,
                processData: false,
                dataType: 'html',
                success: function (item) {
                    console.log(item)
                    // $('#upload-music-modal').modal('toggle');
                    // $('.spinner').hide();
                    // page_view_home();

                }
            })

        } else {
            alert("Select a song")
        }

    })

}

function deleteREMOVE() {

    $('.delete').on('click', function () {

        var song_id = $(this).val().trim();


        var key = 'delete';
        var request = $.ajax({
            url: "admin/servers/server.php",
            type: "POST",
            data: {
                key,
                song_id
            },
            dataType: "json"
        });
        request.done(function (response) {
            if (response == true) { //    alert('item deleted')
                page_view_home()
            } else {

                alert('unable to delete because this song has already joined the competition');
            }


        })


        // $(this).closest('.list-select').remove();


    })


}


function validateUpload() {

    $('.validate').unbind('click').on('click', function () {


        var key = 'validate-music';
        var song_id = $(this).val().trim();
        $(this).attr('class', 'btn  d-block btn-outline-info float-end p-0 bg-white text-primary border-success');
        $(this).html('PAID');

        var request = $.ajax({
            url: "admin/servers/server.php",
            type: "POST",
            data: {
                key,
                song_id
            },
            dataType: "html"
        });
        request.done(function (data) {

            console.log(data);
        })


    })
}

// rates
function updateRATINGS() {

    $('#update-ratings').on('submit', function (e) {
        e.preventDefault();


        var month = $(".current-month").text().trim();
        var price = $("#price").val().trim();
        var agent_rate = $("#agent-rate").val().trim();
        var prize_rate = $("#prize-rate").val().trim();


        var priceNEW = parseInt(price.replace('MK', ''));
        var agent_rateNEW = parseInt(agent_rate.replace('%', ''));
        var prize_rateNEW = parseInt(prize_rate.replace('%', ''));

        let key = "updateRATINGS";

        var request = $.ajax({
            url: "admin/servers/server.php",
            type: "POST",
            data: {
                key,
                priceNEW,
                agent_rateNEW,
                prize_rateNEW,
                month
            },
            dataType: "json"
        });
        request.done(function (response) {
            if (response == true) {
                $("#con-close-modal").modal('toggle');
                // my_agents();
            } else {
                alert("error");
            }


            // console.log(data);
            // console.log(month + priceNEW + agent_rateNEW + prize_rateNEW)
        })


    })
}
