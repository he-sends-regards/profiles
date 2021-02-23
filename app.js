const express = require('express');
const config = require('config');
const router = require('./routes/auth.routes.js');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({
  extended: true,
}));
app.use('/api/auth', router);

const PORT = config.get('port');

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/', {
      dbName: 'profiles_testtask',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.get('/', (req, res) => {
      res.send('<h1>hello express js</h1>');
    });

    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (error) {
    console.log('Server error: ', error.message);
    process.exit(1);
  }
};

start();
