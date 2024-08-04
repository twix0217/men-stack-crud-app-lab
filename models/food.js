//Mongoose connect
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

const food = mongoose.model('food', foodSchema)
module.exports = food