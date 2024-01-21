require('dotenv').config();
console.log(process.env.MONGO_URI);
const express = require('express');
const app = express();
app.use(express.json());
const Property = require('./Routers/property');
require('./connection');
const User = require('./Routers/user');

const cors = require('cors');
app.use(cors({
  origin:'*',
}));

const port = process.env.PORT || 8686;


app.use(Property);
app.use(User);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});