$(document).ready(function () {
    $('#searchForm').submit(function (event) {
        event.preventDefault();
        searchLyrics($('#searchQuery').val());
    });

    function searchLyrics(query) {
        $.get('/lyrics/search', { query: query }, function (data) {
            displayResults(data);
        });
    }

    function displayResults(results) {
        $('#searchResults').empty();
        results.data.forEach(function (result) {
            const card = `
                <div class="result">
                    <h2>${result.artist.name} - ${result.title}</h2>
                    <p>${result.album.title}</p>
                    <button class="getLyrics" data-artist="${result.artist.name}" data-title="${result.title}">Get Lyrics</button>
                    <div class="lyrics" style="display:none;"></div>
                </div>
            `;
            $('#searchResults').append(card);
        });

        $('.getLyrics').click(function() {
            const artist = $(this).data('artist');
            const title = $(this).data('title');
            const lyricsContainer = $(this).siblings('.lyrics');

            if (lyricsContainer.html().trim() === '') {
                getLyrics(artist, title, lyricsContainer);
            } else {
                lyricsContainer.slideToggle();
            }
        });
    }

    function getLyrics(artist, title, lyricsContainer) {
        $.get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .done(function(data) {
            const lyrics = data.lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>'); 
            lyricsContainer.html(`
                <h3>${artist} - ${title}</h3>
                <p>${lyrics}</p>
            `);
            lyricsContainer.slideToggle();
        })
        .fail(function() {
            lyricsContainer.html(`<p>Lyrics not found for ${artist} - ${title}</p>`);
            lyricsContainer.slideToggle();
        });
    }
});
