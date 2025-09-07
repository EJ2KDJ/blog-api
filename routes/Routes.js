const express = require('express');
const userRouter = express.Router();
const postsRouter = express.Router();

// Import User controller functions
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postsController');

// Define routes and link to controller functions

//Users
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

// Posts
postsRouter.get('/', getAllPosts);
postsRouter.get('/:id', getPostById);
postsRouter.post('/', createPost);
postsRouter.put('/:id', updatePost);
postsRouter.delete('/:id', deletePost);

module.exports = { userRouter, postsRouter };