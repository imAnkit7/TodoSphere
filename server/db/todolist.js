const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
   task: String,
   priority: String,
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 'User' must match the name of your user model
      required: true
   },
   status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
   },
   completedAt: {
      type: Date,
      default: null
   },

}, {
   timestamps: true
})

const histSchema = new mongoose.Schema({
   task: String,
   compltedAt: {
      type: Date,
      default: null
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 'User' must match the name of your user model
      required: true
   }
})
const userSchema = new mongoose.Schema({
   name: String,
   email: { type: String, unique: true },
   password: String

})
const List = mongoose.model('List', listSchema);
const Hist = mongoose.model('Hist', histSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
   List,
   Hist,
   User
};