var redirect_uri = "https://nerdify-heroku.herokuapp.com/dashboard.html";

var client_id = "b1be58a2a84e423e88f88256823a1447"; 

const AUTHORIZE = "https://accounts.spotify.com/authorize"

function requestAuthorization(){
   
    localStorage.setItem("client_id", client_id);
    
    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=token";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    window.location.href = url;
}
