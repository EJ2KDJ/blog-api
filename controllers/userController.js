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