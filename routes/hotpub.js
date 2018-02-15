var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Result = require('../models/Result');
const Coordenate = require('../models/Coordenate');
const classifier = require('../classifier');

router.get('/', (req, res, next) => {
  //console.log("Usuario conectado: " + req.user.username);  
  res.render('hotpub/hotpub', { title: 'HotPub', country: '', result:{}});

});

router.post('/', (req, res, next) => {
  const user = req.user.username;
  const country = req.body.country;

  console.log(country);

  User.findOne({username: user})
  .exec((err, user) => {
     if (err) {
        return;
     }
    
    Coordenate.findOne({country:country})
    .exec((err,cor) => {
      if (err) {
        return;
      }
      const id_cor = cor._id.toString();
      const geocode = cor.lat.toString() +","+ cor.lng.toString() +","+ cor.rad.toString() + cor.radUnits.toString() ;
      
      let params = { 
        q: '*', 
        geocode: geocode,
        lang: "en",
        count: 100
      }
      
      classifier(params).then((r)=> {
      const newResult = new Result({
        text: r.name,
        emotion: {name: r.emotion , value: r.value},
        user_id: user._id,
        coordenate_id: id_cor
        
      });
     
    newResult.save((err) => {
        if (err) {
            console.log("err");
            console.log(err);
            res.render("/", {
                //username: user.username,
                //errorMessage: err.errors.tweet.message
            });
        } else {
          console.log("guardamos correctamete");
            res.render('hotpub/hotpub', { title: 'HotPub',  country: country , result: r });
        }
    });//fin save

    });// fin API result

    });//fin exect find coordenate
  });//fin exect find user

});


module.exports = router;