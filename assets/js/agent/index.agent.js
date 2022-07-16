import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    FacebookAuthProvider,
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    signInWithCredential
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCj_EuV2jj_QLnp_3vhP27EO6MEeFsGPFI",
    authDomain: "grandtunes-3be79.firebaseapp.com",
    projectId: "grandtunes-3be79",
    // storageBucket: "grandtunes-3be79.appspot.com",
    messagingSenderId: "404531000561",
    appId: "1:404531000561:web:6c891942aca5cf8a4d2550"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();


var num_comp;
var scrollPOINT;
var playlistScrlCTRL = true;
var restrictBARCOMMENT = false;
var battlezone = false;
var photoURL = '';
var currentPhoto = '';
var currentUser;
var agentIDGLO;
var page_idGlo;
$(function () {
    "use strict";

    getContent();
    links();


    // prize();
    $('.view-a').unbind('unbind').on('click', function (e) {
        e.preventDefault();
        $('.home-activities, .page-activities, .battle-activities, .search-activities').addClass('d-none');
        // $('.page-activities').addClass('d-none');
        // $('.battle-activities').addClass('d-none');
        $('.agent-activities, .first-nav').removeClass('d-none');


    })


    $('.view-users').unbind('unbind').on('click', function (e) {
        e.preventDefault();
        $(' .home-activities, .page-activities, .battle-activities, .agent-activities, .search-activities').addClass('d-none'); 
        $('.all-user-activities, .first-nav').removeClass('d-none');
        users()
    })

    $('.search-button').unbind('click').on('click', function(e){
        e.preventDefault();
        $('.first-nav, .home-activities, .page-activities, .battle-activities, .agent-activities, .all-user-activities').addClass('d-none');
        $('.search-activities, .search-wrapper').removeClass('d-none');
        // $('.search-wrapper').removeClass('d-none ');     
    })

    $('.back-search').unbind('click').on('click', function(e){
        e.preventDefault();
        
        $('.home-activities, .first-nav').removeClass('d-none');
        $('.search-activities').addClass('d-none');
       
    })

    $('#search').unbind('keyup').on('keyup', function(e){
        var input=$(this).val();
        let key="search";
        var request = $.ajax({
                url: "admin/servers/index.user.php",

                type: "POST",
                
                data: {
                    key,
                    input
                   
                },
                dataType: "json"
            });
            request.done(function (data) {
                console.log(data);
                $.each(data, function (key, item){
                $('.search-results').prepend(`
                    <div class="d-flex search-min-wrapper  bg-white ml-2 mr-2 mb-1 justify-content-between ">
    
                    
    
    
                                                  
                 <div class="d-flex page-select w-75">
                 <input type="hidden" class="folder-id" value="${
                    item['folder_id']
                }">
                <input type="hidden" class="folder-name" value="${
                    item['artist_name']
                }">
                  <input type="hidden" class="song-id" value="${
                    item['music_id']
                }">
                
                              <input type="hidden" class="song-title" value="${
                    item['song_title']
                }">
                    <div class="avatar mr-2">
                            <img src="${item['artwork']}" alt="" class="rounded" height="40" alt="" width="40">
                    </div>
                    <div class="text">
                        <p class="m-0 p-0">${item['artist_name']}
                            <br><span class="text-primary"><span class="text-blue">#Title:</span> ${item['song_title']}</span>
                    </div> 
                </div>  
                  
                  <div class="mb-2">
                    <button class="border-0 darken-color cancel-search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                      </svg>
                    </button>
                  </div>
                                    
             </div>
                    
                    `);
                })



                $('.cancel-search').unbind('click').on('click', function(e){
                    $(this).closest('.search-min-wrapper').remove();
                })



                GoPage(); 
                


            })
        
    })


    


    my_gents();


    // $('.button-menu-mobile').unbind('click').on('click', function () {
    //     $('.left-side-menu').toggle();
    //     //console.log('kjk');
    // })
    const audioClick = new Audio('assets/audio/tap.wav')
    $('.custom-menu-icon').on('click', function () { // alert('')
         audioClick.play();
        $('.custom-menu-icon').removeClass('active');
        // $('.custom-menu-icon').css('border: 2px solid #343a40');
        $(this).addClass('active');

    })

    $('#artwork-music').change(function () {
        readURL(this);
    })

})




function users() {

    onAuthStateChanged(auth, (user) => {

        var userId = user.uid;
        if (user) {
            let key = "users";
            var request = $.ajax({
                url: "admin/servers/index.user.php",

                type: "POST",
                headers: {
                    Authorization: 'Bearer ' + user.accessToken
                },

                data: {

                    key,
                    userId
                },
                dataType: "json"
            });
            request.done(function (data) {
                $('.all-users').html('');

                if (data.length > 0) {
                    $.each(data, function (i, item) {
                        var role = item.role

                        if (role == true) {
                            var classd = 'border bg-white disabled';
                        } else {
                            var classd = 'bg-white-grey ';
                        }
                        console.log(role)
                        $('.all-users').append(`


                        <a class="list-item d-flex justify-content-between border-top p-1 w-100 ">

                        <input class="agent-id" type="hidden" value="${
                            item.userFbId
                        }">

                       <div class="img-agent mr-2 bg-white-grey">
                           <img src="${
                            item.photoUrl
                        }" alt="" class="img rounded-circle" height="55px">
                       </div>

                       <div class="ml-2 w-100">

                           <div class="d-flex justify-content-between k">
                            

                             <div class="d-flex flex-column">
                               <h5 class="m-0 p-0 mb-1  darken-color">${
                            item.name
                        }</h5>

                               <p><span class="text-muted">Date:</span> ${
                            item.date_join
                        }</p>
                           
                          
                             </div> 

                             <div class="d-flex   ${classd}">
                             
                               <button value="${
                            item.id_user
                        }" class="btn border-end text-success outline-none make-agent ${classd}">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                                    </svg>

                               </button>
                               <button class="btn border-0 text-danger bg-white-grey">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                                 <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                 </svg>
                               
                               </button>
                             </div>  
                           </div>
                          
                       </div>


                        
                    </a>
                        
                        
                        
                        
                        `);
                    })
                }

                $('.make-agent').unbind('click').on('click', function () {
                    const id_user = $(this).val().trim();
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            const userId = user.uid;
                            let key = "make_agent";
                            var request = $.ajax({
                                url: "admin/servers/server.php",

                                type: "POST",
                                headers: {
                                    Authorization: 'Bearer ' + user.accessToken
                                },
                                data: {

                                    key,
                                    userId,
                                    id_user
                                },
                                dataType: "json"
                            });
                            request.done(function (data) {
                                if (data.info == true) {
                                    $("#info-alert-modal").modal('toggle');
                                } else {
                                    $("#failed-alert-modal").modal('toggle');
                                }

                            })


                        } else {}
                    })


                })

            })
        } else {
            alert()
        }

    })

}

function my_gents() { // alert()


    onAuthStateChanged(auth, (user) => {


        if (user) {
            const userId = user.uid;
            const key = "my_agents";
            var request = $.ajax({
                url: "admin/servers/server.php",

                type: "POST",
                headers: {
                    Authorization: 'Bearer ' + user.accessToken
                },
                data: {

                    key,
                    userId
                },
                dataType: "json"
            });
            request.done(function (data) {
                console.log(data)

                if (data.length > 0) {
                    $('.num-agents').html(data.length);

                    $.each(data, function (key, item) {
                        $('.agent-list').append(`

                              <a data-bs-toggle="modal" data-bs-target="#right-modal" class="list-item d-flex justify-content-between border-top p-1 w-100 ">

                                         <input class="agent-id" type="hidden" value="${
                            item['agent_id']
                        }">

                                        <div class="img-agent mr-2 bg-white-grey">
                                            <img src="${
                            item['admin_agent_image']
                        }" alt="" class="img rounded-circle" height="55px">
                                        </div>

                                        <div class="ml-2 w-100">

                                            <div class="d-flex justify-content-between k">
                                             

                                              <div class="d-flex flex-column">
                                                <h5 class="m-0 p-0 header-title darken-color">${
                            item['admin_agent_name']
                        }</h5>
                                            
                                               <p class="p-0 m-0 font-18"><span class="text-primary">#${
                            item['num_uploaded']
                        }</span> 
                                                <span class="text-danger">^${
                            item['num_pending']
                        }</span> 
                                                <span class="text-secondary">*${
                            item['total_audios']
                        }</span> 

                                            </p> 
                                              </div> 

                                              <div class="d-flex flex-column">
                                               <p class="p-0 m-0"><span class="text-primary bold-text">#MK${
                            item['commission_gain']
                        }</span> </p> 
                                               <p class="p-0 m-0"><span class="text-danger">*MK${
                            item['pending_commission']
                        }</span> </p> 
                                              </div>  
                                            </div>
                                           
                                        </div>


                                         
                                     </a>




                    `);

                    })
                }

                $('.list-item').unbind('click').on('click', function () {
                    $('.list-item').removeClass('list-item-select');

                    $(this).addClass('list-item-select');
                    var agent_id = $(this).find('.agent-id').val().trim();
                    console.log(agent_id)
                    my_artists(agent_id);
                })

                // console.log(data)

            })
        } else {

            $('.agent-list').append('ADMIN ONLY')
        }

    })

}

// image preview
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


