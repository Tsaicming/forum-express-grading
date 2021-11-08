const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

// setup passport strategy
passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // 設定這個參數才可以把客製的  flash message 顯示出來
  },
  // authenticate user
  (req, username, password, cb) => {
    User.findOne({ where: { email: username } }).then(user => {
      if (!user)
        return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤'))

      if (!bcrypt.compareSync(password, user.password))
        return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))

      return cb(null, user)
    })
  }
))

// serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id).then(user => {
    user = user.toJSON()
    return cb(null, user)
  })
})

module.exports = passport