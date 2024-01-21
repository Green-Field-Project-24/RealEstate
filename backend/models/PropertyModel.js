const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: { type: String, required: true},
  price: { type: Number, required: true},
  address: { type: String, required: true},
  bedrooms: { type: Number, required: true},
  bathrooms: { type: Number, required: true},
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now}
});


const Property = mongoose.model('Property', propertySchema);


module.exports = Property;