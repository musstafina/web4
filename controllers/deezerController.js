const axios = require('axios');

const renderDeezerPage = (req, res) => {
    res.render('deezer');
};

const searchTracks = async (req, res) => {
    const { query } = req.query;

    try {
        const response = await axios.get(`https://api.deezer.com/search?q=${query}`);
        const { data } = response;

        const tracks = data.data.map(track => ({
            id: track.id,
            title: track.title,
            artist: track.artist.name,
            album: {
                title: track.album.title,
                cover_medium: track.album.cover_medium,
            }
        }));
        

        res.json(tracks);
    } catch (error) {
        console.error('Error searching for tracks on Deezer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { renderDeezerPage, searchTracks };
