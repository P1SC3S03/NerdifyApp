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
      url: `https://api.spotify.com/v1/search?q=${search_query}&type=track,artist,album&limit=10`,
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
          let iframe = `<div class='songs'><iframe class="iframe" src=${src_str} frameborder="0" allowtransparency="true" height="75" allow="encrypted-media"></iframe></div>`;
          let parent_div = $('#Music' + count);
          parent_div.html(iframe);
          count++;
        }
      }
    });
  });
  $("#search_button").on("click", function () {
    $("#menuId").empty();
    const openHeaders = $(`<button class="tablink" onclick="openPage('Country', this, 'red')">Country</button>
    <button class="tablink" onclick="openPage('GenreAndStyle', this, 'green')" id="defaultOpen">Genre and Style</button>
    <button class="tablink" onclick="openPage('BiographyInEnglish', this, 'blue')">Biography in English</button>
    <button class="tablink" onclick="openPage('BiografiaEmPortuguês', this, 'orange')">Biografia em Português</button>
    <button class="tablink" onclick="openPage('Albums', this, 'red')">Albums</button>
    <button class="tablink" onclick="openPage('Music', this, 'orange')">Music</button>
    <div id="Country" class="tabcontent">
      <h3>Country</h3>
    </div>
    
    <div id="GenreAndStyle" class="tabcontent">
      <h3>Genre and Style</h3>
    </div>
  
    <div id="BiographyInEnglish" class="tabcontent">
    <h3>Biography in English</h3>
    </div>
    
    <div id="BiografiaEmPortuguês" class="tabcontent">
      <h3>Biografia em Português</h3>
    </div>
    <div id="Albums" class="tabcontent">
      <h3>Albums</h3>
    </div>
    <div id="Music" class="tabcontent">
      <h3>Music</h3>
    </div>`);
    $("#menuId").append(openHeaders);
  });
});
