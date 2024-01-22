const express = require('express');
const router = express.Router();
const Property = require('../models/PropertyModel');
const authenticateToken = require('../middleware/authentication');


router.post('/properties', authenticateToken, async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).send(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating property', error: error.message});
  }
});



router.get('/properties', authenticateToken, async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).send(properties);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching properties', error: error.message});
  }
});



router.get('/properties/:id', authenticateToken, async (req, res) => {
  try {

    const propertyId = req.params.id;

    const property = await Property.findById(propertyId);
    if(!property) return res.status(404).send({ message: 'Property not found'});
    res.status(200).send(property);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching property', error: error.message });
  }
});




router.put('/properties/:id', authenticateToken, async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updatedProperty) return res.status(404).send({ message: 'Property not found'});
    res.status(201).send(updatedProperty);
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Property not found', error: error.message}); 
  }
});





router.delete('/properties/:id', authenticateToken, async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if(!deletedProperty) return res.status(404).send({ message: 'Property not found'});
    res.status(200).send({ message: 'Property deleted'});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Property not found', error: error.message});
  }
});



module.exports = router;