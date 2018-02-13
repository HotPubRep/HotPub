const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require('../models/User');
mongoose.connect("mongodb://localhost/HotPub-ironhack");
var salt = bcrypt.genSaltSync(bcryptSalt);
const password1 = "ironhack";
const password2 = "ironhack";

const users = [{
    username: 'admin',
    password: bcrypt.hashSync(password1, salt),
  },
  {
    username: 'user1',
    password: bcrypt.hashSync(password2, salt),
  }
];

User.collection.drop();

User.create(users, (err, docs) => {
  if (err) {
    throw err
  };
  docs.forEach((user) => {
    console.log(user.username)
  })
  mongoose.connection.close();
});