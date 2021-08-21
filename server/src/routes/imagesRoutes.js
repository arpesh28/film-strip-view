const express = require('express');
const router = new express.Router();

const ImageData = require('../models/Images');

router.post('/addfilms', async (req, res) => {
  try {
    console.log('Requests:', req.body);
    const film = new ImageData(req.body);
    await film
      .save()
      .then((result) => {
        console.log('result', result);
      })
      .catch((er) => {
        console.log('error');
      });

    res.status(201).send(film);
  } catch (err) {
    console.log('Adding Error');
    return res.status(400).send('err');
  }
});

router.get('/filmData', async (req, res) => {
  try {
    const filmData = await ImageData.find({});
    console.log('Film Data:', filmData);
    res.send(filmData);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).send();
  }
});

module.exports = router;
