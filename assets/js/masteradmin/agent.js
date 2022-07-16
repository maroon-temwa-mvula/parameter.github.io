var num_comp;
var scrollPOINT;
var agentIDGLO = 0;
var selectPAGE;
var removePARENT;
$(document).ready(function () { // page

    links();
    userState();
    prize();
    renderHome();
    // image preview

  
   


})



function prize() {
    var key = 'prize';
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

        $('.prize').html(`MK` + data[0]['prize'])
        $('.current-winner').html(data[0]['artist_name'])
        $('.votes').html(data[0]['votes'])
        $('.month').html(data[0]['month'].toUpperCase());
        $('.top-3').html('');


        $.each(data, function (key, item) {
            if (key == 0) {
                var blink = 'blink';
                var medal = 'medal-icon-primary';
                var icon = 'fa fa-crown';

            } else if (key == 1) {
                var medal = 'medal-icon-success';
                var icon = ' far fa-star';
            } else if (key == 2) {
                var medal = 'medal-icon-danger';
                var icon = 'fas fa-medal';
            } else if (key == 3) {
                var medal = 'bg-primary';
                var icon = 'fab fa-gripfire';
            }

            if (key < 4) {
                $('.top-3').append(`
                
                <div class="card page-select m-1 position-relative" style="width: 6rem">

                <input type="hidden" class="folder-id" value="${
                    item['folder_id']
                }">
                              <input type="hidden" class="folder-name" value="${
                    item['artist_name']
                }">
                              <input type="hidden" class="song-title" value="${
                    item['song_title']
                }">
                <img src="assets/images/${
                    item['artwork']
                }" class="rounded" alt="...">

                <div class="winner-info">
                    <h6 class="center font-14 p-0 m-0 text-white">${
                    key + 1
                }</h6>

                    <h6><span class="text-white center">${
                    item['artist_name']
                }</span></h6>
                    <h6><span class="text-white center">${
                    item['votes']
                }  Votes</span></h6>

                        <div class="medal-icon ${medal} text-white">
                            <i class="${icon}"></i>
                        </div>
                 

                </div>

            </div>
                
                
                
                `);
            }


        })


    });


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
     
        } else {
            $(".sign-up").hide();
            $(".sign-out").show();
          
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


    let key = "home_page";
    var request = $.ajax({url: "admin/servers/index.user.php", type: "POST", data: {
            key
        }, dataType: "json"});
    request.done(function (data) {
        // userState()
   
        $('.run-logo').hide()

        $.each(data, function (key, item) { 
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


        $(window).scroll(function () {
            

            if (count_scroll < data.length) {
                if ($(window).scrollTop() + screen.height > $('body').height()) {
                    // if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
                    // theAppender(data[count_scroll]);
                   
                    // window.scrollTo({ top: height });
                    count_scroll += 1;;
                }
            }


        })


        view_comments()

        social_action();
        social_follow();

    })
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


    if (item['position_competition'] == 1) {
        var trophy = `<span class="winning-trophy"> <i class="fa fa-trophy"> </i> </span>`;
    } else {
        var trophy = '';
    }

    $("#page-playing").html('');

    $("#page-playing").append(`
  <div class="music-container col-xl-3 col-lg-8">
 <div class="card">
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
       

        <h4 class="header-title header-follow"><span class="updated-value follow-page">
         ${
        item['followers']
    }
         <input type="hidden" value="${
        item['folder_id']
    }" class="page-crew">
        </span> 

      


        <button value="${
        item['folder_id']
    }" class="btn p-0  rounded follow-btn">
           ${following}                  
         <input class="social-name" type="hidden" value="follow">
        </button><span class="surfix"></span></h4>
    </div>

    <div>
        <h5 class="p-0">#Song Title: <span class="text-muted">${
        item['song_title']
    }</span></h5>
    </div>
    <div class="row p-1">
        <div class="audio-container " style="background-image: url('assets/images/${item['artwork']}');background-size: cover; height:400px; padding-top:70px;">
        <!-- <img src="assets/images/${item['artwork']}" alt="image" class="img-fluid  " />-->

            <audio controls controlsList="nodownload" id="audio">
                <source src="audios/${item['song']}"  type="audio/ogg">
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
                <input type="hidden" class="song-title" value="${
        item['song_title']
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
    }" class="text-dark border-0 " download="">
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
                     <span class=" cl-changer">  <i class="fas fa-vote-yea"></i></span>
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
                                <span class="text-muted ">  <i class="far fa-comment-alt"></i></span>
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

                     <span class="cl-changer "><i class=" far fa-thumbs-down"></i></span>
                     <span class="updated-value">${
        item['dislikes']
    }</span>
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
                    <h4 class="header-title">Comments</h4>

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


}

function social_action() {
    $('.action-social').unbind('click').on('click', function (e) {
        e.preventDefault();
        let userState1 = userState();
    
        if (userState1['info'] == true) {
            let song_id = $(this).val().trim();
            var socailName = $(this).find('.social-name').val();


            let colorState = $(this).find('.color-state').val().trim();
            console.log(colorState);


            $('.updated-value').attr({'id': ''})
            $(this).find('.updated-value').attr({'id': 'newvalue'})

            let key = "social_item";
            var request = $.ajax({
                url: "admin/servers/index.user.php",
                type: "POST",
                data: {
                    key,
                    song_id,
                    socailName
                },
                dataType: "json"
            });
            request.done(function (data) {
             
                $('#newvalue').html(data['newValue']);

            })
            if (colorState == '1') {
                $(this).attr({'class': 'social-num'});
                $(this).find('.color-state').attr({value: '0'});

            } else if (colorState == '0') {

                $(this).attr({'class': 'social-num-primary'})
                $(this).find('.color-state').attr({value: '1'});


            }

        } else if (userState1['info'] == false) {
            alert("you must login first")
        }

        

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

    $('.page-select').unbind('click').on('click', function () { // $(".page-title").html('PAGE');

     
        if ($('.home-3-nav-btn').hide() && $('.home-nav-btn').hide()) {;
            $('.home-3-nav-btn').css({'display': 'none'})

            $(".home-activities").hide();
            $(".agent-artist-activities").hide();
            $(".page-activities").show();

            if(agentACCOUNT==2){
                $('.home-2-nav-btn').hide();

            }

            

            // $(this).css({'border': '1px solid #6d757d'})
            var page_id = $(this).find('.folder-id').val().trim();
            var page_name = $(this).find('.folder-name').val().trim();

            // border page
            selectPAGE = page_name;
            var song_title = $(this).find('.song-title').val().trim();

            // alert(agentIDGLO)


            $('.page-title').html(page_name)


            if ($(this).find('.close-bar').val() == 'true') {
                $('.left-side-menu').toggle();
            }


            let key = "page_session";
            var request = $.ajax({
                url: "admin/servers/index.user.php",
                type: "POST",
                data: {
                    key,
                    page_id,
                    page_name,
                    song_title,
                    agentIDGLO
                },
                dataType: "json"
            });
            request.done(function (data) { 

                page_view_home();

            })

        }

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
           
            var obj = {
                pd: pd,
                artist: artist,
                title: title

            }
           
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
 

        var pageSTATELINK = {
            'page_name': artistNAME,
            'page_id': page_id,
            'song_title': song_title,
            'link': true
        };
        $(".page-title").html('PAGE');
        $(".home-activities").hide();
        $(".page-activities").show();

        page_view_home(pageSTATELINK);

        back_to_home_by_link();


    } else {
        console.log("not present")
        // var pageSTATELINK={'link':false};

    }
}

function back_to_home_by_link() {
    $(".to-home").on("click", function () {
        var url = window.location.href.split('?')[0];
       
        // location.href = url;
    })

}
// page
// submit home buses buy link
function page_view_home(statePAGELINK =[]) {

    $('.home-3-nav-btn').hide('');
    $('.home-3-nav-btn').css({'display': 'none'})

    if (statePAGELINK['link'] == true) {
        var statePage = statePAGELINK;
        

    } else {
        var statePage = pageStateHOME();
    }


    console.log(statePage);

    var name = statePage['page_name'];

    var song_title = statePage['song_title'];
    $('.folder-name').html(name);
    let page_id = statePage['page_id'];
    let key = "page-agent";

    // var data = request(key, page_id);
    var request = $.ajax({
        url: "admin/servers/index.user.php",
        type: "POST",
        data: {
            key,
            page_id,
            song_title
        },
        dataType: "json"
    });
    request.done(function (data) {


        if (data.length > 0) {
            $("#page-playing").html("");
            $('.artist-name').html(data[0]['artist_name']);
            $('.playlist-title').show();

            var item = [];
            $.each(data, function (index, itemSONG) {
                if (itemSONG['song_title'] == song_title) {
                    item = itemSONG;

                } else if (song_title == 'undefined') {
                    item = data[0];

                }

            })


            $('.page-activities').show()


            // $('.followers').html(data[0]['followers']);
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

            } theAppender(item)


            $("#music-list").html("");

            $.each(data, function (key, item) { 
                

                    if(item['paid_for']==1){
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
                        <img src="assets/images/${
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
                    }" class="btn float-end   p-0 ${buttonVALIDATE} ml-2 validate">${validateMSG}</button>
                            <span class="badge badge-soft-danger">${
                        key + 1
                    }</span>
                            <span class="w-75"><span class="dark-text">#Title:</span> ${
                        item['song_title']
                    }</span>
                        </div>
                    </div>
                </div>
            </a>
                
                
                
                `);

                

            })


            validateUpload();
            deleteREMOVE();

            // var scrlHEIGHT=  $(window).height()/2+10;

            // window.scrollTo({top: scrlHEIGHT});


        } else {
            $('.playlist-title').hide();
            $("#page-playing").html(`
             
            <div class="w-100 center empty-wrapper">

                <div class="d-fle">
                    <div class="d-flex float-center">
                        <h1 class="empty-folder-big"><i class=" far fa-folder-open"></i>
                        </h1>
                        <h1 class="empty-folder-big"><i class="far fa-file-audio"></i>
                        </h1>
                    </div>
                </div>


                <h1 class="empty-upload-big"><i class="fas fa-cloud-upload-alt"></i>
                </h1>

                <h5 class="text-dark">This page is empty

                </h5>
                <p>upload  songs</p>

            </div>
            
            `);

            $("#music-list").html(`
                <div class="w-100 center">
                <button class="btn btn-outline-info w-75 center m-1 btn-rounded border-secondary dark-gd-text">0 followers</button>
                </div>
            
            `);

        }

        upload();
        select_list(data);
        view_comments();
        social_action();
        btn_back();

    })


}

