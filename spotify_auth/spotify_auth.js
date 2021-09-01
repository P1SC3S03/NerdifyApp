var redirect_uri = "https://nerdify-heroku.herokuapp.com/dashboard.html";

var client_id = "b1be58a2a84e423e88f88256823a1447"; 
var client_secret = "557ccc7130b348bebf3134784a5af7e2";


const AUTHORIZE = "https://accounts.spotify.com/authorize"

function requestAuthorization(){
    client_id = "b1be58a2a84e423e88f88256823a1447";
    client_secret = "557ccc7130b348bebf3134784a5af7e2";
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret);

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url;
}