function scrollers() {

    var lastScrollTop = 0;

    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    if (isMobile) {
        var contentDp = 0;
        // console.log("the playlist is scrollog")
        $('.playlist').scroll(function () {


            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                $('.btn-srl-top').show('');
                $('.top-nav-custom').css('background-color', '#4ec0fc');
                $('.notification-wrapper').css('top', '3px');
                $('.search-button').addClass('mt-1');


            } else {
                $('.notification-wrapper').css('top', '-2px');
                $('.search-button').removeClass('mt-1');
                $('.top-nav-custom').css('background-color', '#eff4f6');

            } lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        });

    } else {
        var contentDp = 3;
    }

    $('.btn-srl-top').unbind('click').click(function () {
        $('.playlist').animate({
            scrollTop: 0
        }, "slow");
        // $('.top-3').html('');
        // $(".playlist > .music-container").remove();
        // $('.playlist').find('.music-container').empty();


        // prize();
    })

}


function trysot(dd) {

    function randomArrayShuffle(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    const dataSh = randomArrayShuffle(dd);

    // //console.log(dataSh);

}


function getContent() {

    onAuthStateChanged(auth, (user) => {
        if (user) {

            const userId = user.uid;

            var key = 'home_music';
            var request = $.ajax({
                url: "admin/servers/index.user.php",
                // async: false,
                type: "POST",
                data: {
                    key,
                    userId
                },
                dataType: "json"
            });
            request.done(function (data) {
                console.log(data);
                prize(data);


            })

        } else {
            var key = 'home';
            var request = $.ajax({
                url: "admin/servers/index.user.php",
                // async: false,
                type: "POST",
                data: {
                    key
                },
                dataType: "json"
            });
            request.done(function (data) {

                prize(data);
            })

        }

    })

}

function prize(data) {


    // var key = 'home';

    // var request = $.ajax({
    //     url: "admin/servers/index.user.php",
    //     // async: false,
    //     type: "POST",
    //     data: {
    //         key
    //     },
    //     dataType: "json"
    // });
    // request.done(function (data) {
    const randData = data;
    // trysot(randData);


    $('.playlist').animate({
        scrollTop: 0
    }, "slow");


    agentIDGLO = 3;
    commission();
    if (data.length > 0) {
        let agent_id = data[0]['agent_id'];


        $('.top-3').html('');
        num_comp = data.length;
        $('.num-music').html(num_comp);

        let containerName = '.playlist';
        let cols = "col-xl-6 col-lg-8";
        theAppender(data[0], containerName, cols);


        $.each(data, function (key, item) {


            $('.all-artist-battles').append(`

                  <option value="AL">${
                item['artist_name']
            } ${
                item['song_title']
            }</option>

                `)

            if (key == 0) {
                var blink = 'blink';
                var medal = 'medal-icon-primary';
                var medal = 'bg-primary';
                var icon = 'fa fa-crown';

            } else if (key == 1) {
                var medal = 'medal-icon-success';
                var medal = 'bg-primary';
                var icon = ' far fa-star';
            } else if (key == 2) {
                var medal = 'medal-icon-danger';
                var medal = 'bg-primary';
                var icon = 'fas fa-medal';
            } else if (key == 3) {
                var medal = 'bg-primary';
                var icon = 'fab fa-gripfire';
            }

            if (key < 4) {
                $('.top-3').append(`

                
                <div class="card page-select p-0 mb-0 position-relative rounded" style="width: 8rem">

                <input type="hidden" class="folder-id" value="${
                    item['folder_id']
                }">
                <input type="hidden" class="folder-name" value="${
                    item['artist_name']
                }">
                  <input type="hidden" class="song-id" value="${
                    item['music_id']
                }">
                
                              <input type="hidden" class="song-title" value="${
                    item['song_title']
                }">




                <img src="${
                    item['artwork']
                }" class="rounded m-0" height="117px" alt="...">

                <div class="winner-info rounded-3">
                    <h6 class="float-end font-14 p-0  text-white ">
                    
                    <span class="bg-primary-gd p-1 darken-color bold-text">${
                    key + 1

                }
                   </span>
                </h6>

                    <h6 class="text-white p-1"><span class=" center ">${
                    item['artist_name']
                }</span>


                <br>
                
                ${
                    item['likes']
                }  Votes


                </h6>
                    <h6 class="p-2"><span class="text-white center"></span></h6>

                        <div class="medal-icon ${medal}  rounded">
                            <i class="${icon}"></i>
                        </div>
                 

                </div>

            </div>
                
                
                
                `);
            }


        })


        $.each(data, function (key, item) { // //console.log(item)
            let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
            if (isMobile) {
                var contentDp = 0;

            } else {
                var contentDp = 3;
            }

            if (key <= contentDp) {
                num_comp = data.length;


            }


        })


        var count_scroll = 1;
        var height = $('body').height();

        var lastScrollTop = 0;
        $('.playlist').scroll(function () {


            var st = $(this).scrollTop();
            if (st > lastScrollTop) { // console.log("down")
                $('.btn-srl-top').show('');
                // $('.top-nav-custom').addClass('bg-primary-gd');
                $('.notification-wrapper').addClass('top-3');
                $('.search-button').addClass('mt-1');


            } else { // console.log("up")
                $('.notification-wrapper').removeClass('top-3');
                $('.search-button').removeClass('mt-1');
                // $('.top-nav-custom').removeClass('bg-primary-gd');


            } lastScrollTop = st;


            if (playlistScrlCTRL == true) {


                if (count_scroll < data.length) {


                    var scrollheight = $(this).scrollTop() + $(this).outerHeight();
                    var playlistHeight = $(this)[0].scrollHeight;


                    if (scrollheight >= (playlistHeight - 60)) {

                        let containerName = '.playlist';
                        let cols = "col-xl-6 col-lg-8";
                        theAppender(data[count_scroll], containerName, cols);

                        scrollPOINT = $('.playlist').height();

                        if (count_scroll % 10 == 0) {
                            advertTOP4(data);
                        } else if (count_scroll % 2 == 0) {

                            $('.playlist').append(`

                            <div class="music-container col-xl-6 col-lg-8 p-0">
                            <div class="card  p-0">
                            <div class="card-body p-0 ">
                             
                                <div class="advert-1 music-container center home-item position-relative p-0">

                                        <h1 class=" border-0 mt-3 text-gradient"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-trophy" viewBox="0 0 16 16">
                                        <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                      </svg></h1>

                                        <h1 class="advert-text  border-0" >Competition in progress. <br>
                                        Tell your favorite artist to join.</h1>


                                        <div class="buble-pink"></div>
                                        <div class="buble-pink-sm"></div>
                                        <div class="buble-yellow"></div>
                                    
    
                                  </div>

                                  </div>
                                  </div>
                                  </div>
                               
                                
                            
                            `)

                        } else if (count_scroll % 3 == 0) {

                            if ($('.playlist').append(`                           
                                <div class="col-xl-6 home-item music-container bg-white p-2">
                                <h5 class="bg-primary-gd header-title p-1 " style="width: 50%; color: #1f4d65;">TOP 10</h5>

                                <p class="">Did your favorite artist make it</p>

                                    <div class="card  p-0 mt-0">
                                        <div class="card-body mb-1">
                                            <div id="cardCollpase8" class="collapse  show mt-0 pt-0" dir="ltr">
                                                <div id="apex-bar-1" class="apex-charts header-title" data-colors="#4ec0fc"></div>
                                               
                                            </div> 
                                            <p class="center p-0">Votes</p>
                                        </div> 
                                    </div> 
                                </div>
                            
                            `)) {

                                appexINIT(data);

                            }


                        }

                        count_scroll += 1;

                    }
                }

            } else { // console.log("not true")
            }
        })

        GoPage();
        view_comments();

        social_action();
        social_follow();
        scrollers();

        let url_param = getUrlParams();
        console.log(url_param);
        if (jQuery.inArray("battle-series", url_param) !== -1) {} else {
            battles(data);
        }


    } else {
        $('.playlist').append(`


            <div class="card mt-1 pt-2" style="">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#1f4d65" class="bi bi-soundwave" viewBox="0 0 16 16">
                 <path fill-rule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zm12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z"/>
               </svg>
              <div class="card-body">
                <h5 class="header-title">Hello user</h5>
                <p class="card-text">
                   Welcome to grandtunes. currently, you do not have any uploads this month

                </p>
                <a href="#" class="btn bg-primary-gd text-white">Create Artist</a>
              </div>
            </div>


            `);
    }


    // });


}

function my_artists(agent_id = '') { // alert(agent_id)
    let key = "my_artists";
    if (agent_id == '') {
        agent_id = agentIDGLO;
    } else {}

    // alert(agent_id)

    $('.notification-list').html('');
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
        console.log(data)


        $('.num-artist').html(data.length);
        $('.spinner-artists').remove();

        $.each(data, function (key, item) {


            if (item['pending_page'] > 0) {
                var bg = 'bg-danger';
                var num_pending = item['pending_page'];
                var song_id = "not defined just select";

            } else if ((item['pending_page'] == 0) && (item['total_audio_page'] > 0)) {
                var bg = 'bg-success';
                var num_pending = '';
                var song_id = "not defined just select";
            } else if (item['total_audio_page'] == 0) {
                var bg = 'bg-warning';
                var song_id = null;
                var num_pending = '';
            } else {

                var num_pending = 0;
            }

            $('.notification-list').append(`

                <div class="d-flex  border-bottom-1 mt-2 p-0 pb-2 page-select w-100"  >

                            <input type="hidden" class="folder-id" value="${
                item['id']
            }">
                         <input type="hidden" class="folder-name" value="${
                item['folder_name']
            }">
                         <input type="hidden" class="song-title" value="mnnmnm">
                         <input type="hidden" class="song-id" value="${song_id}">
                         <input type="hidden" class="agent-id" value="${
                item['agent_id']
            }}">
                        <div class="not-img mr-2 position-relative">
                              <img src="${
                item['last_avatar']
            }" height="50" class="rounded-3" alt="">
                            <div class="notification-wrapper-artist ${bg}">
                               ${num_pending}
                            </div>
                        </div>
                   
                    <div class="not-msg  w-100">
                        <h5 class="p-0 m-0 bold-text darken-color">${
                item['folder_name']
            } <span class="float-end font-10">
            ${
                item['total_audio_page']
            } 
            
            songs</span></h5>
                        <code class="font-10 m-0 p-0  bold-text">${
                item['last_modified']
            }</code>
                    </div>

                  </div>
            
            
            `)
        })

        GoPage();

        //    //console.log(data)

    });


}

