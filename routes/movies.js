const express = require('express');
const axios = require('axios');
const router = express.Router();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = 'http://www.omdbapi.com/';

// Get movie information by title
router.get('/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const response = await axios.get(`${OMDB_BASE_URL}?t=${title}&apikey=${OMDB_API_KEY}`);
        if (response.data.Response === 'False') {
            return res.status(404).json({ message: response.data.Error });
        }
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie data', error: error.message });
    }
});


// Get movie information by ID
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`${OMDB_BASE_URL}?i=${id}&apikey=${OMDB_API_KEY}`);
        if (response.data.Response === 'False') {
            return res.status(404).json({ message: response.data.Error });
        }
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie data', error: error.message });
    }
});

module.exports = router;

