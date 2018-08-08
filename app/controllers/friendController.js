const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {

  async create(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      const me = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ error: 'User does not exists' });
      }

      if (me.friends.indexOf(req.params.id) !== -1) {
        return res.status(400).json({ error: `You are already friend of ${user.username}` });
      }

      me.friends.push(user.id);
      await me.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      const me = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ error: 'User does not exists' });
      }

      const friends = me.friends.indexOf(req.params.id);

      if (friends === -1) {
        return res.status(400).json({ error: `You are not friend of ${user.username}` });
      }

      me.friends.splice(me.friends.indexOf(user.id, 1));
      await me.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },
};
