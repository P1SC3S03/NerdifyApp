$(document).ready(function () {
    const user ='soraiavmv';
    const url = 'https://open.spotify.com/user/';
    console.log(url+user);
    fetch(url + user)
        .then(parseResponse)
        .then(cenas)
        .catch(handleErrors);
})


// PARSE JSON 
function parseResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json();
}

function cenas(data) {
    console.log(typeof data);
    console.log(data);
}

//HANDLE ERRORS
function handleErrors(error) {
    $('#home').html('<p style=“color: red;“>' + error + '</p>'); //CHANGE HOME
}