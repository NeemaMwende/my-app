import { DataTypes } from 'sequelize';
// import sequelize from '../lib/db';
const sequelize = require("../lib/db");

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    phone: { type: DataTypes.STRING, allowNull: false},
    gender: { type: DataTypes.STRING, allowNull: false},
    password: { type: DataTypes.STRING, allowNull: false},
});

export default User;
