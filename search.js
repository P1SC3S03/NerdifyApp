  
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
});