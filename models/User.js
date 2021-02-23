const {
  Schema,
  model,
  Types,
} = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profiles: [{
    type: Types.ObjectId,
    ref: 'Profile',
  }],
}, {
  collection: 'users',
});

module.exports = model('User', schema);
