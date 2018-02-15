var express = require('express');
var router = express.Router();
const Coordenate = require('../models/Coordenate');

function checkRoles(role) {
  return function(req, res, next) {
    console.log("entramos en checkroles");
    if (req.isAuthenticated() && req.user.role === role) {
      console.log(req.user.role);
      return next();
    } else {
      res.redirect('/login')
      //return next();
    }
  }
}

var checkAdmin  = checkRoles('Admin');

/* GET admin page. */
router.get('/', checkAdmin, function(req, res, next) {

  Coordenate.find().exec((err,coordenates) => {
    res.render('admin/admin', { 
      title: 'HotPub',
      coordenates: coordenates
     });
  });
});

module.exports = router;