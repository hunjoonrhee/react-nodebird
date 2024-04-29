const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models')
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(new LocalStrategy({
    _usernameField: 'email',
    _passwordField: 'password'
  }, async (email, password, done)=> {
    try{
      const user = await User.findOne({
        where: { email }
      });
      if (!user) {
        done(null, false, {reason: 'user not exist'});
      }
      const result = await bcrypt.compare(password, user.password)
      if (result) {
        return done(null, user);
      }
      return done(null, false, {reason: 'wrong password'})
    } catch(error) {
      console.error(error);
      return done(error)
    }

   }));
}