function commission() {
    var key = 'commission_agent';

    var request = $.ajax({
        url: "admin/servers/index.user.php",
        async: false,
        type: "POST",
        data: {
            key
        },
        dataType: "json"
    });
    request.done(function (data) {
        console.log(data);
        if (data['commission_gain'] > 0) {
            $('.prize').html(`MK` + Intl.NumberFormat('en-US').format(data['commission_gain']) + '.00')
            $('.pending-commission').html(`MK` + Intl.NumberFormat('en-US').format(data['pending_commission']) + '.00')
            $('.num-music-pending').html(Intl.NumberFormat('en-US').format(data['num_pending']))
            $('.num-paid').html(Intl.NumberFormat('en-US').format(data['num_uploaded']))
            $('.month').html(data['month'])
            // $('.current-winner').html(data[0]['artist_name'])
            // $('.votes').html(data[0]['likes'])
            // $('.month').html(data['month'].toUpperCase());

        } else {

            $('.prize').html(`MK0000.00`)


        }
        // let agent_id = 3;


        addARTIST();


    })

    my_artists();


}


function donutCHART(pending, uploaded, total) { // $("#morris-donut-example").html("");
    var MorrisCharts = function () {};
    // creates Donut chart
    MorrisCharts.prototype.createDonutChart = function (element, data, colors) {
        Morris.Donut({
            element: element,
            data: data,
            barSize: 0.1,
            resize: true, // defaulted to true
            colors: colors,
            backgroundColor: 'transparent'
        });
    },
    MorrisCharts.prototype.init = function () {

        // creating Stacked chart


        // creating donut chart
        var $donutData = [
            {
                label: "Total",
                value: total
            }, {
                label: "Competing",
                value: uploaded
            }, {
                label: "Pending",
                value: pending
            }
        ];
        var colors = ['#6559cc', '#3bafda', '#f1556c'];
        var dataColors = $("#morris-donut-example").data('colors');
        if (dataColors) {
            colors = dataColors.split(",");
        }
        this.createDonutChart('morris-donut-example', $donutData, colors);
    },
    // init
    $.MorrisCharts = new MorrisCharts,
    $.MorrisCharts.Constructor = MorrisCharts

    $.MorrisCharts.init();
}


function addARTIST() {
    $('#add-artist').unbind('submit').on('submit', function (e) {
        e.preventDefault();

        onAuthStateChanged(auth, (user) => {

            if (user) {

                var userId = user.uid;


                $(`#page-playing`).html(`
                <div class="center w-100 battle-wrapper mt-5">
                <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>

                <p>Please wait...</p>

                </div>    
        `);


                playlistScrlCTRL = false;
                restrictBARCOMMENT = true;

                $(".home-activities").hide();
                $(".agent-artist-activities").hide();
                $(".page-activities").show("");
                $('.page-select').css({'border': '1px solid #e7eaed'});

                $('.home-activities').addClass('d-none');
                $('.page-activities').removeClass('d-none');
                $('.battle-activities').addClass('d-none');
                $('.agent-activities').addClass('d-none');
                $('.all-user-activities').addClass('d-none');


                var foldername = $('#artist-name-add').val().trim();
                $(".page-title").html(foldername);
                let key = "add_folder";

                // alert(foldername+agentIDGLO)
                let agent_id = agentIDGLO;


                var request = $.ajax({
                    url: "admin/servers/server.php",
                    type: "POST",
                    headers: {
                        authorization: "Bearer " + user.accessToken
                    },
                    data: {
                        key,
                        foldername,
                        agent_id,
                        userId
                    },
                    dataType: "json"
                });


                request.done(function (data) {
                    $('#bs-example-modal-sm').modal('toggle');
                    // console.log(data);
                    if (data['page_id'] > 0) {
                        page_idGlo = data['page_id'];
                        let song_id = null;
                        page_view_home(song_id, foldername);
                    } else {
                        alert("error contact grandtunes");
                    } my_artists();


                });
            } else {
                alert("error contact");
            }

        })

    })


}

function select_audio(page_name, page_length) {

    $('.audio-file-sm').unbind('change').on('change', function () {

        onAuthStateChanged(auth, (user) => {

            if (user) {


                var userId = user.uid;


                $(`#page-playing`).html(`
                <div class="center w-100 battle-wrapper mt-5">
                <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>

                <p>Please wait as we are<br>uploading your song...</p>

                </div>    
              `);


                let page_id = page_idGlo;
                // console.log(page_id)
                var audio = $(this)[0].files;
                var form_data = new FormData();
                form_data.append('audio', audio[0]);
                form_data.append('key', 'metadata');
                form_data.append('page_id', page_id);
                form_data.append('page_name', page_name);
                form_data.append('agent_id', agentIDGLO);
                form_data.append('page_length', page_length);
                form_data.append('userId', userId);

                $.ajax({
                    url: 'admin/servers/server.php',
                    type: 'post',
                    headers: {
                        Authorization: 'Bearer ' + user.accessToken
                    },
                    data: form_data,
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    success: function (music_ifo) { // console.log(music_ifo)
                        if (music_ifo['artist'].length > 0) {

                            form_data.append('title', music_ifo['title']);
                            form_data.append('genre', music_ifo['genre']);
                            form_data.append('image_name', music_ifo['image_name']);
                            form_data.append('image_path', music_ifo['image_path']);
                            form_data.append('music_name', music_ifo['music_name']);
                            form_data.append('dir', music_ifo['dir']);
                            form_data.set('key', 'upload_music');
                            verify_audio_info(music_ifo, form_data, page_name);
                        }


                    }
                })

            } else {
                alert("login")
            }

        })

    })
}


function verify_audio_info(music_ifo, form_data, page_name) { // console.log(music_ifo['music_path'].replace('../../', ''))

    $("#page-playing").html(`
         <div class="card mb-2" style="">

           <h5 class="center">Please Comfirm the following info about the file you uploaded.</h5>
          <img src="${
        music_ifo['image_path'].replace('../../', '')
    }" class="card-img-top" alt="...">
          <div class="card-body">
            <audio controls>
                       
                <source src="${
        music_ifo['music_path'].replace('../../', '')
    }" type="audio/mpeg">
                        Your browser does not support the audio tag.
            </audio>

            
          </div>

          <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="header-title">Artist Name</span>: ${
        music_ifo['artist']
    }</li>
            <li class="list-group-item"><span class="header-title">Title</span>: ${
        music_ifo['title'].replace('[www.grantunes.com]', '')
    }</li>
            <li class="list-group-item"><span class="header-title">Genre</span>: ${
        music_ifo['genre']
    }</li>
            <li class="list-group-item"><span class="header-title">Year</span>: ${
        music_ifo['year']
    }</li>
           
          </ul>



          <div class="card-body">
            <a href="#" class="card-link">discard</a>
            <a  class="card-link comfirm-upload">Upload Audio</a>
          </div>
        </div>

    `);


    $(".comfirm-upload").unbind('click').on('click', function (e) {
        $(this).addClass('disabled');

        // console.log(form_data.entries('key'));

        //         for (var pair of form_data.entries()) {
        //     //console.log(pair[0]+ ', ' + pair[1]);

        // }

        onAuthStateChanged(auth, (user) => {


            if (user) {

                const userId = user.uid;

                $.ajax({
                    url: 'admin/servers/server.php',
                    type: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + user.accessToken
                    },
                    data: form_data,
                    contentType: false,
                    processData: false,

                    dataType: 'json',
                    success: function (item) {
                        if (item.info == true) {
                            $("#info-alert-modal").modal('toggle');
                        } else {
                            $("#failed-alert-modal").modal('toggle');
                        }
                        var song_id = ''
                        page_view_home(song_id, page_name);

                    }
                })
            } else {
                alert('you must login first')
            }
        })


    })
}


// add battles

