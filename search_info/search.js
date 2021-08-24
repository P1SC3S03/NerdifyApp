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


    $(document).keyup(function(event) { 
      event.preventDefault();
      if (event.keyCode === 13) { 
          $("#search_button").click(); 
      } 
  }); 


  
  $("#microphone-image").on("click", function() {
    function startDictation() {
        if (window.hasOwnProperty(`webkitSpeechRecognition`)) {
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US";
            recognition.start();
            recognition.onresult = function (e) {
                document.getElementById(`transcript`).value
                    = e.results[0][0].transcript;
                recognition.stop();
                // VARIAVEL COM O SEARCH-SPEECH AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
                let search = document.getElementById(`transcript`).value;
                let searchEndPoint = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s='+ search;
                console.log(searchEndPoint)
               
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
        url: `https://api.spotify.com/v1/search?q=${search_query}&type=track,artist,album&limit=3`,
        type: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        success: function (data) {
          console.log(data)
  
          let num_of_tracks = data.tracks.items.length;
          let count = 0;
  
          const max_songs = 12;
          while (count < max_songs && count < num_of_tracks) {
  
            let id = data.tracks.items[count].id;
  
            let src_str = `https://open.spotify.com/embed/track/${id}`;
            let iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
            let parent_div = $('#song_' + count);
            parent_div.html(iframe);
            count++;
          }
        }
      });
    });
  });


/*  function searchArtist() {
    const input = document.getElementById('search').value;

    $.ajax({
        url: `https://api.spotify.com/v1/search?q=${input}&type=artist`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (data) {
            document.body.append();

            console.log(data);

            const ul = document.createElement('ul');
            document.body.appendChild(ul);

            data.artists.items.forEach(element => {
                if(element.images.length > 0) {
                    const li = document.createElement('li');
                    const img = document.createElement('img');
                    let id = element.id;
                    img.src = element.images[0].url;
                    img.onclick = function () {
                        window.location.href = 'https://open.spotify.com/artist/' + id;
                    }
                    li.appendChild(img);

                    ul.appendChild(li);
                }
            });
        }
    })
    .catch(error => console.error(error))
} 
 */