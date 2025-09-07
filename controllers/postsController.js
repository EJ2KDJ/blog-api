const {Posts, Users, Categories, PostCategory} = require('../sequelize/models');

// Get all posts from database
const getAllPosts = async (req, res, next) => {
    try {
        //Return all posts with only title and the user who posted it
        const posts = await Posts.findAll({
            attributes: ['title', 'userId']
        });

        //If no posts, return error
        if (!posts) return res.status(404).json({ error: 'No posts found' });
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
    const t = await Posts.sequelize.transaction();
    try {
        //Get title, content, userId, category from input
        const { title, content, name} = req.body;
        const catInput = req.body.category.toLowerCase() || req.body.categories.toLowerCase();

        //Find user by name input
        const user = await Users.findOne({ where: { name } });

        //If user doesn't exist, return error
        if (!user) return res.status(404).json({ error: 'User not found' });

        

        //(Fail safe) If title, content, or name are missing return error
        if (!title || !content || !name) {
            return res.status(400).json({ error: 'title, content and name are required' });
        }

        //Create category from user input
        const newPost = await Posts.create({ title, content, userId: user.id }, {transaction:t});

        //Process category/categories input ---
        const catNames = Array.isArray(catInput) ? //checks if catInput is an array of categories or a single category
        catInput.map(s => s.trim()).filter(Boolean) : //removes whitespaces and empty strings
        (catInput ? [catInput.trim()] : ['General']);  //If single category, trim whitespace and if empty set to 'General'

        const findOrCreatePromises = catNames.map(name => Categories.findOrCreate({
             where: { name }, defaults: { name }, transaction: t 
            })); //Finds or creates categories in the Categories table keeping them in the same transaction

        const createdOrFound = await Promise.all(findOrCreatePromises); //Waits for all promises to resolve and store in variable

        const categoryInstances = createdOrFound.map(r => Array.isArray(r) ? r[0] : r); //maps to model instances
    
        //Associate categories with the new post
        if (typeof newPost.addCategories === 'function') {
            await newPost.addCategories(categoryInstances, { transaction: t });
        } else {
            await Promise.all(categoryInstances.map(cat =>
            PostCategory.create({ postId: newPost.id, categoryId: cat.id }, { transaction: t })
        ));
        }

        await t.commit();

        const created = await Posts.findByPk(newPost.id, {
        include: [{ model: Categories, through: { attributes: [] } }]
        });
        res.status(201).json(created);
   
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