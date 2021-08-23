window.onload = () => {
    const button = document.getElementById('button');

    button.addEventListener('click', searchArtist);

}


function searchArtist() {
    const input = document.getElementById('artist').value;
    const accessToken = 'BQBlOxx5mfajGcxqXvXG-stKeXRcmlAGwr5hOfhVpeeevGRlv05iTNO2M0Jsqv_IDLb5PFO4nPampXjimSYuW9ghXvvFWH65U3zWVGiBHDAB1yFHOvVu8n82ZVRSYuaQQQPfgcWjw4Bsh5ZMimHNsuTnRk0VoElWLUpUrA5WD7I';
    
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
           for (let i = 0; i < data.artists.items.length; i++) {
                const li = document.createElement('li');
                const teste = li.innerHTMl = data.artists.items[i].external_urls.spotify;
                teste.splice
                ul.appendChild(li);
           }
        }
        })
        .catch(error => console.error(error));
}