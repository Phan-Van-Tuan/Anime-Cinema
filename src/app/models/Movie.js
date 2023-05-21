const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;



const Movie = new Schema({
  name: { type: String, minLength: 1 },
  description:  { type: String },
  image:  { type: String, default: '/img/Anime Cinema.png'},
  note: {type: String },
  runtime: {type: Number },
  genre: {type: String },
  released: {type: Date },
  rating: {type: String },
  director: {type: String},
  author: {type: String },
  evaluate: {type: Number },
  slug: { type: String, slug: 'name', unique: true }
}, {
  timestamps: true
});

// Add plugin
mongoose.plugin(slug);
Movie.plugin(mongooseDelete, { 
  deletedAt: true,
  overrideMethods: 'all'
});

module.exports = mongoose.model("movie", Movie,"animes");