const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {
  if(!req.body.username || !req.body.password) {
    res.send({ message: 'Please fill the necessary sections'});
    return;
  }


  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if(existingUser) {
      return res.status(409).send({ message: 'Username already exist' });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if(err){
          res.status(500).send({ message: 'Wrong password' });
          return;
        }

        const newUser = {
          username: req.body.username,
          password: hash,
        };

        await User.create(newUser);
        res.status(201).send({ message: 'User registered successfully' });
      })
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating user'});
  }
});




router.post('/login', async (req, res) => {
  if(!req.body.username || !req.body.password) {
    res.send({ message: 'Please fill the necessary section' });
  }

  try {
    const user = await User.findOne({ username: req.body.username });
    
    if(!user) {
      res.status(404).send({ message: 'Wrong username or password'});
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if(!passwordMatch) {
      return res.status(401).send({ message: 'Invalid credentials'});
    }

    const token = jwt.sign({ userId: user._id }, 'green field project');

    res.send({ token : token, message: 'Login us successful' });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Login failed', error: error.message });
  }
});



module.exports = router;