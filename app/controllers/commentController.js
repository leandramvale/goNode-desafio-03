const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

module.exports = {

  async commentPost(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(400).json({ error: 'Post doesn´t exist' });
      }

      const comment = await Comment.create({ ...req.body, user: req.userId });

      await comment.save();

      post.comments.push(comment);

      await post.save();

      return res.json(post);
    } catch (err) {
      return next(err);
    }
  },

};
