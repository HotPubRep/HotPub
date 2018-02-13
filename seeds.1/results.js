const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const User = require('../models/User');
const Result = require('../models/Result');
const Coordenate = require('../models/Coordenate');
mongoose.connect("mongodb://localhost/HotPub-ironhack");

User.findOne({username:"user1"}).then((usr) => {
  const id = usr._id.toString();
  Coordenate.findOne({country:"Spain"}).then((cor) => {

    const id_cor = cor._id.toString();

    const results = [
      {
        text: "death",
        emotion: {name:"sadness", value:0.789},
        user_id: id,
        coordenate_id: id_cor
      },
      {
        text: "sun",
        emotion: {name:"happiness", value:0.300},
        user_id: id,
        oordenate_id: id_cor
      },
      {
        text: "violence",
        emotion: {name:"sadness", value:0.900},
        user_id: id,
        oordenate_id: id_cor
      }
    ];
    
    Result.collection.drop();
    
    Result.create(results, (err, docs)=>{
     if (err) { throw err };
       docs.forEach( (result) => {
         console.log(result.text);
       })
       mongoose.connection.close();
    });




  })



})



