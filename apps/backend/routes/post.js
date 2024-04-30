const express = require('express');
const {Post, Image, Comment, User} = require('../models')
const {isLoggedIn} = require('../routes/middlewares')

const router = express.Router();
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: {id: post.id},
      include: [
        {model: Image},
        {model: Comment},
        {model: User}
      ]
    })
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    next(error)
  }
})

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({where: {id: req.params.postId}});
    if(!post) {
      return res.status(403).send('post does not exist');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      userId: req.body.user,
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error)
  }
})

router.delete('/', isLoggedIn, (req, res)=> {
  res.json({id: 2})
})

module.exports = router;