function addbattles(data) {
    var music = [];
    var initpageid = 0;
    let numbattles = [];
    $(".search-music").unbind('upkey').on('keyup', function () {
        music = [];
        $(".results").html('')
        if ($(".results").html('')) {
            let searchedItme = $(this).val().trim().toLowerCase();
            $.each(data, function (key, item) {


                let searchdb = item['artist_name'] + ' ' + item['song_title'];

                if (~ searchdb.toLowerCase().trim().indexOf(searchedItme)) { // console.log("much")

                    if (parseInt(item.battle_music_id) == false) {

                        console.log(item.battle_music_id)

                        music.push(item);
                    }
                }
            });
        } else {
            // console.log("no match")
            // $(".bus-chart").html(`
            //         <h6 class="dropdown-item
            //           black-text"  href="#">No Match
            //         </h6> <br>`
            // );
        }

        $.each(music, function (key, item) {


            $('.results').append(`

                      <div class="d-flex p-1 battle-artist">

                                  <input class="music-id" type="hidden" value='${
                item['music_id']
            }'>
                                                <input class="page-id" type="hidden" value='${
                item['page_id']
            }'>
                                                

                                                    <div class="avatar mr-2">
                                                        <img src="${
                item['artwork']
            }" class="rounded" height="40" alt="" width="40">
                                                    </div>
                                                    <div class="text">
                                                        <p class="m-0 p-0">${
                item['artist_name']
            } <br>#Title: <span>${
                item['song_title']
            }</span>
                             </div>
                                                        
                           </div>

                     `);

        })


        $('.battle-artist').unbind('click').on('click', function () {
            let music_id = $(this).find('.music-id').val().trim();
            $('.create-battle').show();
            // $('.playl').scrollTo({ top: 0, behavior: 'smooth' });


            // numbattles.push(music_id);

            $.each(music, function (key, contestant) {


                if (numbattles.length<=1){

                    if(contestant['music_id']==music_id){
                        if(numbattles.length==0){

                            var contDiv='.first-cont';

                        }else if(numbattles[0].page_id==contestant.page_id){
                            $('.create-battle').removeClass('d-none');
                          
                            var contDiv='.second-cont';

                        }
                        $('.contestant-prev').removeClass('d-none');

                        $(`${contDiv}`).html(`


                             <div class="card p-0  page-select p-1 " style="width: 8rem">
                                      



                                                    <input type="hidden" class="folder-id" value="${
                                                    contestant['folder_id']
                                                }">
                                                                <input type="hidden" class="folder-name" value="${
                                                    contestant['artist_name']
                                                }">
                                                <input type="hidden" class="song-title" value="${

                                                    contestant['song_title']
                                                }">

                                                <input type="hidden" class="song-id" value="${

                                                    contestant['music_id']
                                                }">


                        
                                                <div class="card-body p-0 pb-0 pt-0 position-relative center">
                                                    <div class=" center p-0 dark-gd-text" style="background-image: url('${contestant['artwork']}'); background-size: cover; height:121px; padding-top:70px; ">

                                                        
                                                    </div>
                                                    <h5>${
                                                    contestant['artist_name']
                                                }</h5>

                                                  
                                                     <button class="border-1 social-num text-black btn-small w-100 p-0">${
                                                    contestant['likes']
                                                } Votes
                                                
                                                </button>
                                                   
                                    
                                                    
                    
                                
                                </div>
                    
                            </div> 






                            `);

                          numbattles.push(contestant);  
                    } 
                   
                }else{
                    //console.log("full battles")
                }

                

            })


            $('.create-battle').unbind('click').click(function(){

                $(this).hide();
                // var myDate = new Date();
                // console.log(myDate)
                // myDate.setHours(myDate.getHours()+24);
                // console.log(myDate)
               

                    onAuthStateChanged(auth, (user) => {
                    if (user) {

                        var userId = user.uid;

                        if (numbattles.length == 2) { // //console.log(numbattles)
                            if (numbattles[0]['folder_id'] === numbattles[1]['folder_id']) {
                                // alert("songs from same page");
                                // console.log(numbattles[0]['folder_id']+' '+numbattles[1]['folder_id'])
                                $('.second-cont').html('');
                                numbattles.pop()
                            } else {


                                var first_mId = numbattles[0]['song_id'];
                                var sec_mId = numbattles[1]['song_id'];
                                var battle_title = numbattles[0]['artist_name'] + ' ' + `${
                                    numbattles[0].song_title
                                }` + ' ' + ' vs ' + numbattles[1]['artist_name'] + ' ' + `${
                                    numbattles[1].song_title
                                }`;
                                var key = 'battlesCre';
                                var request = $.ajax({
                                    url: "admin/servers/server.php",
                                    type: "POST",
                                    headers: {
                                        authorization: 'Bearer ' + user.accessToken
                                    },
                                    data: {
                                        key,
                                        first_mId,
                                        sec_mId,
                                        battle_title,
                                        agentIDGLO,
                                        userId
                                    },
                                    dataType: "json"
                                });
                                request.done(function (response) {
                                    console.log(response)
                                    if (response.info == true) {

                                        $("#info-alert-modal").modal('toggle');


                                        $('.first-cont').html("");
                                        $('.second-cont').html("");
                                        $('.contestant-prev').addClass('d-none');
                                        $('.results').html("")
                                    } else {
                                        $("#failed-alert-modal").modal('toggle');
                                    }

                                })


                            }


                        }
                    } else {
                        alert("login")
                    }
                }) 


                


            })
            social_action();

        })


    });
}


function battles(data =[], battlesSeriesId = '') {
    $(".battles").unbind('click').on('click', function () {

        $('.home-activities, .search-activities, .page-activities, .all-user-activities').addClass('d-none');
        // $('.page-activities').addClass('d-none');
        $('.battle-activities, .first-nav').removeClass('d-none');
        // // $('.page-activities').hide();
        // $('.all-user-activities').addClass('d-none');

        $('.to-home, .view-a').removeClass('active');
        $(this).addClass('active')

        addbattles(data)
    })


    // $("#battles-header").get(0).scrollIntoView();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            var userId = user.uid;
            var token = user.accessToken;

        } else {
            var token = '';

        }
        // console.log(user.accessToken)


        var key = 'battles';
        var request = $.ajax({
            url: "admin/servers/index.user.php",
            type: "POST",
            data: {
                key,
                userId
            },
            dataType: "json",
            headers: {
                Authorization: 'Bearer ' + token
            }


        });
        request.done(function (battles) {
            console.log(battles)


            if (battles.length > 0) {


                if (battles.length > 0) { // //console.log(battles)
                    $('.num-battles').html(battles.length);
                    let battleLink = [];
                    $.each(battles, function (index, battle) {

                        if (battle[0].battle_music_id == battlesSeriesId) {
                            var linkClass = 'd-none';
                            battleLink.push(battle);

                            $('.battle-wrapper').addClass('d-none')
                        } else {
                            var linkClass = 'd-none';
                        }
                    })


                    if (battleLink.length > 0) {
                        battleAppender(battleLink[0], user);

                        // show all battles
                        $(`.battles-container`).append(`<div class="bg-white mt-1 pt-1 pb-1 show-all-battle"><button class="btn  w-100  btn-outline-primary">Show all</button></div>`);
                        $('.show-all-battle').unbind('click').on('click', function () {
                            $('.battle-wrapper').remove();
                            $.each(battles, function (index, battle) { // console.log(battle)

                                battleAppender(battle, user)
                            })

                            $(this).hide('');

                            social_action();
                            GoPage();
                            home_menu();

                        });
                    } else {
                        $.each(battles, function (index, battle) { // console.log(battle)

                            battleAppender(battle, user)
                        })

                    }


                }

                social_action();
                GoPage();
                home_menu();
            } else { // console.log("no battles available")
            }

        });
    })

}


function battleAppender(battle, user) {
    if (battle.length == 2) {

        if (user) {
            if (battle[0].done_action_battle == true) {
                var color1 = 'social-num-primary'
            } else {
                var color1 = '';
            }

            if (battle[1].done_action_battle == true) {
                var color2 = 'social-num-primary'
            } else {
                var color2 = '';
            }
            if(battle[0].suspended==true){
              
                var showSup="bg-danger btn-danger"
            }else{
                var showSup=""
            }

        } else {
            var showSup=""
            var color1 = '';
            var color2 = '';
        }


        // link class


        $(".battles-container").append(`

                <div class="battle-wrapper " style="margin-left: -10px; margin-right: -10px;">

                <div class="card mb-1 p-1" >


                <div class="d-flex justify-content-between">
                <h6 class=" darken-color" >
                <span class="bold-text darken-color" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-x" viewBox="0 0 16 16">
                <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                <path d="M6.146 5.146a.5.5 0 0 1 .708 0L8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 0 1 0-.708z"/>
                </svg>
                Battle Series <span class="text-primary">#${
            battle[0].battle_music_id
        }</span>
                </h6>
               

                        
                
                <a class="float-end mr-2 p-1 darken-color share-battle">
                   <input class="battle-id" type="hidden" value="${
            battle[0].battle_music_id
        }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                    </svg>                                           
                </a>
                </div>

                <div class="">


                <div class="d-flex mb-0 a  linear-back justify-content-between   bg-white battle-number">



                <div class="card p-0 mb-0  position-relative  p-1 " style="width: 9rem; border-bottom: none;border: none;">
                                


                <div class="card-body p-0 pb-0 mb-0 pt-0 position-relative ">

                <p class="p-0 bold-text m-0">${
            battle[0]['artist_name']
        }: </p>
                    <div class=" page-select  p-0 dark-gd-text" style="background-image: url('${
            battle[0]['artwork']

        }');background-size: cover; height:100px; padding-top:60px; ">


                <input type="hidden" class="folder-id" value="${
            battle[0]['folder_id']
        }">
                                <input type="hidden" class="folder-name" value="${
            battle[0]['artist_name']
        }">
                <input type="hidden" class="song-title" value="${

            battle[0]['song_title']
        }">

                <input type="hidden" class="song-id" value="${

            battle[0]['music_id']
        }">

                        
                    </div>
                    

                <p class="p-0 m-0 mb-3"><span> ${
            battle[0]['song_title']
        }</span></p>


                
                <button value="${
            battle[0]['music_id']
        }" class="border-0 social-num w-100 action-social  bg-white font-19 d-block position-absolute bottom-0 start-0 ${color1}"
                                            type="button" data-bs-toggle="collapse"
                                            data-bs-target="" aria-expanded="true"
                                            aria-controls="collapseThree">
                                            <input class="social-name" type="hidden" value="battleVote">
                                            <input class="battle-id" type="hidden" value="${
            battle[0]['battle_music_id']
        }">
                                            <input class="color-state" type="hidden" value="${
            battle[0]['like_done']
        }">
                                            <span class=" cl-changer mr-2"> 
                                            
                                            Vote 
                                            
                                            </span>               
                                            <span class="updated-value "> ${
            battle[0]['music_votes']
        }</span>
                </button>

                
                </div>

                </div> 




                                    <h4 class="pt-5  text-success">
                                        <i class="fas fa-exchange-alt"></i>
                                        <br>
                                        Vs
                                        </h4>









                                        <div class="card p-0 mb-0  position-relative  p-1 " style="width: 9rem; border-bottom: none;border: none;">
                                


                                        <div class="card-body p-0 pb-0 mb-0 pt-0 position-relative ">
                        
                                        <p class="p-0 bold-text m-0">${
                                    battle[1]['artist_name']
                                }: </p>
                                            <div class=" page-select  p-0 dark-gd-text" style="background-image: url('${
                                    battle[1]['artwork']
                        
                                }');background-size: cover; height:100px; padding-top:60px; ">
                        
                        
                                        <input type="hidden" class="folder-id" value="${
                                    battle[1]['folder_id']
                                }">
                                                        <input type="hidden" class="folder-name" value="${
                                    battle[1]['artist_name']
                                }">
                                        <input type="hidden" class="song-title" value="${
                        
                                    battle[1]['song_title']
                                }">
                        
                                        <input type="hidden" class="song-id" value="${
                        
                                    battle[1]['music_id']
                                }">
                        
                                                
                                            </div>
                                            
                        
                                        <p class="p-0 m-0 mb-3"><span> ${
                                    battle[1]['song_title']
                                }</span></p>
                        
                        
                                        
                                        <button value="${
                                    battle[1]['music_id']
                                }" class="border-0 social-num w-100 action-social  bg-white font-19 d-block position-absolute bottom-0 start-0 ${color2}"
                                                                    type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="" aria-expanded="true"
                                                                    aria-controls="collapseThree">
                                                                    <input class="social-name" type="hidden" value="battleVote">
                                                                    <input class="battle-id" type="hidden" value="${
                                    battle[1]['battle_music_id']
                                }">
                                                                    <input class="color-state" type="hidden" value="${
                                    battle[1]['like_done']
                                }">
                                                                    <span class=" cl-changer mr-2"> 
                                                                    
                                                                    Vote 
                                                                    
                                                                    </span>               
                                                                    <span class="updated-value "> ${
                                    battle[1]['music_votes']
                                }</span>
                                        </button>
                        
                                        
                                        </div>
                        
                                        </div> 
                        
                        

                            
                    


                        
                    </div>
                    
                       <div class="d-flex justify-content-between ">
                        <button class="w-75 btn btn-outline-danger text-bold suspend-battle ${showSup}" value="${battle[0].battle_music_id}">Suspend Battle</button> 
                        <button class="btn btn-primary">ReNew</button>
                       </div>
                    
                        
                    </div>
                    </div>

                    
                    
                    </div>


           `).show('slow');

        copySHARELINK();
        battleSetting(user);
    } else { // console.log(battle)
    }
   
}

