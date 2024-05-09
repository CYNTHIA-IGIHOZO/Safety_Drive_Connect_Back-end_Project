const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();


const API_URI = process.env.API_URI || '/api/v1/';

app.use(express.json());


app.get(API_URI, (req, res) => {
  res.send();
});

mongoose.connect('mongodb://localhost:27017/safetydriveconnect')
  .then(() => {
    console.log("Database connected successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}....`);
    });
  })
  .catch(error => {
    console.error("Error connecting to database:", error);
  });

module.exports ={
  app,
  API_URI
}