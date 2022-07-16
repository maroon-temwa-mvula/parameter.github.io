$(document).ready(function () {
    $('.custom-link').on('click', function(e){
        e.preventDefault();
    })


    function dash() {

        let key = "dash";
        var request = $.ajax({url: "admin/servers/server.php", type: "POST", data: {
                key
            }, dataType: "json"});
        request.done(function (data) {
            // console.log(data)
            // alert(data['commission_gain']);


            $('.agent-artist').html('');
            $(".bulk-commission").html(num_songs = Intl.NumberFormat('en-US').format(data['commission_gain']));
            $(".prize-money").html(num_songs = Intl.NumberFormat('en-US').format(data['prize_winner']));
            $(".total-revenue").html(num_songs = Intl.NumberFormat('en-US').format(data['total_finance']));
            $(".num-pending").html(num_songs = Intl.NumberFormat('en-US').format(data['num_pending']));
            $(".num-uploaded").html(num_songs = data['num_uploaded']);
            $(".num-uploaded-pending").html(data['total_audios']);
            // var total = data[0]['num_uploaded_ad'] + data[0]['num_pending_ad']

            donutCHART(num_songs = data['num_pending'], num_songs = data['num_uploaded'], data['total_audios']);

        })

    }
    
    function donutCHART(pending, uploaded, total) {

        $("#morris-donut-example").html("");
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

    dash()


    function my_agentsu() {


        // const bell=new Audio('assets/audio/bell.mp3');

        // bell.play();
        let key = "my_agents";
        var request = $.ajax({url: "admin/servers/server.php", type: "POST", data: {

                key
            }, dataType: "json"});
        request.done(function (data) {
            console.log(data)

            $('.num-agents').html(data.length + ' agents');

            var total_uploads = 0;
            var total_pending = 0;
            var total_commission = 0;
            for (var i = 0; i < data.length; i++) {
                total_uploads += parseInt(data[i]['num_uploaded']);
                total_pending += parseInt(data[i]['num_pending']);
                total_commission += parseInt(data[i]['commission_gain']);

            }


            if (true == true) {
                var item = data[0];
                // profile 1;
                $('.agent-profile').html(`

                                        <div class="rounded-top  bg-transparent position-relative mt-3" style=" background-image: url('assets/images/avatar-the-last-airbender-13608-1920x1200.jpg');background-size: cover; height:100px; padding-top:70px;">
                                            <img src="assets/images/${
                    item['admin_agent_image']
                }" class="rounded-circle img-thumbnail " style="width: 80px; height: 80px; margin-left: 7px;">
                                            <div class="position-absolute bottom-0 end-0    text-white d-flex">
                                                
                                                <div class="circle-sm bg-primary p-1 center"><i class="fas fa-users"></i><br><span class="text-dark center  border-bottom">${
                    data.length
                }</span></div>
                                                <div class="circle-sm bg-primary p-1 center"><span class=""><i class="fa fa-hourglass-half"></i> </span><br><span class="text-dark center border-bottom">${
                    total_pending
                }</span></div>
                                                <div class="circle-sm bg-primary p-1 center"><i class="fas fa-check"></i><br><span class="text-dark center border-bottom">${
                    total_uploads
                }</span></div>
                                                <div class="circle-sm bg-primary p-1 center"><i class="fas fa-cloud-upload-alt"></i> <br><span class="darken-color center border-bottom">${
                    total_pending + total_uploads
                }</span></div>
                                                

                                            
                                            </div>

                                            <div class="position-absolute name-hagging  p-1  ">MK<span class="bulk-commission float-center">${
                    Intl.NumberFormat('en-US').format(total_commission)
                }.00</span></div>
                                        </div>


                                    

                                
                                
                                    `);

                $.each(data, function (key, item) { // console.log(item)


                    if (item['pending'] == 0) {


                        var blink = 'text-white'
                    } else {
                        var blink = 'blink text-danger';
                    }

                    $('.agent-artist').append(`


                  <div class="col-lg-6 w-100 view-artists">

                  <div class="d-flex mb-1 ">

                     <div class="card p-0 mb-0  page-ss border border-2 view-artists" style="width: 15rem">

                          <input type="hidden" class="agent-id" value="${
                        item['id_admins_agents']
                    }">
                          <input type="hidden" class="profile-image" value="${
                        item['admin_agent_image']
                    }">
                          <input type="hidden" class="agent-name" value="${
                        item['admin_agent_name']
                    }">
                          <input type="hidden" class="commission" value="${
                        item['commission_gain']
                    }">
                          <input type="hidden" class="num-artists" value="${
                        item['num_artist']
                    }">
                          <input type="hidden" class="pending" value="${
                        item['num_pending']
                    }">
                          <input type="hidden" class="total-uploaded" value="${
                        item['total_audios']
                    }">
                            

                           <div class="card-body bg-light-grey p-0 position-relative center " style="background-image: url('assets/images/${
                        item['admin_agent_image']
                    }');background-size: cover; height: 60px; ">
                             
                     
                            
                           </div>
                       </div>

                       <div class="p-1"></div>


                       <div class="w-100 border-bottom-1">

                            

                            <div class="d-flex justify-content-between">
                                <h6 class="bg-white border-0 left bold-text">${
                        item['admin_agent_name']
                    }
                                
                                    
                                </h6>
                                <div class="d-flex">
                                <h5><i class="far fa-star text-warning"></i></h5>
                                <h5><i class="far fa-star text-warning"></i></h5>
                                <h5><i class="far fa-star text-warning"></i></h5>
                                <h5><i class="far fa-star text-warning"></i></h5>
                                <h5><i class="far fa-star text-warning"></i></h5>
                               
                                
                                </div>
                                
                            
                            </div>

                       <h6 class="">MK${
                        Intl.NumberFormat('en-US').format(item['commission_gain'])
                    }.00</h6>
                       

                       <div class="d-flex  justify-content-between p-1  bg-primary float-end w-75">
                          <h6 class=" header-title font-11  darken-color "> <i class="fas fa-users darken-color "></i>  ${
                        item['num_artist']
                    }</h6>
                          <h6 class=" header-title font-11  darken-color "><span class=" ${blink} "> <i class="fas fa-hourglass-half"></i></span>  ${
                        item['num_pending']
                    }</h6>
                          <h6 class=" header-title font-11  darken-color "><span class="darken-color "> <i class="fas fa-check"></i></span>  ${
                        item['num_uploaded']
                    }</h6>
                          <h6 class=" header-title font-11  darken-color "> <i class="fa fa-cloud-upload-alt darken-color "></i>  ${
                        item['total_audios']
                    }</h6>
                                               
                       </div>


                       
                       </div>



                       </div>

                    </div>
                       

                    `);


                })


            } else {



                $('.profile-name').html(data[0]['admin_agent_name']);

                var item = data[0];
                $('.agent-tb').html('');
                // $('.agent-container').html('<span class="mt-5">sd</span>');
                if (item['pending'] == 0) {
                    var blink = 'text-primary'
                } else {
                    var blink = 'blink text-danger';
                }

                $('.agent-profile').html(`

                <div class="rounded-top  bg-transparent position-relative mt-3" style="background-image: url('assets/images/avatar-the-last-airbender-13608-1920x1200.jpg');background-size: cover; height:100px; padding-top:70px;">
                    <img src="assets/images/${
                                item['admin_agent_image']
                            }" class="rounded-circle img-thumbnail " style="height:70px; width:70px; margin-left: 7px;">
                    <div class="position-absolute bottom-0 end-0    text-white d-flex">
                        
                        <div class="circle-sm bg-primary p-1 center"><i class="fas fa-users"></i><br><span class="text-dark center  border-bottom">${
                                item['num_artists']
                            }</span></div>
                        <div class="circle-sm bg-primary p-1 center"><span class="${blink}"><i class="fa fa-hourglass-half"></i> </span><br><span class="text-dark center border-bottom">${
                                item['pending']
                            }</span></div>
                        <div class="circle-sm bg-primary p-1 center"><i class="fas fa-check"></i><br><span class="text-dark center border-bottom">${
                                item['agent_total_uploads'] - item['pending']
                            }</span></div>
                        <div class="circle-sm bg-primary p-1 center"><i class="fas fa-cloud-upload-alt"></i> <br><span class="text-dark center border-bottom">${
                                item['agent_total_uploads']
                            }</span></div>
                        

                    
                    </div>

                    <div class="position-absolute name-hagging  p-1  ">MK<span class="bulk-commission">${
                                item['bulk_commission']
                            }</span></div>
                </div>


               
  

           `);

                var agent_id = data[0]['id_admins_agents'];
                agentIDGLO = agent_id;
                agent_id=2;
                
                my_artistsh(agent_id);
                addARTIST(agent_id);


            }


            $(".view-artists").on('click', function (e) {
                $(".home-2-nav-btn").hide();
                $(".home-3-nav-btn").show();
                $(".agent-container").hide();
                $(".artist-container").show();
                $('.artist-add-btn').show('');
                if (agentACCOUNT == true) { // preloader('agent-artist');
                }

                // `<input type="hidden" class="num-artists" value="${item['num_artist']}">
                // <input type="hidden" class="pending" value="${item['pending']}">
                // <input type="hidden" class="total-uploaded" value="${item['agent_total_uploads']}">`;


                let agent_id = $(this).find('.agent-id').val().trim();
                let profilIMAGE = $(this).find('.profile-image').val().trim();
                let commission = $(this).find('.commission').val().trim();
                let num_artists = $(this).find('.num-artists').val().trim();
                let pending = $(this).find('.pending').val().trim();
                let total_uploaded = $(this).find('.total-uploaded').val().trim();


                $('.agent-name').html($(this).find('.agent-name').val().trim());
                // let agent_id = $(this).find('.agent-id').val().trim();
                agentIDGLO = agent_id;

                if (agentACCOUNT == true) {
                    $('.profile-agent-2').html(`

                
                <div class="rounded-top mt-3 bg-transparent position-relative" style="background-image: url('assets/images/${profilIMAGE}');background-size: cover; height:100px; padding-top:70px;">
                <img src="assets/images/${profilIMAGE}" class="rounded-circle img-thumbnail " style="height:80px; width:80px; margin-left: 7px;">
                <div class="position-absolute bottom-0 end-0    text-white d-flex">
                    
                    <div class="circle-sm bg-primary p-1 center"><i class="fas fa-users"></i><br><span class="text-dark center  border-bottom">${num_artists}</span></div>
                    <div class="circle-sm bg-primary p-1 center"><i class="fa fa-hourglass-half"></i><br><span class="text-dark center border-bottom">${pending}</span></div>
                    <div class="circle-sm bg-primary p-1 center"><i class="fas fa-check"></i> <br><span class="text-dark center border-bottom">${
                        total_uploaded - pending
                    }</span></div>
                    <div class="circle-sm bg-primary p-1 center"><i class="fas fa-cloud-upload-alt"></i> <br><span class="text-dark center border-bottom">${total_uploaded}</span></div>
                    

                
                </div>

                <div class="position-absolute name-hagging  p-1  ">MK<span class="bulk-commission">${
                        Intl.NumberFormat('en-US').format(commission)
                    }.00</span></div>
            </div>
                
                
                `);
                }


                my_artists(agent_id);


            })

            agent_add();
            updateRATINGS();
            notifications();

        });


    }

    my_agentsu();



    function my_artistsh(agent_id) { // alert(agent_id)


       


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
            // $('.view-artist-1').html('');
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
    
            // addARTIST(agent_id);
    
            // SETpage_session();
    
        });
    
    
    }
    
})
