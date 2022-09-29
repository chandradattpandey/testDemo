const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: ['admin', 'user']
  },
  registration_date: { type: Date }
});

userSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hashPassword) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hashPassword
          next()
        })
      }
    })
  } else {
    return next()
  }
})

userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    if (error) {
      return callback(error)
    } else {
      callback(null, isMatch)
    }
  })
}

module.exports = mongoose.model('User', userSchema);