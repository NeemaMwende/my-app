import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Contact', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;