var express = require('express');
var router = express.Router();
const Coordenate = require('../models/Coordenate');

function checkRoles(role) {
  return function (req, res, next) {
    console.log(req.user.role);
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login')
      //return next();
    }
  }
}

var checkAdmin = checkRoles('Admin');

/* GET admin page. */
router.get('/', checkAdmin, function (req, res, next) {

  Coordenate.find().exec((err, coordenates) => {
    res.render('admin/admin', {
      title: 'HotPub',
      coordenates: coordenates
    });
  });
});

/* GET admin/coordenates page. */
router.get('/coordenate/new', checkAdmin, function (req, res, next) {
  res.render('coordenate/new', {
    title: 'HotPub'
  });
});

/* POST admin/coordenates page. */
router.post('/coordenate/new', checkAdmin, function (req, res, next) {

  const newCoordenate = new Coordenate({
    lat: req.body.latitud,
    lng: req.body.longitud,
    rad: req.body.radio,
    country: req.body.country,
    radUnits: req.body.radUnits
  });

  console.log(newCoordenate);

  newCoordenate.save((err) => {
    if (err) {
      console.log(err);
      res.render("/admin/coordenate/new", {
        //username: user.username,
        //errorMessage: err.errors.tweet.message
      });

    } else {
      console.log("guardamos coordenada correctamete");
      res.render('/admin', {
        title: 'HotPub'
      });
    }

  });

});



module.exports = router;