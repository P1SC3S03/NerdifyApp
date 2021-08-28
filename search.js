  
  $(document).ready(function () {

    const getUrlParameter = (sParam) => {
      let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
        sParameterName,
        i;
  
      let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
      sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
  
      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
      }
    };
  
    const accessToken = getUrlParameter('access_token');
    let client_id = 'b1be58a2a84e423e88f88256823a1447';
    let redirect_uri = 'http%3A%2F%2F127.0.0.1%3A5500%2Fdashboard.html';
    window.history.pushState("","", 'dashboard.html');
    const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
  
    if (accessToken == null || accessToken == "" || accessToken == undefined) {
      window.location.replace(redirect);
    }

    function cleanPage() {
      $('#renderTitle').empty();
      $('#renderImage').empty();
      $('#menuId').empty();
    }

    $(document).keyup(function(event) { 
      event.preventDefault();
      if (event.keyCode === 13) { 
          $("#search_button").click(); 
      } 
  }); 



  $("#microphone-image").on("click", function() {
    function startDictation() {
      if (window.hasOwnProperty("webkitSpeechRecognition")) {
          var recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US";
            recognition.start();
            recognition.onresult = function (e) {
                document.getElementById("search-text").value
                    = e.results[0][0].transcript;
                recognition.stop();                
                /* let search = document.getElementById("search-text").value;
                let searchEndPoint = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s='+ search; */
            };
            recognition.onerror = function (e) {
                recognition.stop();
            }
        }
    }
    startDictation();
  }); 
  
  $("#search_button").click(function () {
    let raw_search_query = $('#search-text').val();
    let search_query = encodeURI(raw_search_query);
    
    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${search_query}&type=track,artist,album&limit=8`,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      success: function (data) {  
        let num_of_tracks = data.tracks.items.length;
        let count = 0;
        
        const max_songs = 10;
        while (count < max_songs && count < num_of_tracks) {
          
          let id = data.tracks.items[count].id;
  
          let src_str = `https://open.spotify.com/embed/track/${id}`;
          let iframe = `<div class='songs'><iframe class="iframe" src=${src_str} frameborder="0" allowtransparency="true" height="400" width="450" allow="encrypted-media"></iframe></div>`
          let parent_div = $('#song_' + count);
          parent_div.html(iframe);
          count++;
        }
      }
    });
  });
  
  $("#search_button").on("click", function () {
    let search = $('#search-text').val();
    
    if(!search) {
    cleanPage();
    return;
    }

    $("#menuId").empty();
    const openHeaders = $(`<h2 id="h2-artist-info">Artist Information</h2>

    <button class="accordion">Country</button>
    <div class="panel">
    <div id="Country"></div>
    </div>

    <button class="accordion">Genre and Style</button>
    <div class="panel">
    <div id="GenreAndStyle"></div>
    </div>

    <button class="accordion">Biograpy in English</button>
    <div class="panel">
    <div id="BiographyInEnglish"></div>
    </div>

    <button class="accordion">Biografia em Português</button>
    <div class="panel">
    <div id="BiografiaEmPortuguês"></div>
    </div>
    
    <button class="accordion">Albums</button>
    <div class="panel">
    <div id="Albums"></div>
    </div>
    <h2 id="h2-Music">Music</h2>
    <div id="renderMusic">
    <div class="div">
    <div id="song_0" class="col"></div>
    <div id="song_1" class="col"></div>
    <div id="song_2" class="col"></div>
    <div id="song_3" class="col"></div>
    </div>
    <div class="div">
    <div id="song_4" class="col"></div>
    <div id="song_5" class="col"></div>
    <div id="song_6" class="col"></div>
    <div id="song_7" class="col"></div>
    </div>
    </div>`);

    $("#menuId").append(openHeaders);
    
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
});
  $('#search_button').on('click', () => {
      let search = $('#search-text').val().toLowerCase();
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
              alert('Invalid Search 🚫');
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

        if(!data.artists) {
          cleanPage();
          alert('We are sorry... 😔 \n The artist you are trying to search is not available in our database...');
          return;
        }
          const artist = data.artists.map(artist => {
              if (JSON.stringify(artist.strArtist).toLowerCase().includes(JSON.stringify(search))) {
                  if (!artist.strArtistFanart) {
                      artist.strArtistFanart = 'No image available';
                  }
                  if (!artist.strBiographyPT) {
                      artist.strBiographyPT = 'Sem informação disponível';
                  }
                  if (!artist.strBiographyEN) {
                      artist.strBiographyEN = 'No data available';
                  }
                  if (!artist.strCountry) {
                      artist.strCountry = 'Unknown Country';
                  }
                  if (!artist.strCountryCode) {
                      artist.strCountryCode = 'Unknown Country Code';
                  }
                  if (!artist.strGenre) {
                      artist.strGenre = 'Unkown Genre';
                  }
                  if (!artist.strStyle) {
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
          setTimeout(function () {
              renderTitle(data);
              renderArtistImage(data);
              renderArtistBioPT(data);
              renderArtistBioEN(data);
              renderArtistCountry(data);
              renderArtistGenreAndStyle(data);
          }, 10);

      }

      //FETCH ALBUMS BY ARTIST
      function fetchAlbunsByArtist(data) {
          let info = data.album.map(album => {
              if (!album.strAlbumThumb) {
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
          console.log(data);
          let content = '<h3 id ="titleRender">' + data[0].name + '</h3>';
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
          setTimeout(function () {
              let content = '<h3 id="album-title"><b>Albums</b></h3>';

              for (let i = 0; i < data.length; i++) {
                  content += `<p>
  <img id="album-images" src="${data[i].albumImage}" alt="${data[i].albumName}"> <br></p>
  <p id="album-text"><b>Album Name:</b> ${data[i].albumName} <br>
  <b>Year:</b> ${data[i].releaseYear} <br>
  <b>Album Description in English:</b> ${data[i].descriptionEN}<br>
  <b>Descrição do Album em Português:</b> ${data[i].descriptionPT}</p>`;
              }

              $('#Albums').html(content);
          }, 10);
      }
  });
});