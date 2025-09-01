const { Sequelize } = require('sequelize');

//Standard Sequelize setup
const sequelize = new Sequelize('blog-db', 'postgres', 'grespost', {
    host: 'localhost',
    dialect: 'postgres'
});


//Connection test with Stackoverflow solution
(async () => {
    try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
})();

module.exports = sequelize;