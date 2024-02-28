const axios = require('axios');

const renderLyricsPage = (req, res) => {
    res.render('lyrics');
};

const searchLyrics = async (req, res) => {
    const { query } = req.query;

    try {
        const { data } = await axios.get(`https://api.lyrics.ovh/suggest/${query}`);
        res.json(data);
    } catch (error) {
        console.error('Error searching for lyrics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { renderLyricsPage, searchLyrics };
