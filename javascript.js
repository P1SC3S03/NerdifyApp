$(document).ready(function () {
    search = 'abba'.toLowerCase(); // CHANGE TO USER INPUT
    const searchEndPoint = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=';
    fetch(searchEndPoint + search)
        .then(parseResponse)
        .then(artistInfo)
        .then(renderImage)
        //.then(renderArtistBioPT)
        //.then(renderArtistBioEN)
        .catch(handleErrors);

});

// PARSE JSON 
function parseResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json();
}

//ARTIST BIO IN PORTUGUESE
function renderArtistBioPT(data) {
    let content = '<h3>Bio</h3>';

    content += `<p>${data[0].bioPT}</p>`;

    $('#skills').html(content); //CHANGE SKILLS TO OTHER
}

//ARTIST BIO IN ENGLISH
function renderArtistBioEN(data) {
    let content = '<h3>Bio</h3>';

    content += `<p>${data[0].bioEN}</p>`;

    $('#skills').html(content); //CHANGE SKILLS TO OTHER
}

//EXTRACT IMPORTANT ARTIST INFO
function artistInfo(data) {
    const info = data.artists.map(art => {
        if (JSON.stringify(art.strArtist).toLowerCase() === JSON.stringify(search)) {
            return {
                name: art.strArtist, fanart: art.strArtistFanart, bioPT: art.strBiographyPT,
                bioEN: art.strBiographyEN
            }
        } 
    });
    info.splice(1,1);
    return info;
}
//RENDER IMAGE
function renderImage(data) {
    $('#home').html(`<div id="home-image"><img src="${data[0].fanart}"></div>`); //CHANGE HOME
}

function handleErrors(error) {
    $('#home').html('<p style=“color: red;“>' + error + '</p>'); //CHANGE HOME
}
