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
$(document).ready(function () { // page



    links();
    userState();
    prize();
    renderHome();

    // $('.button-menu-mobile').unbind('click').on('click', function () {
    //     $('.left-side-menu').toggle();
    //     console.log('kjk');
    // })
    const audioClick=new Audio('assets/audio/tap.wav')
    $('.custom-menu-icon').on('click', function () {
        // alert('')

        audioClick.play();
        
        $('.custom-menu-icon').removeClass('active');
        $('.custom-menu-icon').css('border: 2px solid #343a40');
        $(this).addClass('active', 'border-bottom-primary');

        $(this).css({'border-bottom': '2px solid red'});

    })


})


function scrollers() {

    var lastScrollTop = 0;


    window.addEventListener("scroll", function () {

        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            $('.btn-srl-top').show('');
            $('.navbar-custom').css('background-color', '#4ec0fc');
            // $('.nav-2').show('');
            $('.search-button').removeClass('mt-1');


        } else {

            $('.navbar-custom').css('background-color', '#eff4f6');
            $('.search-button').addClass('mt-1');
        } lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);

    $('.btn-srl-top').click(function () {
        window.scrollTo({top: 0});
    })

}

function prize() {

    var key = 'home_music';

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
        console.log(data)
        grandprize();

        // $('.prize').html(`MK` + Intl.NumberFormat('en-US').format(data[0]['prize']) + '.00')
        // $('.current-winner').html(data[0]['artist_name'])
        // $('.votes').html(data[0]['likes'])
        // $('.month').html(data[0]['month'].toUpperCase());
        $('.top-3').html('');
        num_comp = data.length;

        theAppender(data[0]);


        $.each(data, function (key, item) {
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
                <img src="assets/images/${
                    item['artwork']
                }" class="rounded m-0" height="90px" alt="...">

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


        $.each(data, function (key, item) { // console.log(item)
            let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
            if (isMobile) {
                var contentDp = 0;

            } else {
                var contentDp = 3;
            }

            if (key <= contentDp) {
                num_comp = data.length;
                // theAppender(item)

            }


        })


        var count_scroll = 1;
        var height = $('body').height();


        $(document).scroll(function () {

            if (playlistScrlCTRL == true) { // console.log($(window).scrollTop() + screen.height > $('body').height());

                if (count_scroll < data.length) {


                    if ($(window).scrollTop() + screen.height > $('body').height()) { // if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
                        theAppender(data[count_scroll]);

                        scrollPOINT = $('.playlist').height();

                        console.log($('.playlist').height());
                        console.log($(document).height());
                        // window.scrollTo({ top: height });
                        if (count_scroll % 10 == 0) {
                            advertTOP4(data);
                        } else if (count_scroll % 2 == 0) {

                            $('.playlist').append(`

                                
                                
                                <div class="advert-1 card music-container center home-item position-relative mb-1">

                                        <h1 class=" border-0 mt-3 text-gradient"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-trophy" viewBox="0 0 16 16">
                                        <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                      </svg></h1>

                                        <h1 class="advert-text  border-0" >Competition in progress. <br>
                                        Tell your favorite artist to join.</h1>


                                        <div class="buble-pink"></div>
                                        <div class="buble-pink-sm"></div>
                                        <div class="buble-yellow"></div>
                                    
    
                                </div>
                                
                            
                            `)

                        } else if (count_scroll % 3 == 0) {

                            if ($('.playlist').append(`                           
                                <div class="col-xl-6 home-item music-container bg-white">
                                <h5 class="bg-primary-gd header-title p-1 " style="width: 50%; color: #1f4d65;">TOP 10</h5>

                                <p class="">Did your favorite artist make it</p>

                                    <div class="card  p-0 mt-0">
                                        <div class="card-body p-0 mb-1">
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

            } else {
                console.log("not true")
            }
        })

        SETpage_session();
        view_comments();

        social_action();
        social_follow();
        scrollers();
        battles();


    });


}


function grandprize() {
    var key = 'grandprize';

    var request = $.ajax({
        url: "admin/servers/index.user.php",
        async: false,
        type: "POST",
        data: {
            key
        },
        dataType: "JSON"
    });
    request.done(function (data) {
        $('.prize').html(`MK` + Intl.NumberFormat('en-US').format(data['prize_monthly']) + '.00')
        // $('.current-winner').html(data[0]['artist_name'])
        // $('.votes').html(data[0]['likes'])
        $('.month').html(data['month'].toUpperCase());
    })
}

function battles() {
    $(".battles").unbind('click').on('click', function () {
        playlistScrlCTRL = false;
        battlezone = true;

        if (playlistScrlCTRL == false) {
            $(".music-container").hide();

            $('.playlist').append(` <div class="center w-100 battle-wrapper mt-5 ">
                <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>

                <p>Please wait...</p>

            </div>`);

            var key = 'battles';
            var request = $.ajax({url: "admin/servers/index.user.php", type: "POST", data: {
                    key

                }, dataType: "json"});
            request.done(function (battles) {
                $('.battle-wrapper').html('');
                $('.battle-wrapper').remove();
                $('.playlist').append(`
                <div class=" float-start w-100 battle-wrapper">

                  <h4>Battles today</h4>
            

                </div>`);
                if (battles.length > 0) { // console.log(battles)
                    $.each(battles, function (index, battle) {
                        console.log(battle)


                        if ($(".playlist").append(`

                    <div class="battle-wrapper">
        
                    <div class="card mb-3 " style="border-top: 2px solid #4ebffb;">
                    <h5 class="bg-primary-gd header-title p-1 center" style="width: 50%; color: #1f4d65;">${
                            battle[0]['battle_title']
                        }</h5>

                    <div class="home-item ">
                    <div class="p-2 pb-0  ">
                        <h5 class="m-0 p-0  ">Battle id: <span class="text-muted">grandtunes${
                            battle[0]['battle_id']
                        }</span></h5>
                        <p class=" p-0 text-primary">Duration: 12:00am</p>
                    </div>
            
                     <div class="d-flex advert-top-4 mb-3 advert-wrapper flex-wrap linear-back justify-content-evenly   bg-white battle-number-${index}">
                            
                      
            
                    
            
            
            
                   
                        
                      </div>
                     </div>
                     </div>
                     
                     </div>
            
            
                    `)) {

                            $.each(battle, function (indexh, contestant) {
                                if (battle.length > indexh + 1) {

                                    if (indexh == 0) {
                                        var verses = `
                                        <h1 class="pt-5">
                                        <i class="fas fa-exchange-alt"></i>
                                        Vs
                                        </h1>`;
                                    } else {

                                        var verses = '';
                                    }
                                } else {
                                    var verses = '';
                                }

                                if (indexh == 0) {
                                    var shade = 'bg-success';
                                    var msg = "winning"

                                } else {
                                    var shade = 'bg-danger';
                                    msg = "losing"


                                }


                                $(`.battle-number-${index}`).append(`


                             <div class="card p-0   page-select p-1 " style="width: 8rem">
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
                                    <div class=" center p-0 dark-gd-text" style="background-image: url('assets/images/${
                                    contestant['artwork']

                                }');background-size: cover; height:121px; padding-top:70px; border-radius: 15px;">

                                        
                                    </div>
                                    <h5>${
                                    contestant['artist_name']
                                }</h5>

                                     <h6 class="${shade} " style="color: #1f4d65;">${msg}</h6>
                                     <button class="btn bg-primary-gd ${shade} text-white btn-small w-100 p-0">${
                                    contestant['likes']
                                } Votes</button>
                                   
                    
                                    
                    
                                
                                </div>
                    
                            </div> 

                            ${verses}


                                              





                            `);

                            })

                        };


                    })
                }


                SETpage_session();
                home_menu();

            });


        }


        // $(".agent-artist-activities").hide();
        // $(".page-activities").hide("");
    })

}


function appexINIT(data) {
    var x_values = [];
    var y_values = [];

    $.each(data, function (key, item) {
        if (key < 10) {
            console.log(item['likes'])
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
    <div class="home-item ">
    <h5 class="header-title   p-1  bg-primary-gd" style="width: 23%; color: #1f4d65;">Bottom 4</h5>
    <h5 class="left p-1 pt-0">Do you think these four songs deserve it?</h5>
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
            item['folder_id']
        }">
                          <input type="hidden" class="folder-name" value="${
            item['artist_name']
        }">
                          <input type="hidden" class="song-title" value="${
            item['song_title']
        }">

                <div class="card-body pb-0 pt-0 position-relative center">
                    <div class=" center p-0 dark-gd-text" style="font-size: 50px;">
                        <img src="assets/images/${
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

}

function request(key, page_id = "") {

    var request = $.ajax({
        url: "admin/servers/index.user.php",
        async: false,
        type: "POST",
        data: {
            key,
            page_id
        },
        dataType: "json"
    });
    request.done(function (data) {
        return data;
    });
    return request.responseJSON;

}

function userState() {
    let key = 'user';
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
        if (data['info'] == false) {
            $(".sign-up").show();
            $(".sign-out").hide();
            login()
            console.log(data)
        } else {
            $(".sign-up").hide();
            $(".sign-out").show();
            // console.log(data)
            logout();
        }


        return data;
    });
    return request.responseJSON;

}

function login() {

    $(".sign-up").unbind('click').on('click', function (e) {
        e.preventDefault();

        let key = "login";
        var request = $.ajax({url: "admin/servers/index.user.php", type: "POST", data: {
                key
            }, dataType: "html"});
        request.done(function (data) {
            userState()

        })
    })

}

function logout() {

    $('.sign-out').unbind('click').on('click', function (e) {
        e.preventDefault()

        let key = "log-out";
        var request = $.ajax({url: "admin/servers/index.user.php", type: "POST", data: {
                key
            }, dataType: "html"});
        request.done(function (data) {
            userState()
        })

    })

}


function renderHome() {


    // let key = "home_page";
    // var request = $.ajax({url: "admin/servers/index.user.php", type: "POST", data: {
    //         key
    //     }, dataType: "json"});
    // request.done(function (data) {

    // })
}

function theAppender(item) {
    console.log(item)

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
    // console.log(item['like_done'])
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


    $(".playlist").append(`
<div class="music-container col-xl-3 col-lg-8">
<div class="card mb-1">
  <div class="card-body p-1 ">
 
   <div class="d-flex justify-content-between">
       <h4 class="header-title artist-name">
       <div class="header-title artist-name">
           ${trophy} 
         ${
        item['artist_name']
    }    
       </div>



      
      
      
      </h4>


      
      <div>
            ${stars}

      </div>
     

      <h4 class="header-title header-follow"><span class="updated-value follow-page">
      
       <input type="hidden" value="${
        item['folder_id']
    }" class="page-crew">
      </span> 

    


      <button value="${
        item['folder_id']
    }" class="btn p-0  rounded follow-btn float-end">
          <h5>${following}</h5>                  
       <input class="social-name" type="hidden" value="follow">
      </button><span class="surfix"></span></h4>
  </div>

  <div>
      <h5 class="p-0">#Song Title: <span class="text-muted">${
        item['song_title']
    }</span></h5>
  </div>
  <div class="row p-1">
      <div class="audio-container " style="background-image: url('assets/images/${
        item['artwork']

    }');background-size: cover; height:340px; padding-top:70px; border-radius: 15px;">
    
    <input class="artist-name" type="hidden" value="${
        item['artist_name']
    }"> 
    <!-- <img src="assets/images/${
        item['artwork']
    }" alt="image" class="img-fluid  " />-->

          <audio controls controlsList="nodownload" id="audio">
              <input type="hidden" class="music-id" value="${
        item['music_id']
    }">
              <source src="audios/${
        item['song']
    }"  type="audio/ogg">
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
              <a href="#" class=" page-select border-0 text-primary  header-title one-line-txt font-12">
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
          
          <a href="audios/${
        item['song']
    }" class="text-dark border-0 downloaded" download="">
    <input type="hidden" class="music-id" value="${
        item['music_id']
    }"></input>

                      Download
                  </a>
          
          </h5>
         
          

          



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
        item['song_id']
    }">

    


                   <input class="social-name" type="hidden" value="share">
                   <span class="text-muted">   
                  <i class="far fa-share-square"></i></span>
                   <span class="text-muted ">${
        item['share']
    }</span>
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
    SETpage_session();
    view_comments();
    social_action();
    social_follow();
    copySHARELINK();
    views()


}


