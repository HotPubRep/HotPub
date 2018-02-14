var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Result = require('../models/Result');
const Coordenate = require('../models/Coordenate');
const classifier = require('../classifier');

router.get('/', (req, res, next) => {
  console.log("Usuario conectado: " + req.user.username);
  let params = {
    q: "*",
    geocode: "40.4893538421231,-3.6827461557,10km",
    lang: "en",
    count: 100
  }
   classifier(params).then((r)=> {
     
    console.log("entramos"); 
    console.log(r)
  
   res.render('hotpub/hotpub', { title: 'HotPub',  country: "Spain" , result: r });
  
  });
  //classifier.function(params).then((r)=> {
    
    
    //console.log("entramos"); console.log(r)

    //res.render('hotpub/hotpub', { title: 'HotPub',  country: "Spain"  });

 // });

});

/*
router.post('/', (req, res, next) => {
//router.get('/', (req, res, next) => {
  const user = req.user.username;
  const country = req.body.country;
  //const word = req.body.word;

  User.findOne({username: user})
  .exec((err, user) => {
     if (err) {
        return;
     }
    
    //Coordenate.findOne({country:country}).then((cor) => {
    Coordenate.findOne({country:"Spain"}) 
    .exec((err,cor) => {
      if (err) {
        return;
      }
      const id_cor = cor._id.toString();
      const geocode = cor.lat.toString() +","+ cor.lng.toString() +","+ cor.rad.toString() + cor.radUnits.toString() ;
      
      let params = { 
        q: '*', 
        //q:word,
        geocode: geocode,
        lang: "en",
        count: 100
      }
      
      classifier(params).then((r)=> {
        //console.log("entramos"); 
      const newResult = new Result({
        text: r.name,
        emotion: {name: r.emotion , value: r.value},
        user_id: user._id,
        coordenate_id: id_cor
        
      });
      //console.log(newResult);
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
            //****paso de parámetros por url
            //res.redirect("/");
            res.render('hotpub/hotpub', { title: 'HotPub' });
        }
    });//fin save

    
    });// fin API result

    });//fin exect find coordenate
  });//fin exect find user

});
*/

module.exports = router;