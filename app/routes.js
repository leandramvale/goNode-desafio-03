const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

/**
 * Auth - rotas testadas e ok....
 */
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * Rotas autenticadas apenas
 */
routes.use(authMiddleware); // todas as rotas abaixo daqui usarão esse middleware

/**
 * Users - rotas testadas e ok....
 */
routes.put('/users', controllers.userController.update);
routes.get('/users/me', controllers.userController.me);
routes.get('/feed', controllers.userController.feed);

/**
 * Postagens - rotas testadas e ok....
 */
routes.post('/posts', controllers.postController.create);
routes.delete('/posts/:id', controllers.postController.destroy);

/**
 * Like - rotas testadas e ok....
 */
routes.post('/like/:id', controllers.likeController.toggle);

/**
 * Friends - rotas testadas e ok....
 */
routes.post('/friend/:id', controllers.friendController.create);
routes.delete('/unfriend/:id', controllers.friendController.destroy);

/**
 * Comments
 */
routes.post('/comments/:id', controllers.commentController.commentPost);

module.exports = routes;
