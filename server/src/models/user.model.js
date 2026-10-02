import { connection } from "../config/dbconnection.js"
import { DataTypes } from "sequelize"


const UserModel = connection.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullname: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'users',
    timestamps: true
})

export default UserModel