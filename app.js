const express = require('express');
const mongoose = require('mongoose');
const {PORT, mongoUri} = require('./const.js');

const app = express();

app.use(express.json({
  extended: true,
}));
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/profiles', require('./routes/profiles.routes.js'));
app.use('/api/users', require('./routes/users.routes.js'));

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || mongoUri, {
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
