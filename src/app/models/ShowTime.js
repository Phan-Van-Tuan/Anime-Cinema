const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const ShowTime = new Schema({
  idAnime:  { type: Schema.Types.ObjectId , ref:'movie' },
  idCinema: { type: Schema.Types.ObjectId , ref:'cinema' },
  date: {type: String },
  time: {type: String },
  price: {type: Number },
}, {
  timestamps: true
});


// Add plugin
ShowTime.plugin(mongooseDelete, { 
  deletedAt: true,
  overrideMethods: 'all'
});

module.exports = mongoose.model("showTime", ShowTime,"showTime");