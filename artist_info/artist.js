const accessToken = 'BQCAwi_WWUYZRE2XrGX-uEVcj_zwjDaf2kQ5N98x-N5emq-wiMkycM2BfJQfhsWhlQrobAqiRq0ZvkMsTLq5M4CnThhIsqpDgsNIoYqYQRfOd4Md5WemWUzH1na6OBktvOzG-g2AoebyDKYzs5pVtSSjtkO4zP_xeIEEYEY0sMY';

window.onload = () => {
    const button = document.getElementById('button');

    button.addEventListener('click', searchArtist);

}


function searchArtist() {
    const input = document.getElementById('artist').value;
    
    $.ajax({
        url: `https://api.spotify.com/v1/search?q=${input}&type=artist`,
        type: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        },
        success: function(data) {
            document.body.append();

            console.log(data);

           const ul = document.createElement('ul');
           document.body.appendChild(ul);

           for (let i in data.artists.items) {
                const li = document.createElement('li');
                const img = document.createElement('img');
                let id = data.artists.items[i].id;
                console.log(i);
                img.src = data.artists.items[i].images[2].url;
                
                
                
                img.onclick = function() {
                    window.location.href = 'https://open.spotify.com/artist/'+ id;
                    //data.artists.items[i].href; //See token
                }
                li.appendChild(img);
                
                ul.appendChild(li);
               }
           }
        })
        .catch(error => console.error(error));
}