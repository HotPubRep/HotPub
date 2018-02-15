require('dotenv').config();
const mongoose = require('mongoose');
const Coordenate = require('../models/Coordenate');

mongoose.connect(process.env.MONGO_URL);

const coordenates = [{
    lat: 40.4893538421231,
    lng: -3.6827461557,
    rad: 10,
    country: "Spain",
    radUnits: "km"
  },
  {
    lat: 48.8588376,
    lng: 2.2768485,
    rad: 10,
    country: "France",
    radUnits: "km"
  },
  {
    lat: 52.5065116,
    lng: 13.1438665,
    rad: 10,
    country: "Germany",
    radUnits: "km"
  },
  {
    lat: 51.5285578,
    lng: -0.2420248,
    rad: 10,
    country: "England",
    radUnits: "km"
  }
];

Coordenate.create(coordenates, (err, docs) => {
  if (err) {
    throw err
  };
  docs.forEach((coordenate) => {
    console.log(coordenate.lat + coordenate.lng)
  })
  mongoose.connection.close();
});