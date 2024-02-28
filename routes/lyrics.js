const express = require('express');
const router = express.Router();
const lyricsController = require('../controllers/lyricsController');

router.get('/', lyricsController.renderLyricsPage);
router.get('/search', lyricsController.searchLyrics);

module.exports = router;
