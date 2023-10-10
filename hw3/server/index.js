const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const mongoose = require('mongoose');
const artistRouter = require('./routes/artist');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/artist', artistRouter);

mongoose.connect(`mongodb+srv://41071230H:${process.env.DB_PWD}@clusterlearn.kb1bixv.mongodb.net/hw3`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log(err);
});



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});