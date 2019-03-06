
    // initialize and setup facebook js sdk
    window.fbAsyncInit = function() {
        FB.init({
            appId: '610345256055592',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v3.2'
        });

        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                document.getElementById('status').innerHTML = 'We are connected.';
                document.getElementById('login').style.visibility = 'hidden';
            } else if (response.status === 'not_authorized') {
                document.getElementById('status').innerHTML = 'We are not logged in.';
            } else {
                document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
            }
        });
    };


    // Load the SDK Asynchronously
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return ;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    

    // login to facebook
    function login() {
        FB.login(function (response) {
            if (response.status === 'connected') {
                document.getElementById('status').innerHTML = 'We are connected.';
                document.getElementById('login').style.visibility = 'hidden';
            } else if (response.status === 'not_authorized') {
                document.getElementById('status').innerHTML = 'We are not logged in.'
            } else {
                document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
            }
        }, { scope: 'publish_pages'});
        }

    
    // getting basic user info
		function getInfo() {
        FB.api('/me', 'GET', { fields: 'first_name,last_name,name,id' }, function (response) {
            document.getElementById('status').innerHTML = response.id;
        });
    }
    

    var msg = // add msg source later (JSON.parse(data))
    // posting on user timeline
		function post() {
        FB.api('/me/feed', 'post', { message: msg }, function (response) {
            document.getElementById('status').innerHTML = response.id;
        });
    }

    /* make the API call */
    FB.api(
        '/page-id/feed',
        function (response) {
        if (response && !response.error) {
            /* handle the result */
        }
        }
    );