function battleSetting(user){
    $('.suspend-battle').unbind('click').on('click', function(){
        var battleId=$(this).val().trim();
        $('.suspend-battle').removeClass('await');
        $(this).addClass('await');
        if(user){
            let key = "battle-hold";
                var request = $.ajax({
                    url: "admin/servers/server.php",
                    async: false,
                    type: "POST",
                    headers: {
                        Authorization: 'Bearer ' + user.accessToken
                    },
                    data: {
                        key,
                        battleId
                    },
                    dataType: "json"
                });
                request.done(function (data) {
                    if(data.info == true){
                        $("#info-alert-modal").modal('toggle');
                        $('.await').addClass('bg-danger');
                    }else{
                        $("#failed-alert-modal").modal('toggle')
                    }
                  

                
                })
            
        }else{
            alert('login')
        } 
        
    })
}

function appexINIT(data) {
    var x_values = [];
    var y_values = [];

    $.each(data, function (key, item) {
        if (key < 10) {
            // console.log(item['likes'])
            // item['x_value'].push(x_values);
            y_values.push(item['artist_name']);
            x_values.push(item['likes']);
        }
    })


    var colors = ['#711228c7'];
    var dataColors = $("#apex-bar-1").data('colors');
    if (dataColors) {
        colors = dataColors.split(",");
    }
    var options = {
        chart: {
            height: 470,
            type: 'bar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        dataLabels: {
            enabled: true
        },
        series: [
            {
                data: x_values
            }
        ],
        colors: colors,
        xaxis: {
            categories: y_values
        },
        states: {
            hover: {
                filter: 'none'
            }
        },
        grid: {
            borderColor: '#f1f3fa'
        }
    }

    var chart = new ApexCharts(document.querySelector("#apex-bar-1"), options);

    if (chart.render()) {
        $("#apex-bar-1").attr('id', '');
    };
}


function advertTOP4(data) {

    $(".playlist").append(`
    <div class="card music-container mb-1">
    <div class="home-item p-2">
    <h5 class="header-title   p-1  bg-primary-gd" style="width: 23%; color: #1f4d65;">Bottom 4</h5>
    <p class="left p-1 pt-0">Do you think these four songs deserve it?</p>
     <div class="d-flex advert-top-4 advert-wrapper flex-wrap linear-back justify-content-evenly  bg-white">

          
    
        
      </div>
     </div>
     </div>
    `);

    $('.advert-top-4').html('');
    var lastFOURSIZE = data.length - 1;
    for (var i = 0; i < 4; i++) {
        var item = data[lastFOURSIZE - i];
        // var item=data[count_scroll];
        if (item['likes'] > 1) {
            var votes = 'Votes';
        } else {
            var votes = 'Vote';
        }
        $(`.advert-top-4`).append(`
            <div class="card p-0  page-select m-1 " style="width: 8rem">
            
            <input type="hidden" class="folder-id" value="${
            item['id']
        }">
                         <input type="hidden" class="folder-name" value="${
            item['folder_name']
        }">
                         <input type="hidden" class="song-title" value="${
            item['song_title']
        }">
                         <input type="hidden" class="song-id" value="${
            item['song_id']
        }">
                         <input type="hidden" class="agent-id" value="${
            item['agent_id']
        }}">

                <div class="card-body pb-0 pt-0 position-relative center">
                    <div class=" center p-0 dark-gd-text" style="font-size: 50px;">
                        <img src="${
            item['artwork']
        }" class="rounded-circle " height="60" width="60">
                    </div>
                    <code>${
            item['likes']
        }    ${votes}</code>
                    <button class="btn btn-outline-danger font-10 m-0 p-0 one-line-txt w-100">${
            item['artist_name']
        }</button>

                    

                    

                
                </div>
            </div>
  
        `);

    }

    GoPage();

}


