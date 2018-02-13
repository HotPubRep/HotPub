const mongoose = require('mongoose');
const Coordenate = require('../models/Coordenate');

mongoose.connect("mongodb://localhost/HotPub-ironhack");

const coordenates = [{
    lat: 40.4893538421231,
    lng: -3.6827461557,
    rad: 10,
    //city: "Madrid",
    radUnits: "km"
  },
  {
    lat: 41.3818,
    lng: 2.1685,
    rad: 10,
    //city: "Barcelona",
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