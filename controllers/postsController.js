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
        const user = awa
    }  catch (error) {
        next(error);
    }
}