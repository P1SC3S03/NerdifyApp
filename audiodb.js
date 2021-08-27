$(document).ready(function () {
    $('#search-text').change((event) => {
        let search = event.target.value.toLowerCase();
        inputVerification(search);

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
        .then(renderAlbums)
        .catch(handleErrors);

//INPUT VERIFICATION/TREATMENT
function inputVerification(search) {
    if (!search) {
      return;
    
    }

    search = search.replaceAll(" ", "_");

    return search;
}

// PARSE JSON 
function parseResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

//EXTRACT IMPORTANT ARTIST INFO
function artistInfo(data) {
    const artist = data.artists.map(artist => {
        if (JSON.stringify(artist.strArtist).toLowerCase().includes(JSON.stringify(search))) {
            if(!artist.strArtistFanart){
                artist.strArtistFanart = 'No image available';
            }
            if(!artist.strBiographyPT){
                artist.strBiographyPT = 'Sem informação disponível';
            }
            if(!artist.strBiographyEN){
                artist.strBiographyEN = 'No data available';
            }
            if(!artist.strCountry) {
                artist.strCountry = 'Unknown Country';
            }
            if(!artist.strCountryCode) { 
                artist.strCountryCode = 'Unknown Country Code';
            } 
            if(!artist.strGenre){
                artist.strGenre = 'Unkown Genre';
            }
            if(!artist.strStyle) {
                artist.strStyle = 'Unkown Style';
            }
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
    renderTitle(data);
    renderArtistImage(data);
    renderArtistBioPT(data);
    renderArtistBioEN(data);
    renderArtistCountry(data);
    renderArtistGenreAndStyle(data);
}

//FETCH ALBUMS BY ARTIST
function fetchAlbunsByArtist(data) {
        let info = data.album.map(album => {
        if(!album.strAlbumThumb) {
            album.strAlbumThumb = ''; 
        }
        if (!album.strDescriptionEN) {
            album.strDescriptionEN = 'No data available';
        }
        if (!album.strDescriptionPT) {
            album.strDescriptionPT = 'Sem informação disponível';
        }
        return {
            idAlbum: album.idAlbum, idArtist: album.idArtist,
            albumName: album.strAlbum, albumImage: album.strAlbumThumb, releaseYear: album.intYearReleased,
            descriptionEN: album.strDescriptionEN, descriptionPT: album.strDescriptionPT
        }
    });
    return info;
}

//HANDLE ERRORS
function handleErrors(error) {
    $('#home').html('<p style=“color: red;“>' + error + '</p>');
}

//------------------AUXILIAR METHODS--------------------//

//----ARTIST----//

//RENDER TITLE
function renderTitle(data) {
    let content = '<h3 id ="titleRender">'+data[0].name+'</h3>';
    $('#renderTitle').html(content);
}

//RENDER ARTIST IMAGE
function renderArtistImage(data) {
    let content = `<div id="home-image"><img id="image" src="${data[0].fanart}"></div>`;
    $('#renderImage').html(content);
}

//ARTIST BIO IN PORTUGUESE
function renderArtistBioPT(data) {
    let content = '<h3>Biografia em Português</h3>';

    content += `<p id="BioInPortuguese">${data[0].bioPT}</p>`;

    $('#BiografiaEmPortuguês').html(content);
}

//ARTIST BIO IN ENGLISH
function renderArtistBioEN(data) {
    let content = '<h3>Biography in English</h3>';

    content += `<p>${data[0].bioEN}</p>`;

    $('#BiographyInEnglish').html(content);
}

//ARTIST COUNTRY
function renderArtistCountry(data) {
    let content = '<h3>Country</h3>';

    content += `<p>${data[0].country}: ${data[0].countryInit}</p>`;

    $('#Country').html(content);
}

//ARTIST GENRE AND STYLE
function renderArtistGenreAndStyle(data) {
    let content = '<h3>Genre And Style</h3>';

    content += `<p><b>Genre:</b> ${data[0].genre} <br><b>Style:</b> ${data[0].style}</p>`;

    $('#GenreAndStyle').html(content);
}

//----ALBUMS----//

//ALBUM INFORMATION (NAME, YEAR, IMAGE, DESCRIPTION_EN, DESCRIPTION_PT)
function renderAlbums(data) {
    let content = '<h3 id="album-title"><b>Albums</b></h3>';

    for (let i=0; i < data.length; i++){
    content += `<p>
    <img id="album-images" src="${data[i].albumImage}" alt="${data[i].albumName}"> <br></p>
    <p id="album-text"><b>Album Name:</b> ${data[i].albumName} <br>
    <b>Year:</b> ${data[i].releaseYear} <br>
    <b>Album Description in English:</b> ${data[i].descriptionEN}<br>
    <b>Descrição do Album em Português:</b> ${data[i].descriptionPT}</p>`;
    }

    $('#Albums').html(content);
}
});
});
