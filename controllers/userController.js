const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const userController = {
  // render 註冊的頁面
  signUpPage: (req, res) => {
    return res.render('signup')
  },

  // 實際處理註冊的行為
  signUp: (req, res) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    }).then(user => {
      return res.redirect('/signin')
    })
  }
}

module.exports = userController