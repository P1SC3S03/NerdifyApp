$(document).ready(function () {
    search = 'coldplay'.toLowerCase(); // CHANGE TO USER INPUT
    const searchEndPoint = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s='; //API KEY = 523532 
    fetch(searchEndPoint + search)
        .then(parseResponse)
        .then(artistInfo)
        //.then(renderImage)
        //.then(renderArtistBioPT)
        //.then(renderArtistBioEN)
        //.then(renderArtistCountry)
        .then(renderArtistGenreAndStyle)
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

//ARTIST COUNTRY
function renderArtistCountry(data) {
    let content = '<h3>Country</h3>';

    content += `<p>${data[0].country}: ${data[0].countryInit}</p>`;

    $('#skills').html(content); //CHANGE SKILLS TO OTHER
}

//ARTIST GENRE AND STYLE
function renderArtistGenreAndStyle(data) {
    let content = '<h3>Genre And Style</h3>';

    content += `<p><b>Genre:</b> ${data[0].genre} <br><b>Style:</b> ${data[0].style}</p>`;

    $('#skills').html(content); //CHANGE SKILLS TO OTHER
}

//EXTRACT IMPORTANT ARTIST INFO
function artistInfo(data) {
    const info = data.artists.map(art => {
        if (JSON.stringify(art.strArtist).toLowerCase().includes(JSON.stringify(search))) {
            return {
                name: art.strArtist, fanart: art.strArtistFanart,
                bioPT: art.strBiographyPT, bioEN: art.strBiographyEN,
                country: art.strCountry, countryInit: art.strCountryCode,
                genre: art.strGenre, style: art.strStyle
            }
        } 
    });
    info.splice(1,1);
    return info;
}
//RENDER IMAGE
function renderImage(data) {
    console.log(data);
    $('#home').html(`<div id="home-image"><img src="${data[0].fanart}"></div>`); //CHANGE HOME
}

//HANDLE ERRORS
function handleErrors(error) {
    $('#home').html('<p style=“color: red;“>' + error + '</p>'); //CHANGE HOME
}
