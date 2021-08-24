window.onload = () => {
    const url = 'https://www.theaudiodb.com/api/v1/json/523532/searchalbum.php?s=';
    const testString = 'abba';

    fetch(url + testString)
        .then(parseResponse)
        .then(fetchAlbunsByArtist)
        .catch(error => console.error(error))
}

function parseResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json();
}

function fetchAlbunsByArtist(data) {
    console.log(data);

    let info = data.album.map(album => {
        if (!album.strDescriptionEN){
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