const express = require('express');
const router = new express.Router();
const axios = require('axios').default;
const ImageData = require('../models/Images');
var FormData = require('form-data');
var fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/addfilms', upload.single('image'), async (req, res) => {
  try {
    // const { image } = req.body || {};
    var film;
    const formData = new FormData();
    formData.append('image', req.file);
    formData.append('upload_preset', 'lvhsyqrb');
    axios
      .post('https://api.cloudinary.com/v1_1/arpesh28/image/upload', formData)
      .then((res) => {
        console.log('res', res);
        // film = new ImageData({ ...req.body, image: res, thumbnail: res });
      })
      .catch((err) => {
        console.log('upld Err:', err);
      });

    // await film
    //   .save()
    //   .then((result) => {
    //     console.log('result', result);
    //   })
    //   .catch((er) => {
    //     console.log('error');
    //   });

    res.status(201).send(film);
  } catch (err) {
    console.log('Adding Error', err);
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
