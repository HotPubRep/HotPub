var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Result = require('../models/Result');
const Coordenate = require('../models/Coordenate');
const classifier = require('../classifier');
const isLoggedIn = require('../middlewares/isLoggedIn');



router.get('/', isLoggedIn,(req, res, next) => {
  //console.log("Usuario conectado: " + req.user.username);
  const userId = req.user.id;  

  Result.find({user_id:userId}).populate('coordenate_id')
  .then(resultByUser => { console.log(resultByUser);
    res.render('hotpub/hotpub', { title: 'HotPub', country: '', result:'', resultsByUser:resultByUser})})
  .catch(e => next(e));
  
});

router.post('/', isLoggedIn, (req, res, next) => {
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
          Result.find({user_id:user._id}).populate('coordenate_id')
          .then(resultByUser => { console.log(resultByUser);
            res.render('hotpub/hotpub', { title: 'HotPub', country: country, result:r, resultsByUser:resultByUser})})
          .catch(e => next(e));


        }
    });//fin save

    });// fin API result

    });//fin exect find coordenate
  });//fin exect find user

});


module.exports = router;