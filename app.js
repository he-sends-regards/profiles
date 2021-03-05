const express = require('express');
const mongoose = require('mongoose');
const {PORT, mongoUri} = require('./const.js');
const path = require('path');

const app = express();

app.use(express.json({
  extended: true,
}));
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/profiles', require('./routes/profiles.routes.js'));
app.use('/api/users', require('./routes/users.routes.js'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname = '/client/build/index.html'));
  });
} else if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, 'client/public')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname = '/client/public/index.html'));
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

const start = async () => {
  try {
    await mongoose.connect(mongoUri, {
      dbName: 'profiles_testtask',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.get('/', (req, res) => {
      res.send('<h1>hello express js</h1>');
    });

    app.listen(process.env.PORT || PORT || 5000, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (error) {
    console.log('Server error: ', error.message);
    process.exit(1);
  }
};

start();
