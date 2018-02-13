const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username can't be empty"]
  },
  password: {
    type: String,
    required: [true, "Password can't be empty"]
  },
  role: {
    type: String,
    enum : ['Admin', 'User'],
    default : 'User'
  }

}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;