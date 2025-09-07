const {Posts, Users} = require('../sequelize/models');

// Get all posts from database
const getAllPosts = async (req, res, next) => {
    try {
        //Return all posts with only title and the user who posted it
        const posts = await Posts.findAll({
            attributes: ['title', 'userId']
        });
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

// Get post by ID from database
const getPostById = async (req, res, next) => {
    try {
        // Returns full post with title, content, when it was created/updated, and the name of the user who posted it
        const post = await Posts.findByPk(req.params.id,
            {
                attributes: ['title', 'content', 'createdAt', 'updatedAt'],
                include: [{ model: Users, attributes: ['name'] }]
            });
    } catch (error) {
        next(error);
    }
}

// Create a new post
const createPost = async (req, res, next) => {
    try {
        //Get title, content, and userId from input
        const { title, content, name} = req.body;

        //Finds userId base on name input
        const user = await Users.findPK({ where: { name } });

        //Error if nothing returned
        if (!user) return res.status(404).json({error: 'User not found'});
        const uploadPost = await Posts.create({title, content, userId: user.id});
        res.status(201).json(uploadPost);
    }  catch (error) {
        next(error);
    }
}

// Update specified post
const updatePost = async (req, res, next) => {
    try {
        //Find post by id input
        const post = await Posts.findByPk(req.params.id);
        if(!post) return res.status(404).json({error: 'Post not found'});

        //Get title and content from input
        const { title, content } = req.body;

        //Update object
        const updatedPost = await post.update({ title, content });
        res.status(201).json(updatedPost);
    } catch (error) {
        next(error);
    }
}

//Delete specified post
const deletePost = async (req, res, next) => {
    try {
        //Find specified post to delete
        const deletedPost = await Posts.findByPk(req.params.id);

        //Error if post not found
        if (!deletedPost) return res.status(404).json({ error:'Post not Found'});

        //Delete post
        await deletedPost.destroy();
        res.status(204).end();
    }catch(error) {
        next(error);
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};