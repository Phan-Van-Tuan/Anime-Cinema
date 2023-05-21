const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Ticket = new Schema({
  idShowTime:  { type: Schema.Types.ObjectId , ref:'showTime' },
  chairOfTicket: {type: String },
}, {
  timestamps: true
});


// Add plugin
Ticket.plugin(mongooseDelete, { 
  deletedAt: true,
  overrideMethods: 'all'
});

module.exports = mongoose.model("ticket", Ticket,"ticket");