function views() {
    // jQuery.createEventCapturing(['play']);

    // $("audio").on({
    //     play: function () { // the audio is playing!


    //         // var music_id = $(this).find('.music-id').val().trim();
    //         // console.log(music_id)
    //     },
    //     pause: function () {
    //         // the audio is paused!
    //         // $(".play", parent.content.document).css("display", "block");
    //         // $(".pause", parent.content.document).css("display", "none");
    //     }
    // })

    $("audio").unbind("play").on('play', function () {
        $("audio").not(this).each(function (index, audio) {
            audio.pause();
        });

        let key = 'views';
        var music_id = $(this).find('.music-id').val().trim();
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
    });


    $('.downloaded').unbind('click').on('click', function () {
        var music_id = $(this).find('.music-id').val().trim();
        var key = "downloads"
        console.log(music_id)
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
        let colorState = $(this).find('.color-state').val().trim();

        $('.updated-value').attr({'id': ''})
        $(this).find('.updated-value').attr({'id': 'newvalue'});

        $('.action-social').removeClass('color-container');
        $(this).addClass('color-container');
        $(this).addClass('disable');


        onAuthStateChanged(auth, (user) => {
            if (user) {
                $('.username').html(user.displayName)
                const token = user.accessToken;
                var userId = user.uid;
                var userName = user.displayName;
                var userPhotoUrl = user.photoURL;
                // currentPhoto = user.photoURL;
                currentUser = user.displayName;


                let key = "social_item";
                var request = $.ajax({
                    url: "admin/servers/index.user.php",
                    async: false,
                    type: "POST",
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                    data: {
                        key,
                        song_id,
                        socialName,
                        userId
                    },
                    dataType: "json",
                    // data: {token, projectId}
                });
                request.done(function (data) {
                    console.log(data);

                    if (data['info'] == false) {
                        console.log('login first');
                    } else {

                        $('#newvalue').html(data['newValue']);
                    }


                    if (socialName == 'like') {
                        if (data['colorState'] == true) {
                            $('.color-container').addClass('social-num-primary');
                        } else if (data['colorState'] == false) {
                            $('.color-container').removeClass('social-num-primary');
                        }
                    } else if (socialName == 'dislike') {

                        if (data['colorState'] == true) {
                            $('.color-container').addClass('social-num-primary');
                        } else if (data['colorState'] == false) {
                            $('.color-container').removeClass('social-num-primary');
                        }
                    }


                });


                // algorith hs512
            } else {

                $('.comment-input-wrapper').addClass('d-none');
                $('.login').removeClass('d-none');
                console.log("user not available");

            }
        });


        if (colorState === '1') {
            $(this).attr({'class': 'social-num'});
            $(this).find('.color-state').attr({value: '0'});

        } else if (colorState === '0') {

            $(this).attr({'class': 'social-num-primary'})
            $(this).find('.color-state').attr({value: '1'});


        }


        // console.log(newValue)

    })
}

