const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models')
const router = express.Router();

router.post('/', async (req, res,next) => {
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

module.exports = router;
