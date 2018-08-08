const mongoose = require('mongoose');
const sendMail = require('../services/mailer');

const User = mongoose.model('User');

module.exports = {

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (!await user.compareHash(password)) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      return next(err);
    }
  },

  async signup(req, res, next) {
    try {
      const { email, username } = req.body;

      // console.log(email, username);

      if (await User.findOne({ $or: [{ email }, { username }] })) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = await User.create(req.body);

      sendMail({ // posso retirar o await pois o sendmail fica rodando em background
        from: 'Leandra Mendes <leandramvale@gmail.com>',
        to: user.email,
        subject: `Seja bem-vindo ao RocketFacebook ${user.name}`,
        template: 'auth/register',
        context: {
          name: user.name,
          username: user.username,
        },
      });

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      return next(err);
    }
  },
};
