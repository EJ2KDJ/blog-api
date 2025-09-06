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

// Create a new user
const createUser = async (req, res, next) => {
    try {
        //Get name and email from input
        const { name, email } = req.body;
        const newUser = await Users.create({ name, email });
        res.status(201).json(newUser);
    } catch(error) {
        next(error);
    }
}

// Update specified user
const updateUser = async (req, res, next) => {
    try { 
        //Find user by Id
        const user = await Users.findByPk(req.params.id);

        //If user doesn't exist, return error
        if (!user) return res.status(404).json({ error: 'User not found' });

        //If found get input
        const { name, email } = req.body;

        //update object
        await user.update({ name, email });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