function social_follow() {
    $(".follow-btn").unbind('click').on('click', function (e) {
        e.preventDefault();
        let userState1 = userState();
        if (userState1['info'] == true) {
            var key = 'following';
            $(this).html('Following');
            $(this).closest('.header-follow').find('.surfix').html("");

            $('.updated-value').attr({'id': ''});
            $(this).closest('.header-follow').find('.updated-value').attr({'id': 'newvalue'});
            let page_id = $(this).val().trim();
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
                console.log(data)
                $('#newvalue').html(data['newValue']);
                if (data['colorState'] == true) {
                    $('#color').css({'color': '#3bafda', 'font-weight': 'bold !important'});

                } else {
                    $('#color').css({'color': 'black'});

                }
            })
        } else {
            alert("you must login")
        }


    })
}


function pageStateHOME() {
    let key = 'page_session';

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

        return data;
    });
    return request.responseJSON;

}

function SETpage_session() {

    $('.page-select').unbind('click').on('click', function (e) {

        e.preventDefault();

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
        // $(".home-activities"). css('visibility','hidden')
        // $(".navbar-custom").hide();
        $(".agent-artist-activities").hide();
        $(".page-activities").show("");
        $('.page-select').css({'border': '1px solid #e7eaed'});
        $(this).css({'border': '1px solid #4ec0fc'})
        var page_id = $(this).find('.folder-id').val().trim();
        var page_name = $(this).find('.folder-name').val().trim();
        var song_id = $(this).find('.song-id').val().trim();


        $(".page-title").html(page_name);
        $('.page-select').attr('id', '');
        $(this).attr("id", "current");


        // if ($(this).find('.close-bar').val() == 'true') {
        //     $('.left-side-menu').toggle();
        // }


        var agentIDGLO = '';
        // let statePAGELINK = []
        page_view_home(song_id, page_id, page_name);


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

            console.log(title);
            var obj = {
                pd: pd,
                artist: artist,
                title: title,
                si: song_id

            }
            console.log()
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
    if (jQuery.inArray("pd", url_param) !== -1) {
        var artistNAME = url_param['artist'];
        artistNAME = artistNAME.replace(/\+/g, '%20');
        artistNAME = decodeURIComponent(artistNAME);

        var song_title = url_param['title'];
        song_title = song_title.replace(/\+/g, '%20');
        song_title = decodeURIComponent(song_title);


        var page_id = url_param['pd'];
        var song_id = url_param['si'];

        console.log(song_title)

        var pageSTATELINK = {
            'page_name': artistNAME,
            'page_id': page_id,
            'song_title': song_title,
            'link': true
        };

        $(".page-title").html(artistNAME);

        $(".home-activities").hide();
        $(".page-activities").show();

        page_view_home(song_id, page_id, artistNAME);

        back_to_home_by_link();


    } else {
        console.log("not present")
        // var pageSTATELINK={'link':false};

    }
}

function back_to_home_by_link() {
    $(".to-home").on("click", function (e) { // $('.navbar-custom').show();

        e.preventDefault();
        // e.preventPropagation();

        var url = window.location.href.split('?')[0];
        console.log(url)
        // location.href = url;
    })

}
// page
// submit home buses buy link
function page_view_home(song_id, page_id, page_name) {


    // if (statePAGELINK['link'] == true) {
    //     var statePage = statePAGELINK;
    //     console.log(statePAGELINK);
    // } else { // var statePage = pageStateHOME();
    // }


    // console.log(statePage);

    // var name = statePage['page_name'];
    // var song_title = statePage['song_title'];
    $('.folder-name').html(page_name);
    // let page_id = statePage['page_id'];
    let key = "show_page";

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
        $('.artist-name').html(page_name);

        // now playing
        // console.log(data)

        // var item = data[0];
        var item = [];
        $.each(data, function (index, itemSONG) { // console.log(song_id)
            console.log(itemSONG['song_id'] + 'and' + song_id)
            if (itemSONG['song_id'] == song_id) {
                item = itemSONG;
                console.log("macht")

            }

        })


        $('.page-activities').show()

        console.log(item)


        $('.followers').html(data[0]['followers']);
        // $('.artist-name').html(data[0]['artist_name'])
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


        $("#page-playing").html(`
            <div class="col-xl-12 col-lg-8">
            <div class="card">
                <div class="card-body p-1">
               
                    <div class="d-flex justify-content-between">
                        <h4 class="header-title ">${
            item['artist_name']
        }</h4>
                    </div>
    
                    <div>
                        <h5 class="p-0">#Song Title: <span class="text-muted">${
            item['song_title']
        }</span></h5>
                    </div>
                    <div class="row">
                        <div class="audio-container">
                            <img src="assets/images/${
            item['artwork']
        }" alt="image"  class="img-fluid  " />
                            <audio controls id="audio">
                            <input type="hidden" class="music-id" value="${
            item['music_id']
        }">

                                <source src="audios/${
            item['song']
        }" type="audio/ogg">
                                Your browser does not support the audio element.
                            </audio>


                         
    
    
    
                            <!-- social media -->
    
                            <a class="facebook text-primary social-icon" href="www.facebook.com">
                                <i class="fab fa-facebook"></i>
                            </a>
    
                           
    
    
    
    
                        </div>
    
                        <!-- audio -->
                    </div>
    
    
                    <div class="accordion mt-4" id="accordionExample">
                        <div class="accordion-item  border-0">
    
                            <h5 class="">Position <span class="text-primary">#${
            item['position_competition']
        }</span> of <span
                                    class="text-primary">${num_comp}</span> in the competition</h5>


                                    <div class="d-flex  ">
                                    <h5 class="left"><span class="text-muted">${
            item['views']
        }</span> Views
                
                                    </h5>
                                    <div class="p-1"></div>
                                    <div class="p-1"></div>
                
                                    <h5 class="left"><span class="text-muted">
                                            ${
            item['number_downloads']
        }</span>
                
                     <a href="audios/${
            item['song']
        }" class="text-dark border-0 downloaded" download="">
                        <input type="hidden" class="music-id" value="${
            item['music_id']
        }"></input>
    
                          Download
                      </a>
                
                                    </h5>
                
                
                
                                </div>
                           





    
                            <div class="d-flex justify-content-between">
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
                            <span class=" cl-changer">  <i class="fas fa-vote-yea"></i></span>
                            <span class="updated-value ">${
            item['likes']
        }</span>
                         </button>
                            
    
                                   
                                    <div classs="social-num">
                                        <h2 class="accordion-header  p-0 " id="headingThree">
                                            <button value="${
            item['music_id']
        }" class="collapsed border-0 social-num text-dark view-comments"
                                                type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree" aria-expanded="true"
                                                aria-controls="collapseThree">
                                                <i class="far fa-comment-alt"></i>
                                                <span class="text-muted updated-comment">${
            item['num_comments']
        }</span>

    
                                            </button>
                                        </h2>
                                    
    
                                </div>
                             <div class="header-title  font-20">
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

                                    <span class="cl-changer "><i class=" far fa-thumbs-down"></i></span>
                                    <span class="updated-value">${
            item['dislikes']
        }</span>
                                </button>
                                </div>
                                <div class="header-title   font-19">
                                    <i class="far fa-share-square"></i>
                                    <span>${
            item['share']
        }</span>
                                </div>
    
                            </div>
    
    
    
    
    
                            <div id="collapseThree" class="accordion-collapse collapse"
                                aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div class="accordion-body p-0">
                                    <h4 class="header-title mt-1">Comments</h4>
    
                                    <ul class="conversation-list chat-app-conversation p-0 "
                                        data-simplebar>
                                       
    
         
    
    
    
                                    </ul>
    
                                </div>
                            </div>
                        </div>
                    </div>


                   
    
                </div>
            </div> <!-- end col -->
    
        </div>
    
            
            
            `);

        $("#music-list").html("");

        $.each(data, function (key, item) {
            console.log(key)
            $("#music-list").append(`
                <a href="javascript:void(0);" class="text-body list-select ">
                 <input class="song-key" type="hidden" value="${key}">
                <div class="d-flex align-items-start pb-3 ">
                    <div class="position-relative">
                        <span class="user-status bg-success"></span>
                        <img src="assets/images/${
                item['artwork']
            }" height="50px" class="me-2  rounded"
                            width="50"  alt="user" />
                    </div>
                    <div class="flex-1">
                        <h5 class="mt-0 mb-0 font-14">

                            ${
                item['artist_name']
            }</span>
                        </h5>
                        <p class="mt-1 mb-0 text-muted font-14">
                            <span class="w-25 float-end text-end"><span
                                    class="badge badge-soft-danger">${
                key + 1
            }</span></span>
                            <span class="w-75"><span class="dark-text">#Title:
                                </span> ${
                item['song_title']
            }</span>
                        </p>
                    </div>
                </div>
            </a>
                
                
                
                `);

        })


        // window.scrollTo({top: 0});


        select_list(data);
        view_comments();
        social_action();
        views();
        btn_back();

    })


}