function theAppender(item, containerName, cols) {

    // console.log(item)
    // console.log("the contaner name is " + containerName)


    // if (item['followers'] <= 1) {
    //     var surfix = 'er';
    // } else {
    //     var surfix = 'ers';
    // }

    if (item['state_followed'] == 1) {
        var following = "following";
    } else {
        var following = "follow";
    }

    // colors users
    // //console.log(item['like_done'])
    if (item['like_done'] == '1') {
        var like_btn_color = 'social-num-primary';

    } else {
        var like_btn_color = 'social-num';

    }

    if (item['dislike_done'] == '1') {
        var dislike_btn_color = 'social-num-primary';

    } else {
        var dislike_btn_color = 'social-num';

    }


    var stars = '';

    if (item['position_competition'] == 1) {
        var trophy = `<span class="text-gradient font-20"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trophy" viewBox="0 0 16 16">
                <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                </svg>
        
          </span>`;

        for (let index = 0; index < 5; index++) {
            stars += `
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#c59028" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              
              
            `;

        }
    } else {
        var trophy = '';
    }


    $(`${containerName}`).append(`
                <div class="music-container  ${cols}">
                <div class="card mb-1">
                <div class="card-body p-2 border-c">
                
                <div class="d-flex justify-content-between  p-0">
                    <button class="header-title artist-name p-0 m-0 border-0 bg-white">
                
                        ${trophy} 
                        ${
        item['artist_name']
    }    
                    
                    
                    </button>


    
                    

                    <div class="d-flex header-follow  p-0 m-0">
                    
                    
                    


                    <button value="${
        item['folder_id']
    }" class="btn p-0 m-0 rounded follow-btn    bold-text darken-color">
                        
                                                ${following}                  
                    <input class="social-name" type="hidden" value="follow">
                    </button><span class="surfix"></span>

                    <button class="disabled updated-value text-primary follow-page btn p-0 m-0 rounded float-end   bold-text darken-color">
                    #${
        item['followers']
    }
                         
                    </button> 

                    
                    </div>
                </div>

                <div class="">
                    <p class="p-0 m-0"><span class="text-primary">#Title:</span> ${
        item['song_title']
    }</p>



            

                </div>





                <div class="row p-2 pt-0">
                    <div class="audio-container cover-image" style="background-image: url('${
        item['artwork']
    }');background-size: cover; height:360px !important; padding-top:70px; border-radius: 15px;">
                    
                    <input class="artist-name" type="hidden" value="${
        item['artist_name']
    }"> 
                 

                        <audio controls controlsList="nodownload" id="audio">
                            <input type="hidden" class="music-id" value="${
        item['music_id']
    }">
                            <source src="assets/uploads/${
        item['dirname']
    }/${
        item['song']
    }.mp3"  type="audio/ogg">
                            Your browser does not support the audio element.
                        </audio>
                        

                        


                    

                        <a class="facebook text-primary social-icon" href="www.facebook.com">
                            <i class="fab fa-facebook"></i>
                        </a>

                        




                    </div>

                
                </div>


                <div class="accordion mt-4" id="accordionExample">
                    <div class="accordion-item  border-0">

                        <div class="d-flex justify-content-between">

                        <h5 class="">Position <span class="text-primary">#${
        item['position_competition']
    }</span> of <span class="text-primary">${num_comp}</span> in the competition
                    
                        </h5>

                        <h5>
                            <a href="#" class=" page-select border-0 text-primary home-activities  header-title one-line-txt font-12">
                            <span><i class="fas fa-vector-square"></i></span>  Page
                            <input type="hidden" class="folder-id" value="${
        item['folder_id']
    }">
                                                            <input type="hidden" class="folder-name" value="${
        item['artist_name']
    }">
                                                            <input type="hidden" class="song-id" value="${
        item['song_id']
    }">
                                 </a>

                        </div>
                        </h5>


                        <div class="d-flex  ">
                        <h5 class="left"><span class="text-muted">
                        ${
        item['views']
    }   </span> Views 
                        
                        </h5>
                        <div class="p-1"></div>
                        <div class="p-1"></div>
                        
                        <h5 class="left"><span class="text-muted">
                        ${
        item['number_downloads']
    }   </span>
                        
                        <a href="assets/uploads/${
        item['dirname']
    }/${
        item['song']
    }.mp3" class="text-dark border-0 downloaded" download="">
                    <input type="hidden" class="music-id" value="${
        item['music_id']
    }"></input>

                                    Download
                                </a>
                        
                        </h5>

                        <div class="p-1"></div>
                        <div class="p-1"></div>
                        <div class="p-1"></div>

                        <h5 class="float-end  text-muted">${
        item['month_upload']
    }</h5>
                        
                        

                        



                        </div>

                        <div class="d-flex justify-content-between">
                            <div class="d-flex flex-column  center">

                            <button value="${
        item['music_id']
    }" class="border-0  action-social  bg-white font-19 ${like_btn_color} d-block "
                                type="button" data-bs-toggle="collapse"
                                data-bs-target="" aria-expanded="true"
                                aria-controls="collapseThree">
                                <input class="social-name" type="hidden" value="like">
                                <input class="color-state" type="hidden" value="${
        item['like_done']
    }">
                                <span class=" cl-changer"> 
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
                                
                                </span>
                                <span class="updated-value ">${
        item['likes']
    }</span>
                                </button>


                            </div>
                            <div class="d-flex flex-column  center">

                                    <button value="${
        item['music_id']
    }" class="collapsed border-0 view-comments  bg-white font-19 social-num d-block"
                                            type="button" data-bs-toggle="collapse"
                                            data-bs-target="" aria-expanded="true"
                                            aria-controls="collapseThree">
                                            <input class="artist-name" type="hidden" value="${
        item['artist_name']
    }">
                                            <input class="song-title" type="hidden" value="${
        item['song_title']
    }">
                                                                                

                                            <span class="text-muted ">  
                                            
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>
                                            
                                            </span>
                                            <span class="text-muted updated-comment">${
        item['num_comments']
    }</span>
                                    </button>
                        
                            </div>
                            
                            <div class="d-flex flex-column  center">

                                <button value="${
        item['music_id']
    }" class="collapsed border-0  action-social   font-19 ${dislike_btn_color} d-block "
                                type="button" data-bs-toggle="collapse"
                                data-bs-target="" aria-expanded="true"
                                aria-controls="collapseThree">
                                <input class="social-name" type="hidden" value="dislike">
                                <input class="color-state" type="hidden" value="${
        item['dislike_done']
    }">

                                <span class="cl-changer ">
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heartbreak" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8.867 14.41c13.308-9.322 4.79-16.563.064-13.824L7 3l1.5 4-2 3L8 15a38.094 38.094 0 0 0 .867-.59Zm-.303-1.01c6.164-4.4 6.91-7.982 6.22-9.921C14.031 1.37 11.447.42 9.587 1.368L8.136 3.18l1.3 3.468a1 1 0 0 1-.104.906l-1.739 2.608.971 3.237Zm-1.25 1.137a36.027 36.027 0 0 1-1.522-1.116C-5.077 4.97 1.842-1.472 6.454.293c.314.12.618.279.904.477L5.5 3 7 7l-1.5 3 1.815 4.537Zm-2.3-3.06C.895 7.797.597 4.875 1.308 3.248c.756-1.73 2.768-2.577 4.456-2.127L4.732 2.36a1 1 0 0 0-.168.991L5.91 6.943l-1.305 2.61a1 1 0 0 0-.034.818l.442 1.106Z"/>
                                </svg>
                                                    
                                </span>
                                <span class="updated-value">${
        item['dislikes']
    }
                                </span>
                                </button>

                            </div>


                            <div class="d-flex   center">

                                <button value="${
        item['music_id']
    }" class="collapsed share-link border-0  font-19 social-num d-block"
                                type="button" data-bs-toggle="collapse"
                                data-bs-target="" aria-expanded="true"
                                aria-controls="collapseThree">

                                <input type="hidden" class="folder-id" value="${
        item['folder_id']
    }">
                                <input type="hidden" class="folder-name" value="${
        item['artist_name']
    }">
                    <input type="hidden" class="song-title" value="${
        item['song_title']
    }">

                    <input type="hidden" class="song-id" value="${
        item.song_id
    }">

                    


                                <input class="social-name" type="hidden" value="share">
                                      
                                <span class="cl-changer ">
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
                                <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
                                <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
                                </svg>
                                                    
                                </span>
                                    <span class="updated-value">${
        item['share']
    }
                                    </span>
                                </button>

                            </div>

                        </div>

                    
                            <div class="accordion-body p-0 comment-container">
                                <h4 class="header-title mt-1">Comments</h4>

                                <ul class="conversation-list chat-app-conversation p-0 "
                                    data-simplebar>

                                

                                </ul>

                            </div>
                        
                    </div>
                </div>

                </div>
                </div>

                </div>

  `);

    //    alert( $(".music-container").css('height'));
    GoPage();
    view_comments();
    social_action();
    social_follow();
    copySHARELINK();
    views()
    btn_back();


}


function views() {
    $("audio").unbind("play").on('play', function () {
        $("audio").not(this).each(function (index, audio) {
            audio.pause();
        });

        let key = 'views';
        var music_id = $(this).find('.music-id').val().trim();
        var request = $.ajax({
            url: "admin/servers/index.user.php",
            type: "POST",
            data: {
                key,
                music_id
            },
            dataType: "html"
        });
        request.done(function (data) {
            console.log(data)

        })
    });


    $('.downloaded').unbind('click').on('click', function () {
        var music_id = $(this).find('.music-id').val().trim();
        var key = "downloads"
        // console.log(music_id)
        var request = $.ajax({
            url: "admin/servers/index.user.php",
            type: "POST",
            data: {
                key,
                music_id
            },
            dataType: "html"
        });
        request.done(function (data) {
            console.log(data)

        })

    })


}


function social_action() {
    $('.action-social').unbind('click').on('click', function (e) {

        e.preventDefault();


        let song_id = $(this).val().trim();
        var socialName = $(this).find('.social-name').val();
        if (socialName == 'battleVote') {
            var battleId = $(this).find('.battle-id').val();
        } else {
            var battleId = 0;
        }
        let colorState = $(this).find('.color-state').val().trim();

        $('.updated-value').attr({'id': ''})
        $(this).find('.updated-value').attr({'id': 'newvalue'});

        $('.action-social').removeClass('color-container');
        $(this).addClass('color-container');
        $(this).addClass('disable');


        onAuthStateChanged(auth, (user) => {
            if (user) {
                $('.username').html(user.displayName)

                var userId = user.uid;

                currentUser = user.displayName;

                let key = "social_item";
                var request = $.ajax({
                    url: "admin/servers/index.user.php",
                    async: false,
                    type: "POST",
                    headers: {
                        Authorization: 'Bearer ' + user.accessToken
                    },
                    data: {
                        key,
                        song_id,
                        socialName,
                        userId,
                        battleId
                    },
                    dataType: "json"
                });
                request.done(function (data) {
                    console.log(data);

                    if (data['info'] == false) { // console.log('login first');
                    } else {

                        $('#newvalue').html(data['newValue']);
                    }


                    if (data.colorState == true) {
                        $('.color-container').addClass('social-num-primary');
                    } else if (data.colorState == false) {
                        $('.color-container').removeClass('social-num-primary');
                    }


                });


                // algorith hs512
            } else {

                $('.comment-input-wrapper').addClass('d-none');
                $('.login').removeClass('d-none');


                const provider = new FacebookAuthProvider();
                provider.addScope('public_profile');
                auth.languageCode = 'it';
                provider.setCustomParameters({'display': 'popup'});
                signInWithPopup(auth, provider).then((result) => { // The signed-in user info.
                    const user = result.user;
                    const credential = FacebookAuthProvider.credentialFromResult(result);
                    const accessToken = credential.accessToken;
                    $('.username').html(user.displayName)
                    //     profileimage.scr=user.photoURL;
                    $('#profile-image').attr('src', user.photoURL);
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.email;
                    const credential = FacebookAuthProvider.credentialFromError(error);
                });

            }
        });


        if (colorState === '1') {
            $(this).attr({'class': 'social-num'});
            $(this).find('.color-state').attr({value: '0'});

        } else if (colorState === '0') {

            $(this).attr({'class': 'social-num-primary'})
            $(this).find('.color-state').attr({value: '1'});


        }


        // //console.log(newValue)

    })
}

