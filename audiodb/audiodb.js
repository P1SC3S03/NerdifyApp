$(document).ready(function () {
    search = 'Eminem'.toLowerCase(); // CHANGE TO USER INPUT

    //API KEY = 523532

    const searchArtistUrl = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=';
    const searchAlbumsByArtistURL = 'https://www.theaudiodb.com/api/v1/json/523532/searchalbum.php?s=';

    fetch(searchArtistUrl + search)
        .then(parseResponse)
        .then(artistInfo)
        .then(renderArtistHTML)
        .catch(handleErrors);

    fetch(searchAlbumsByArtistURL + search)
        .then(parseResponse)
        .then(fetchAlbunsByArtist)
        .then(renderAlbumHTML)
        .catch(handleErrors);
});

// PARSE JSON 
function parseResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json();
}

//EXTRACT IMPORTANT ARTIST INFO
function artistInfo(data) {
    const artist = data.artists.map(artist => {
        if (JSON.stringify(artist.strArtist).toLowerCase().includes(JSON.stringify(search))) {
            return {
                id: artist.idArtist, name: artist.strArtist, fanart: artist.strArtistFanart,
                bioPT: artist.strBiographyPT, bioEN: artist.strBiographyEN,
                country: artist.strCountry, countryInit: artist.strCountryCode,
                genre: artist.strGenre, style: artist.strStyle
            }
        }
    });
    artist.splice(1, 1);
    return artist;
}

//RENDER ARTIST HTML
function renderArtistHTML(data) {
    renderTitleAux(data);
    renderArtistImage(data);
    renderArtistBioPT(data);
    renderArtistBioEN(data);
    renderArtistCountry(data);
    renderArtistGenreAndStyle(data);
}

//RENDER ALBUMS HTML
function renderAlbumHTML(data) {
    renderAlbumName(data);
    renderAlbumYear(data);
    renderDescriptionEnglish(data);
    renderDescriptionPortuguese(data);
}

//FETCH ALBUMS BY ARTIST
function fetchAlbunsByArtist(data) {
    console.log(data);

    let info = data.album.map(album => {
        if (!album.strDescriptionEN) {
            album.strDescriptionEN = 'No data available';
        }
        if (!album.strDescriptionPT) {
            album.strDescriptionPT = 'No data available';
        }
        return {
            idAlbum: album.idAlbum, idArtist: album.idArtist,
            albumName: album.strAlbum, releaseYear: album.intYearReleased,
            descriptionEN: album.strDescriptionEN, descriptionPT: album.strDescriptionPT
        }
    });
    console.log(info);
    return info;
}

//HANDLE ERRORS
function handleErrors(error) {
    $('#home').html('<p style=“color: red;“>' + error + '</p>');
}

//------------------AUXILIAR METHODS--------------------//

//----ARTIST----//

//RENDER TITLE
function renderTitleAux(data) {
    let content = '<h3 id ="titleRender">'+data[0].name+'</h3>';
    $('#renderTitle').html(content);
}

//RENDER ARTIST IMAGE
function renderArtistImage(data) {
    $('#renderImage').html(`<div id="home-image"><img id="image" src="${data[0].fanart}"></div>`);
}

//ARTIST BIO IN PORTUGUESE
function renderArtistBioPT(data) {
    let content = '<h3>Biografia em Português</h3>';

    content += `<p>${data[0].bioPT}</p>`;

    $('#renderArtistBioPT').html(content);
}

//ARTIST BIO IN ENGLISH
function renderArtistBioEN(data) {
    let content = '<h3>Biography in English</h3>';

    content += `<p>${data[0].bioEN}</p>`;

    $('#renderArtistBioEN').html(content);
}

//ARTIST COUNTRY
function renderArtistCountry(data) {
    let content = '<h3>Country</h3>';

    content += `<p>${data[0].country}: ${data[0].countryInit}</p>`;

    $('#renderArtistCountry').html(content);
}

//ARTIST GENRE AND STYLE
function renderArtistGenreAndStyle(data) {
    let content = '<h3>Genre And Style</h3>';

    content += `<p><b>Genre:</b> ${data[0].genre} <br><b>Style:</b> ${data[0].style}</p>`;

    $('#renderArtistGenreAndStyle').html(content);
}

//----ALBUM----//

//ALBUM NAME
function renderAlbumName(data) {
    let content = '<h3>Album Name</h3>';

    content += `<p>${data[0].albumName}</p>`;

    $('#renderAlbumName').html(content);
}


//ALBUM YEAR
function renderAlbumYear(data) {
    let content = `<p><b>Album Year: </b>${data[0].releaseYear}</p>`;

    $('#renderAlbumYear').html(content);
}        

//ALBUM DESCRIPTION ENGLISH 
function renderDescriptionEnglish(data) {
    let content = '<h3>Album Description English</h3>';

    content += `<p>${data[0].descriptionEN}</p>`;

    $('#renderAlbumDescriptionEN').html(content);
}

//ALBUM DESCRIPTION PORTUGUESE
function renderDescriptionPortuguese(data) {
    let content = '<h3>Descrição do Album em Português</h3>';

    content += `<p>${data[0].descriptionPT}</p>`;

    $('#renderAlbumDescriptionPT').html(content);
}