function btn_back() {
    $(".to-home").on("click", function () {
        $(".page-title").html('HOME');
        window.scrollTo({top: scrollPOINT});
        if ($("#music-list").html("") && $("#page-playing").html("")) {
            $(".home-activities").show();
            $(".page-activities").hide();
        };

    })
}

function view_comments() {
    $(".view-comments").unbind('click').on('click', function (e) {
        e.preventDefault();
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
                    <img src="assets/images/7.jpg"
                        width="42" class="rounded-circle av img-fluid"
                        alt="image" />
                    <i class="one-line-txt">${
                        item['time']
                    }</i>
                </div>
                <div class="conversation-text ">
                    <div class="ctext-wrap  border-1">
                        <i>Maroon</i>
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
        })

        comment(music_id);
    })
}

function comment(music_id) {
    $('#comment-form').unbind('submit').on('submit', function (e) {
        e.preventDefault()
        let comment = $('#comment-msg').val().trim();

        $('.error-msg').hide();


        let key = "comment";
        var request = $.ajax({
            url: "admin/servers/index.user.php",
            type: "POST",
            data: {
                key,
                music_id,
                comment
            },
            dataType: "json"
        });
        request.done(function (item) {
            

            let card_height = $(this).parent().closest('.music-container');
            $('#new-update-c-num').html(item['commentVal'])
           
            window.scrollTo({top: 10000000000});
            $('.conversation-list').append(`
            <li class="clearfix  bg-white">
            <div class="chat-avatar">
                <img src="assets/images/7.jpg"
                    width="42" class="rounded-circle av img-fluid"
                    alt="image" />
                <i class="one-line-txt">${
                item['time']
            }</i>
            </div>
            <div class="conversation-text ">
                <div class="ctext-wrap  border-1">
                    <i>Maroon</i>
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
        $(this).get(0).reset();
    })
}

function select_list(data) {
    $('.list-select').unbind('click').on('click', function () {
        window.scrollTo({top: 330});
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

        } theAppender(item);

        view_comments();
        social_action();


    })
}


