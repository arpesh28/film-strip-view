const express = require('express');
const router = new express.Router();
const axios = require('axios').default;
const ImageData = require('../models/Images');
const path = require('path');
// var FormData = require('form-data');
// var fs = require('fs');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'arpesh28',
  api_key: '589537668678458',
  api_secret: 'WNvyHxZMZnP7UI2sva75nRcZPUE',
});

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      cb(new Error('FIle type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

router.post('/addfilms', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const { secure_url, url } = result;
    const imageData = ImageData({
      ...req.body,
      image: url,
      thumbnail: url,
    });

    await imageData
      .save()
      .then((result) => {
        console.log('result', result);
      })
      .catch((er) => {
        console.log('error');
      });

    res.status(201).send(imageData);
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
