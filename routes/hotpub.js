var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  console.log("Usuario conectado: " + req.user.username);
  res.render('hotpub/hotpub', { title: 'HotPub' });
});

module.exports = router;