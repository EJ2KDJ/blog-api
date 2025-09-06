const {Users, Posts} = require('../sequelize/models');

// Get all users from database
const getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Get user by ID from database
const getUserById = async (req, res, next) => {
    try {
        //find User by specified ID and include Posts associated with that user
        const user = await Users.findByPk(req.params.id, 
            {
            attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
            include: [{ model: Posts }]
            });
        // If user doesn't exist, return error
        if (!user) return req.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}