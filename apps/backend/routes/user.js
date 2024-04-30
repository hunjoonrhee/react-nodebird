const express = require('express');
const bcrypt = require('bcrypt');
const { User, Post } = require('../models')
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

const router = express.Router();

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info)=> {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason)
    }
    if(user) {
      return req.login(user, async (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUserWithoutPassword = await User.findOne({
          where: {id: user.id},
          attributes: {
            exclude: ['password']
          },
          include: [{
            model: Post,
          }, {
            model: User,
            as: 'Followings',
          }, {
            model: User,
            as: 'Followers'
          }]
        })
        return res.status(200).json(fullUserWithoutPassword);
      })
    }
  })(req, res, next)
});

router.post('/', isNotLoggedIn, async (req, res,next) => {
  try {
    //중복 이메일 찾기
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.status(403).send('already used email.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 13);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword
    });
    // res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(201).send('ok');
  } catch(error) {
    console.error(error);
    next(error)
  }
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout(()=>{
    req.session.destroy();
    res.send('ok');
  })
})
module.exports = router;
