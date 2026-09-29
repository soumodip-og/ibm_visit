const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    mobile: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      default: '' },
    company: { type: String, default: '' },
    personToMeet: { type: String, required: true },
    purpose: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Checked In', 'Checked Out'],
      default: 'Checked In',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Visitor', visitorSchema);
