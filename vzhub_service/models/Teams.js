// Item.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Event
var Team = new Schema({
  teamId: {
    type: String
  },
  teamName: {
    type: String
  },
  teamMembers: [{
    participantName: {
        type: String
      },
    participantEmail: {
        type: String
      },
  }]

});