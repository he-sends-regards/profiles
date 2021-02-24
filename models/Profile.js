const {
  Schema,
  model,
} = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
}, {
  collection: 'profiles',
});

module.exports = model('Profile', schema);
