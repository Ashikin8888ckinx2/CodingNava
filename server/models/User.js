const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: 'Username is required',
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    trim: true,
    minlength: 5,
    required: 'Password is required',
  },
  bio: {
    type: String,
    trim: true,
    maxLength: 300,
  },
  picture: {
    type: String,
    trim: true,
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  privacy_mode: {
    type: Boolean,
    default: false,
  },
  // THIS IS THE USER BUCKET LIST
  bucket_list: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BucketList',
    },
  ],
});

UserSchema.pre('save', async function (next) {
  // set up pre-save middleware to create password
  // uses bcrypt to encrypt password
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

UserSchema.methods.checkPassword = function (pw) {
  // compare the incoming password with the hashed password
  // returns true or false depending on whether it matches up or not
  return bcrypt.compare(pw, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