function social_follow() {
    $(".follow-btn").unbind('click').on('click', function (e) {
        e.preventDefault();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                $('.username').html(user.displayName);
                var userId = user.uid;

                var key = 'following';
                $(this).html('Following');
                $(this).closest('.header-follow').find('.surfix').html("");

                $('.updated-value').removeClass('followed');
                $(this).closest('.header-follow').find('.updated-value').addClass('followed');
                let page_id = $(this).val().trim();
                var request = $.ajax({
                    url: "admin/servers/index.user.php",
                    type: "POST",
                    headers: {
                        Authorization: 'Bearer ' + user.accessToken
                    },
                    data: {
                        key,
                        page_id,
                        userId
                    },
                    dataType: "json"
                });
                request.done(function (data) {
                    console.log(data)
                    $('.followed').html(`<span class="p-2  text-primary font-13">#${
                        data['newValue']
                    }</span>`);
                    if (data['colorState'] == true) {
                        $('#color').css({'color': '#3bafda', 'font-weight': 'bold !important'});

                    } else {
                        $('#color').css({'color': 'black'});

                    }
                })

            } else {
                const provider = new FacebookAuthProvider();
                provider.addScope('public_profile');
                auth.languageCode = 'it';
                provider.setCustomParameters({'display': 'popup'});
                signInWithPopup(auth, provider).then((result) => { // The signed-in user info.
                    const user = result.user;
                    const credential = FacebookAuthProvider.credentialFromResult(result);
                    const accessToken = credential.accessToken;
                    $('.username').html(user.displayName)
                    //     profileimage.scr=user.photoURL;
                    $('#profile-image').attr('src', user.photoURL);
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.email;
                    const credential = FacebookAuthProvider.credentialFromError(error);
                });
            }


        })
    })
}


function GoPage() {

    $('.page-select').unbind('click').on('click', function (e) {

        e.preventDefault();

        $('.logo-text').removeClass('active');

        $(`#page-playing`).html(`
                <div class="center w-100 battle-wrapper mt-5">
                <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>

                <p>Please wait...</p>

                </div>    
             `);


        playlistScrlCTRL = false;
        // restrictBARCOMMENT = true;

        $(".home-activities").hide();
        // $(".home-activities"). css('visibility','hidden')
        // $(".navbar-custom").hide();
        $(".agent-artist-activities").hide();
        $(".page-activities").show("");
        $('.page-select').css({'border': '1px solid #e7eaed'});
        $(this).css({'border': '1px solid #1f4d65'})
        var page_id = $(this).find('.folder-id').val().trim();
        page_idGlo = page_id;

        var page_name = $(this).find('.folder-name').val().trim();
        var song_id = $(this).find('.song-id').val().trim();


        $('.home-activities, .battle-activities, .agent-activities, .all-user-activities, .search-activities').addClass('d-none');
        $('.page-activities, .first-nav').removeClass('d-none');
        // $('.battle-activities').addClass('d-none');
        // $('.agent-activities').addClass('d-none');
        // $('.all-user-activities').addClass('d-none');
        // $('.search-activities ').addClass('d-none');
        $(".page-title").html(page_name);
        $('.page-select').attr('id', '');
        $(this).attr("id", "current");


        // if ($(this).find('.close-bar').val() == 'true') {
        //     $('.left-side-menu').toggle();
        // }


        var agentIDGLO = '';
        // let statePAGELINK = []
        page_view_home(song_id, page_name);


    })
}


// links

function copySHARELINK() {
    $('.share-link').off('click').click(function () {

        var url = window.location.href.split('?')[0];
        if (location.href = url) {

            let pd = $(this).find('.folder-id').val();
            let artist = $(this).find('.folder-name').val();
            let title = $(this).find('.song-title').val();
            let song_id = $(this).find('.song-id').val();

            // console.log(title);
            var obj = {
                pd: pd,
                artist: artist,
                title: title,
                si: song_id

            }
            // console.log()
            var link = location.toString().replace(location.search, "");
            link = location.href + '?' + $.param(obj);
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val(link).select();
            document.execCommand('copy');
            $temp.remove();
            location.href = link
            // alert("copied" + user);
        }
    })

    $('.share-battle').unbind('click').bind('click', function (e) {
        var battleID = $(this).find('.battle-id').val().trim();
        var link = `http://localhost/music/agent.html?battle-series=${battleID}`;
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(link).select();
        document.execCommand('copy');
        $temp.remove();
        location.href = link
    })

}


function getUrlParams() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// submit home
function links() {
    let url_param = getUrlParams();
    console.log(url_param);
    if (jQuery.inArray("pd", url_param) !== -1) {
        var artistNAME = url_param['artist'];
        artistNAME = artistNAME.replace(/\+/g, '%20');
        artistNAME = decodeURIComponent(artistNAME);

        var song_title = url_param['title'];
        song_title = song_title.replace(/\+/g, '%20');
        song_title = decodeURIComponent(song_title);

        var page_id = url_param['pd'];
        var song_id = url_param['si'];
        page_idGlo = page_id;

        // console.log(song_title)

        $(".page-title").html(artistNAME);

        $(".home-activities").hide();
        $(".page-activities").show();


        if (page_idGlo !== undefined) {
            page_view_home(song_id, artistNAME);

            back_to_home_by_link();
        }


    } else if (jQuery.inArray("battle-series", url_param) !== -1) {
        let battlesSeriesId = parseInt(url_param['battle-series']);
        let data = [];
        // console.log(battlesSeriesId)
        $('.home-activities').addClass('d-none');
        $('.page-activities').addClass('d-none');
        $('.battle-activities').removeClass('d-none');
        // $('.page-activities').hide();
        $('.all-user-activities').addClass('d-none');

        $('.to-home').removeClass('active');
        $('.battles').addClass('active')
        battles(data, battlesSeriesId);

        // console.log("not present")
        // var pageSTATELINK={'link':false};

    } else {
        console.log('no link')
    }
}

function back_to_home_by_link() {
    $(".to-home").on("click", function (e) { // $('.navbar-custom').show();

        e.preventDefault();
        // e.preventPropagation();

        var url = window.location.href.split('?')[0];
        // console.log(url)
        // location.href = url;
    })

}
// page
// submit home buses buy link
function page_view_home(song_id, page_name) {


    if (song_id == null || song_id == 'null') {


        $('.playlist-title').hide();
        $("#page-playing").html(`
     
    <div class="w-100 center empty-wrapper">

        <div class="d-fle">
            <div class="d-flex float-center">
                <h1 class="empty-folder-big darken-color"><i class=" far fa-folder-open"></i>
                </h1>
                <h1 class="empty-folder-big"><i class="far fa-file-audio"></i>
                </h1>
            </div>
        </div>

        <h1 class="empty-upload-big darken-color"><i class="fas fa-cloud-upload-alt"></i>
        </h1>
        <h5 class="font-35 darken-text center">${page_name}</h5>

        <h5 class="text-dark">This page is empty

        </h5>
        <p>upload  mp3</p>

    </div>
    
    `);

        $("#music-list").html(`
        <div class="w-100 center">
        <button class="btn btn-outline-info w-75 center m-1 btn-rounded border-secondary dark-gd-text">0 followers</button>
        </div>
    
    `);
        var page_length = 0;
        select_audio(page_name, page_length);

        btn_back();

    } else {
        $('.folder-name').html(page_name);
        // let page_id = statePage['page_id'];
        let key = "show_page";
        var page_id = page_idGlo

        // var data = request(key, page_id);
        var request = $.ajax({
            url: "admin/servers/index.user.php",
            type: "POST",
            data: {
                key,
                page_id
            },
            dataType: "json"
        });
        request.done(function (data) {


            $("#page-playing").html("");

            var page_pending = data[0]['pending_page'];

            // now playing
            // //console.log(data)

            // var item = data[0];
            var item = [];
            $.each(data, function (index, itemSONG) {
                // //console.log(song_id)
                // console.log(itemSONG['song_id'] + 'and' + song_id)
                if (itemSONG['song_id'] == song_id) {
                    item = itemSONG;
                    // console.log("macht")
                }

            })

            if (item.length == 0) {
                item = data[0];
            }


            $('.page-activities').show()

            // console.log(item)


            $('.followers').html(data[0]['followers']);

            if (item['state_followed'] == 1) {
                var following = "following";
            } else {
                var following = "follow";
            }

            if (item['like_done'] == '1') {
                var like_btn_color = 'social-num-primary';


            } else if (item['like_done'] == '0') {
                var like_btn_color = 'social-num';

            }

            if (item['dislike_done'] == '1') {
                var dislike_btn_color = 'social-num-primary';

            } else {
                var dislike_btn_color = 'social-num';

            }
            // show the page music
            let containerName = '#page-playing';
            let cols = "col-xl-12 col-lg-12";
            theAppender(item, containerName, cols)


            $("#music-list").html("");


            $('.total-songs').html(data.length);


            // var page_pending=

            $.each(data, function (key, item) {


                if (item['paid_for'] == true) {
                    var bg = 'bg-success';
                    var buttonVALIDATE = 'd-block btn-outline-info';
                    var validateMSG = 'PAID';
                } else {
                    var bg = 'bg-danger';
                    var validateMSG = 'PAY';
                    if (1 == 1) {
                        var buttonVALIDATE = 'd-block  btn-outline-danger';
                    } else {
                        var buttonVALIDATE = 'd-none';
                    }

                }
                $("#music-list").append(`
                    <a  class="  list-select ">
                    <input class="song-key" type="hidden" value="${key}">
                    <div class="d-flex align-items-start pb-3 ">
                        <div class="position-relative">
                            <span class="user-status ${bg}"></span>
                            <img src="${
                    item['artwork']
                }" height="50px" width="50px" class="me-2 rounded"
                                width="50px" alt="user" />
                        </div>
                        <div class="flex-1">
                        <h5 class="mt-0 mb-0 font-14">

                        ${
                    item['artist_name']
                }
                    </h5>

                    
                    
                

                            <div class=" mb-0 text-muted font-14">
                            <button value="${
                    item['music_id']
                }" class="btn float-end   p-0 bg-danger ml-2 text-white delete"><i class="fa fa-trash-alt"></i></button>
                            <button value="" class="btn float-end   p-0  m-2 text-white"></button>

                                <button value="${
                    item['music_id']
                }" class="btn float-end   p-0 ${buttonVALIDATE} ml-2 validate">${validateMSG}

                <input type="hidden" class="page-id" value="${
                    item['folder_id']
                }">

                </button>

                              
                                <span class="badge badge-soft-danger">${
                    key + 1
                }</span>


                      <span class="w-75"><span class="dark-text">#Title:</span> ${
                    item['song_title'].replace('[www.grandtunes.com]', '')
                }</span>
                    <br>

                        <span class="w-75 font-10"><span class="dark-text ">Date:</span> ${
                    item['month_upload']
                }</span>

                       
                            </div>
                        </div>
                    </div>
                </a>
        
        
        
                `);


            })


            select_list(data);
            view_comments();
            social_action();
            validateUpload(page_pending)
            views();

            var page_length = data.length;
            select_audio(page_name, page_length)
        })

    }

}