function btn_back() {
    $(".to-home").unbind('click').on("click", function (e) {
        e.preventDefault();
        // alert("Back")
        // alert($(document).height())
        $('.playlist').scrollTop($('.playlist')[0].scrollHeight);

        $('.navbar-custom').show();

        $(document).scrollTop($(document).height());


        if (battlezone == true) {
            playlistScrlCTRL = false;
        } else {
            playlistScrlCTRL = true;
        }

        // console.log(scrollPOINT)
        // window.scrollTo({top: 10000000000000});


        if ($("#music-list").html("") && $("#page-playing").html("")) {
            $(".home-activities").show();
            $(".page-activities").hide();
        };

    })
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

        if (playlistScrlCTRL == false) {
            $('.updated-comment').attr({'id': ''})
            $(this).find('.updated-comment').attr({'id': 'new-update-c-num'});

            var music_id = $(this).val();
            let key = "comments";
            $('.artist-name-header').html($(this).find('.artist-name').val())
            // var data = request(key, page_id);
            $('.footer-container').hide() && $('.comment-container').show() && $('.home-item').hide() && $('.music-container').hide() && $(this).parent().closest('.music-container').show();


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
                const token = user.accessToken;
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
                        Authorization: 'Bearer ' + token
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
                    console.log(card_height)
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
                    console.log(comment)
                });

                $(this).get(0).reset();
                // algorith hs512
            } else {

                $('.comment-input-wrapper').addClass('d-none');
                $('.login').removeClass('d-none');
                console.log("user not available");

            }
        });


        // **************************************************************

        // if (comment.length > 0) {

        //     $('.error-msg').hide();
        //     let key = "comment";
        //     var request = $.ajax({
        //         url: "admin/servers/index.user.php",
        //         type: "POST",
        //         data: {
        //             key,
        //             music_id,
        //             currentPhoto,
        //             comment
        //         },
        //         dataType: "json"
        //     });
        //     request.done(function (item) {
        //         console.log(item)


        //         let card_height = $(this).parent().closest('.music-container');
        //         $('#new-update-c-num').html(item['commentVal'])
        //         console.log(card_height)
        //         window.scrollTo({top: 10000000000});

        //         $('.conversation-list').append(`
        //     <li class="clearfix  bg-white">
        //     <div class="chat-avatar">
        //         <img src="${currentPhoto}"
        //             width="42" class="rounded-circle av img-fluid"
        //             alt="image" />
        //         <i class="one-line-txt">${
        //             item['time']
        //         }</i>
        //     </div>
        //     <div class="conversation-text ">
        //         <div class="ctext-wrap  border-1">
        //             <i>${currentUser}</i>
        //             <p class="">
        //             ${
        //             item['comment']
        //         }

        //             </p>
        //         </div>
        //     </div>
        // </li>

        //     `);

        //     })

        // }
    })
}

