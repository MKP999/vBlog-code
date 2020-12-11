const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./config');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKeys;
// const mongoose = require('mongoose');
// const User = mongoose.model('users');
const User = require('../model/User')

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async function(jwt_payload, done) {
    //   const user = await User.findById(jwt_payload.id);
    const user = jwt_payload.data
    // console.log(user);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
};