function validateUpload(page_pending) {

    $('.validate').unbind('click').on('click', function () {


        onAuthStateChanged(auth, (user) => {
            if (user) {

                var userId = user.uid;
                var key = 'validate-music';
                var song_id = $(this).val().trim();
                var page_id = $(this).find('.page-id').val().trim();


                $(this).attr('class', 'btn  d-block btn-outline-info float-end p-0 bg-white text-primary border-success');
                $(this).html('PAID');

                var request = $.ajax({
                    url: "admin/servers/server.php",
                    type: "POST",
                    headers: {
                        Authorization: 'Bearer ' + user.accessToken
                    },
                    data: {
                        key,
                        song_id,
                        page_id,
                        userId
                    },
                    dataType: "json"
                });
                request.done(function (data) {
                    if (data.info == true) {
                        $("#info-alert-modal").modal('toggle');
                    } else {
                        $("#failed-alert-modal").modal('toggle');
                    }

                    console.log(data);
                })

            } else {

                alert("login first")

            }


        })


    })
}

function btn_back() {
    $(".to-home").unbind('click').on("click", function (e) {
        e.preventDefault();


        $('.home-activities, .first-nav').removeClass('d-none');

        // $('.page-activities').addClass('d-none');
        // $('.battle-activities').addClass('d-none');
        // $('.agent-activities').addClass('d-none');
        // $('.all-user-activities').addClass('d-none');
        
        $('.search-activities, .page-activities, .battle-activities, .agent-activities, .all-user-activities').addClass('d-none');

        $('.battles, .view-a').removeClass('active');
        $(this).addClass('active')

        // alert($(document).height())
        // $('.playlist').scrollTop($('.playlist')[0].scrollHeight);

        if (battlezone == true) {
            playlistScrlCTRL = false;
        } else {
            if (playlistScrlCTRL == false) { // alert("dont")
                playlistScrlCTRL = true;
                $(document).scrollTop($(document).height() - 1500);
                // page_scroller();
            } else { // alert("select")
                playlistScrlCTRL = true;
                $(document).scrollTop($(document).height() - 1500);

            }


        }

        // //console.log(scrollPOINT)
        // window.scrollTo({top: 10000000000000});


        if ($("#music-list").html("") && $("#page-playing").html("")) {
            $(".home-activities").show();
            $(".page-activities").hide();
        };

    })
}

function page_scroller() {
    alert(playlistScrlCTRL);
    $(document).scrollTop($(document).height());
}

function home_menu() {
    $('.home-menu').unbind('click').on('click', function () {
        $('.custom-menu-icon').removeClass('active');
        $('.custom-menu-icon').css('border: 2px solid #343a40');
        $(this).addClass('active', 'border-bottom-primary');

        $(this).css({'border-bottom': '2px solid red'});
        if ($(".music-container").show()) {
            if (battlezone == true) {
                playlistScrlCTRL = true;
            }
        }
    })
}

function view_comments() {
    $(".view-comments").unbind('click').on('click', function (e) {
        e.preventDefault();
        playlistScrlCTRL = false;
        $('.to-home').removeClass('active')
        $('.to-home').addClass('custom-menu-icon')

        if (playlistScrlCTRL == false) {
            $('.updated-comment').attr({'id': ''})
            $(this).find('.updated-comment').attr({'id': 'new-update-c-num'});

            var music_id = $(this).val();
            let key = "comments";
            $('.artist-name-comment').html($(this).find('.artist-name').val() + '  <span class=" text-muted">(' + $(this).find('.song-title').val().trim() + ')</span>')
            // var data = request(key, page_id);

            $('.comment-container').addClass('d-none');
            $('.comment-nav').removeClass('d-none');
            $('.top-nav-1').hide()
            $('footer').removeClass('d-none');
            $('.music-container').hide();
            $(this).closest('.music-container').show();
            $(this).closest('.music-container').find('.comment-container').removeClass('d-none');
           


            $('.comment-container').show();
            $('.comment-input-wrapper').removeClass('d-none');
            $('.comment-input-wrapper').addClass('d-block');

            var request = $.ajax({
                url: "admin/servers/index.user.php",
                type: "POST",
                data: {
                    key,
                    music_id
                },
                dataType: "json"
            });
            request.done(function (data) {
                $('.conversation-list').html("");

                if (data.length > 0) {

                    $.each(data, function (key, item) {
                        $('.conversation-list').append(`
                <li class="clearfix  bg-white">
                <div class="chat-avatar">
                    <img src="${
                            item['sender_image']
                        }"
                        width="42" class="rounded-circle av img-fluid"
                        alt="image" />
                    <i class="one-line-txt">${
                            item['time']
                        }</i>
                </div>
                <div class="conversation-text ">
                    <div class="ctext-wrap  border-1">
                        <i>${
                            item['sender_name']
                        }
                        </i>
                        <p class="">
                        ${
                            item['comment']
                        }

                        </p>
                    </div>
                </div>
            </li>
                
                `);

                    })
                } else {
                    $('.conversation-list').append(`
                <li class="clearfix  bg-white error-msg">
                
                <div class="center w-100 ">
                    <div class=" border-1">
                     <h1 class="p-0 font-35"> <i class=" far fa-comments"></i> </h1>
                        <p class="p-0 header-title">
                        No comments
                       

                        </p>
                    </div>
                </div>
            </li>
                
                `);
                }


            })

            $('.back-btn').on('click', function () {
                $('.footer-container').show() && $('.comment-container').hide() && $('.home-item').show() && $('.conversation-list').html("") && $('.music-container').show();
                // location.reload()
                playlistScrlCTRL = true;
            })

            comment(music_id);
        } else {
            alert()
        }

        $('.back-comment').unbind('click').on('click', function (e) { // alert()
            playlistScrlCTRL = true;
            if (playlistScrlCTRL == true) {

                $('.music-container').show();
                $('.comment-container').addClass('d-none');
                $('.comment-nav').addClass('d-none');
                $('.top-nav-1').show();
                $('footer').addClass('d-none')
            }

        })
    })


}

function comment(music_id) {
    $('#comment-form').unbind('submit').on('submit', function (e) {
        e.preventDefault();
        let comment = $('#comment-msg').val().trim();
        onAuthStateChanged(auth, (user) => {
            if (user && comment.length > 0) {
                let comment = $('#comment-msg').val().trim();
                $('.username').html(user.displayName)

                var userId = user.uid;
                var userName = user.displayName;
                var userPhotoUrl = user.photoURL;

                $('.error-msg').hide();
                let key = "comment";

                var request = $.ajax({
                    url: "admin/servers/index.user.php",
                    async: false,
                    type: "POST",
                    headers: {
                        Authorization: 'Bearer ' + user.accessToken
                    },
                    data: {
                        key,
                        music_id,
                        userName,
                        userId,
                        userPhotoUrl,
                        comment
                    },
                    dataType: "json",
                    // data: {token, projectId}
                });
                request.done(function (item) {

                    console.log(item)

                    let card_height = $(this).parent().closest('.music-container');
                    $('#new-update-c-num').html(item['commentVal'])
                    // console.log(card_height)
                    // window.scrollTo({top: 10000000000});

                    $('.conversation-list').prepend(`
                            <li class="clearfix  bg-white">
                            <div class="chat-avatar">
                                <img src="${userPhotoUrl}"
                                    width="42" class="rounded-circle av img-fluid"
                                    alt="image" />
                                <i class="one-line-txt">${
                        item['time']
                    }</i>
                            </div>
                            <div class="conversation-text ">
                                <div class="ctext-wrap  border-1">
                                    <i>${userName}</i>
                                    <p class="">
                                    ${
                        item['comment']
                    }

                                    </p>
                                </div>
                            </div>
                        </li>
                    
                    `);
                    // console.log(comment)
                });

                $(this).get(0).reset();
                // algorith hs512
            } else {

                $('.comment-input-wrapper').addClass('d-none');
                $('.login').removeClass('d-none');

                // console.log("user not available");

            }
        });


    })
}

function select_list(data) {
    $('.list-select').unbind('click').on('click', function () {

        $('.page-activities').animate({
            scrollTop: 0
        }, "fast");
        let songKey = $(this).find('.song-key').val();
        var item = data[songKey];
        $("#page-playing").html("");
        let containerName = '#page-playing';
        let cols = "col-xl-12 col-lg-12";
        theAppender(item, containerName, cols);
        view_comments();
        social_action();
        views();
    })
}


// By Maroon Temwa Mvula
// all rights reserved reserved
