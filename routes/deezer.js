const express = require('express');
const router = express.Router();
const { renderDeezerPage, searchTracks } = require('../controllers/deezerController');

router.get('/', renderDeezerPage);

router.get('/search', searchTracks);

module.exports = router;