function select_list(data) {
    $('.list-select').unbind('click').on('click', function () {
        window.scrollTo({top: 0});

        let songKey = $(this).find('.song-key').val();
        var item = data[songKey];
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


        $("#page-playing").html(`
        <div class="col-xl-12 col-lg-8">
        <div class="card">
            <div class="card-body p-1">
           
                <div class="d-flex justify-content-between">
                    <h4 class="header-title ">${
            item['artist_name']
        }</h4>
                </div>

                <div>
                    <h5 class="p-0">#Song Title: <span class="text-muted">${
            item['song_title']
        }</span></h5>
                </div>
                <div class="row">
                    <div class="audio-container">
                        <img src="assets/images/${
            item['artwork']
        }" alt="image"  class="img-fluid  " />
                        <audio controls id="audio">
                        <input type="hidden" class="music-id" value="${
            item['music_id']
        }">

                            <source src="audios/${
            item['song']
        }" type="audio/ogg">
                            Your browser does not support the audio element.
                        </audio>


                     



                        <!-- social media -->

                        <a class="facebook text-primary social-icon" href="www.facebook.com">
                            <i class="fab fa-facebook"></i>
                        </a>

                       




                    </div>

                    <!-- audio -->
                </div>


                <div class="accordion mt-4" id="accordionExample">
                    <div class="accordion-item  border-0">

                        <h5 class="">Position <span class="text-primary">#${
            item['position_competition']
        }</span> of <span
                                class="text-primary">${num_comp}</span> in the competition</h5>


                                <div class="d-flex  ">
                                <h5 class="left"><span class="text-muted">${
            item['views']
        }</span> Views
            
                                </h5>
                                <div class="p-1"></div>
                                <div class="p-1"></div>
            
                                <h5 class="left"><span class="text-muted">
                                        ${
            item['number_downloads']
        }</span>
            
                 <a href="audios/${
            item['song']
        }" class="text-dark border-0 downloaded" download="">
                    <input type="hidden" class="music-id" value="${
            item['music_id']
        }"></input>

                      Download
                  </a>
            
                                </h5>
            
            
            
                            </div>
                       






                        <div class="d-flex justify-content-between">
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
                        <span class=" cl-changer">  <i class="fas fa-vote-yea"></i></span>
                        <span class="updated-value ">${
            item['likes']
        }</span>
                     </button>
                        

                               
                                <div classs="social-num">
                                    <h2 class="accordion-header  p-0 " id="headingThree">
                                        <button value="${
            item['music_id']
        }" class="collapsed border-0 social-num text-dark view-comments"
                                            type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree" aria-expanded="true"
                                            aria-controls="collapseThree">
                                            <i class="far fa-comment-alt"></i>
                                            <span class="text-muted updated-comment">${
            item['num_comments']
        }</span>


                                        </button>
                                    </h2>
                                

                            </div>
                         <div class="header-title  font-20">
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

                                <span class="cl-changer "><i class=" far fa-thumbs-down"></i></span>
                                <span class="updated-value">${
            item['dislikes']
        }</span>
                            </button>
                            </div>
                            <div class="header-title   font-19">
                                <i class="far fa-share-square"></i>
                                <span>${
            item['share']
        }</span>
                            </div>

                        </div>





                        <div id="collapseThree" class="accordion-collapse collapse"
                            aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div class="accordion-body p-0">
                                <h4 class="header-title mt-1">Comments</h4>

                                <ul class="conversation-list chat-app-conversation p-0 "
                                    data-simplebar>
                                   

     



                                </ul>

                            </div>
                        </div>
                    </div>
                </div>


               

            </div>
        </div> <!-- end col -->

    </div>

        
        
        `);

        view_comments();
        social_action();
        views();


    })
}
