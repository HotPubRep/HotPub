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
      res.redirect('/admin')
    }

  });

});

router.get('/coordenate/:id', checkAdmin, (req, res, next) => {
  Coordenate.findById(req.params.id,(err, coordenate) => {
    if (err) { return next(err) }
    if (!coordenate) { return next(new Error("404")) }
    return res.render('coordenate/view', { coordenate })
    });
});

router.get('/coordenate/edit/:id', checkAdmin, (req, res, next) => {
  console.log("entramos en el get");
  Coordenate.findById(req.params.id, (err, coordenate) => {
      if (err) { return next(err) }
      if (!coordenate) { return next(new Error("404")) }
      return res.render('coordenate/edit', { coordenate })
  });
});

router.post('/coordenate/edit/:id', checkAdmin, (req, res, next) => {
  
  console.log("entramos en post");
  const coordenateId = req.params.id;
  const newCoordenate = {
    lat: req.body.latitud,
    lng: req.body.longitud, 
    rad: req.body.radio,
    country: req.body.country,
    radUnits: req.body.radUnits
  };
  console.log(newCoordenate);
  Coordenate.findByIdAndUpdate(coordenateId, newCoordenate, (err, coordenate) => {
      if (err) {
          
          return res.render('/admin', {
            coordenate
              //errors: campaign.errors
          });
      }
      if (!coordenate) {
          return next(new Error('Error, coordenate does not exist.'));
      }
      
      return res.redirect('/admin');
  });
});

router.get('/coordenate/view/:id', checkAdmin, (req, res, next) => {
  Coordenate.findById(req.params.id, (err, coordenate) => {
      if (err) { return next(err) }
      if (!coordenate) { return next(new Error("404")) }
      return res.render('coordenate/view', { coordenate })
  });
});

router.get('/coordenate/delete/:id', (req, res) => {
  const id = req.params.id;

  Coordenate.findByIdAndRemove(id, (err, product) => {
    if (err){ return next(err); }
    return res.redirect('/admin');
  });
});



module.exports = router;