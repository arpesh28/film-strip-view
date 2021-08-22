require('./src/models/Images');

const express = require('express');

const imagesRoutes = require('./src/routes/imagesRoutes');

require('./src/db/mongoose');

const app = express();

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
