// Item.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Event
var Event = new Schema({
  eventId: {
    type: String
  },
  eventName: {
    type: String
  },
  eventDate: {
    type: String
  },
  datePosted: {
    type: Date, default: Date.now
  },
  location: {
    type: String
  },
  eventDesc: {
    type: String
  },
  eventDept: {
    type: String
  },
  eventPrize:{
    type: String
  },
  cancelled: {type: Boolean, default: false}

},{
    collection: 'events'
});

module.exports = mongoose.model('Event', Event);