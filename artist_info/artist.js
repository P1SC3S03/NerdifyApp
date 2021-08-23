const accessToken = 'BQAGuupCHSYAu_gEU2OS6VT31pVv0r5CF673eTWXYUF1T_DHF5kw2DtPQTr4AMms0Zg6SnMe3y4-sllAFIB89os8LDzCMAbhLnxjiJN5Zzv0GtnPaNvJulNnQeZTSCToI64RBOjMf4Krn-fgxWLu4_LvjugnGbgb';

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
                        //data.artists.items[i].href; //See token
                    }
                    li.appendChild(img);
    
                    ul.appendChild(li);
                }
            });
        }
    })
    .catch(error => console.error(error))
}