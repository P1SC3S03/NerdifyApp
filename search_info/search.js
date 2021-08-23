const accessToken = 'BQBdLKBrWZCAVTFjoshnoOMzEQXkMrr8ysrDGqPxPU_zqUSKHlsLvNXW6bsWvA8R-wKwpsvgLlKq_FLKDPT1-r6_5IC5CX_kzkfmt6WS9VLTIAdU8sDx5sf3THPPlIz5n4qWPNA5ht5dtXy7uW4bH4OmsNVYsSOW0JfMONYVyCuMA33FN8hKewsrJJU';

window.onload = () => {
    const button = document.getElementById('button');

    button.addEventListener('click', search);

}

function search() {
    //Get the value of the search box
    let raw_search_query = $('#search').val();
    let search_query = encodeURI(raw_search_query);
    // Make Spotify API call
    $.ajax({
        url: `https://api.spotify.com/v1/search?q=${search_query}&type=track,artist,album&limit=5`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (data) {
            console.log(data)
            // Load our songs from Spotify into our page
            let num_of_tracks = data.tracks.items.length;
            let count = 0;
            // Max number of songs is 12
            const max_songs = 12;

            while (count < max_songs && count < num_of_tracks) {
                // Extract the id of the FIRST song from the data object
                let id = data.tracks.items[count].id;
                // Constructing two different iframes to embed the song
                let src_str = `https://open.spotify.com/embed/track/${id}`;
                let iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
                let parent_div = $('#song_' + count);
                parent_div.html(iframe);
                count++;
            }
        }
    }) // End of Spotify ajax call
    .catch(error => console.error(error))
} // End of search button */

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