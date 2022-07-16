var currentPhoto = '';
var currentUser = ''

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        $('footer').addClass('d-none');
        $('.comment-input-wrapper').removeClass('d-none');
        $('.bottom-menu').removeClass('d-none');
        $('.login').addClass('d-none');
    

        $('.username').html(user.displayName);
        var username = user.displayName;
        const userId = user.uid;


        // const token = user.accessToken;
        // console.log(user.displayName);
        // console.log(user.photoURL);
        // var userId = user.uid;
        // var userName = user.displayName;
        var userPhotoUrl = user.photoURL;
        currentPhoto = user.photoURL;
        currentUser = user.displayName;

        $('#profile-image').attr('src', user.photoURL);
        var key = 'user';

        var request = $.ajax({
            url: "admin/servers/index.user.php",
            async: false,
            type: "POST",
            headers: {
                Authorization: 'Bearer ' + user.accessToken
            },
            dataType: 'html',
            data: {
                key,
                userId,
                username,
                userPhotoUrl
            }
        });
        request.done(function (data) {
            console.log(data)
        });

        return user;

        // algorith hs512
    } else {

        $('.comment-input-wrapper').addClass('d-none');
        $('.login').removeClass('d-none');
        console.log("user not available");

        return "no user";

        // console.log(auth);

    }


});


$('.login').on('click', function (e) {

    e.preventDefault();
    const provider = new FacebookAuthProvider();
    provider.addScope('public_profile');
    auth.languageCode = 'it';
    provider.setCustomParameters({'display': 'popup'});
    signInWithPopup(auth, provider).then((result) => { // The signed-in user info.
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // alert()
                // const userId = user.uid;
                // console.log(userId)
                const userId =user.providerData[0].uid;
                console.log(userId)
                const photoURL = 'https://graph.facebook.com/' + userId + '/picture?type=large'
                $('.username').html(user.displayName)
                //     profileimage.scr=user.photoURL;
                
                $('#profile-image').attr('src', photoURL);
            }
        })
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
    });

})


$('.signout').on('click', function () {
    signOut(auth).then(() => {

        // Sign-out successful.
        // FirebaseAuth.getInstance().signOut();
        console.log('Sign-out successful.')
    }).catch((error) => {
        console.log(error);
        // An error happened.
    });


});


// function token_uid(){

//     onAuthStateChanged(auth, (user) => {
//         const token = user.accessToken;
//         var userId = user.uid;
//         console.log(user.uid)
//         return user.uid;
//       }
//     )

// }

// token_uid();


// })
