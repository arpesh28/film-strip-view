require('./src/models/Images');
require('./src/db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const imagesRoutes = require('./src/routes/imagesRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(imagesRoutes);

app.get('/', (req, res) => {
  res.send('FilmStrip');
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
