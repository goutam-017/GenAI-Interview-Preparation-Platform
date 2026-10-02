import { DataTypes } from "sequelize"
import { connection } from "../config/dbconnection.js"

const TokenBlacklistModel = connection.define('BlacklistTokens', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    token: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'blacklistTokens',
    timestamps: true
})


export default TokenBlacklistModel