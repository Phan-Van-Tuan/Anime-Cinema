const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;



const Cinema = new Schema({
  name: { type: String, require: true },
  address:  { type: String, require: true },
  phone:  { type: String, require: true},
  slug: { type: String, slug: 'name', unique: true }
});

// Add plugin
mongoose.plugin(slug);
Cinema.plugin(mongooseDelete, { 
  deletedAt: true,
  overrideMethods: 'all'
});

module.exports = mongoose.model("cinema", Cinema,"cinema");