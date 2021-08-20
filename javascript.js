$(document).ready(function () {
    search = 'abba'.toLowerCase(); // CHANGE TO USER INPUT
    const searchEndPoint = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=';
    fetch(searchEndPoint + search) 
        .then(parseResponse)
        .then(getImage)
        .then(renderArtistBioPT)
        .then(renderHome)
        .catch(handleErrors);

});

// PARSE JSON 
function parseResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json(); 
}

//VER HARD CODED ARRAY INDEX/POSITION!! 

//ARTIST BIO IN PORTUGUESE
 function renderArtistBioPT(data) {
    let content = '<h3>Bio</h3>';

    content += `<p>${data.artists[0].strBiographyPT}</p>`;

    $('#skills').html(content); //CHANGE SKILLS TO OTHER
 }

//ARTIST BIO IN ENGLISH
 function renderArtistBioEN(data) {
    let content = '<h3>Bio</h3>';

    content += `<p>${data.artists[0].strBiographyEN}</p>`;

    $('#skills').html(content); //CHANGE SKILLS TO OTHER
 }


//TO CHECK IF SEARCH EXISTS AND IF SO RETURN POSITION
function validateData(data) { 
    let receivedArtistName = data.artists[0].strArtist.toLowerCase();
    
//FOR 
    if(receivedArtistName !== search) {
        throw new Error('Invalid artist');
    }
    return data;
}

//IMPORT IMAGE
function getImage(data) {
    //console.log(data, 'data!!');
     console.log('data', data);
     return data.artists[0].strArtistFanart;
 
 }

function renderHome(results) {
    $('#home').html(`<div id="home-image"><img src="${results}"></div>
    `)
}

function handleErrors(error) {
    $('#home').html('<p style=“color: red;“>' + error + '</p>');
}
