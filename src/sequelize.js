const pg = require('pg');
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./models/User');
const TodoModel = require('./models/Todo');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {},
});
(async () => await sequelize.sync({ alter: true }))();

const User = UserModel(sequelize, DataTypes);
const Todo = TodoModel(sequelize, DataTypes);

// Related
Todo.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Todo,
};
