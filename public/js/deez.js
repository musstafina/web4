$(document).ready(function () {
    $('#searchForm').submit(function (event) {
        event.preventDefault();
        searchTracks($('#searchQuery').val());
    });

    function searchTracks(query) {
        $.get('/deezer/search', { query: query }, function (data) {
            displayResults(data);
        });
    }

    function displayResults(results) {
        $('#searchResults').empty();
        if (Array.isArray(results)) {
            results.forEach(function (track) {
                const trackItem = `<div class="track-item">
                                        <p>${track.title}</p>
                                        <p>${track.artist}</p>
                                        <p>${track.album.title}</p>
                                        <img src="${track.album.cover_medium}" alt="Album Cover">
                                    </div>`;
                $('#searchResults').append(trackItem);
            });
        } else {
            $('#searchResults').append('<p>No results found</p>');
        }
    }
});
