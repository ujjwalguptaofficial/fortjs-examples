// models/user.js

import { DataTypes } from 'sequelize';
import { sequelize } from '@/sequelize';

export const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});