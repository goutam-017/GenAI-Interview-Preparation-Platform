import TokenBlacklistModel from '../models/blacklist.model.js'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'



const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token not Provided.' })
        }
        const isTokenBlacklisted = await TokenBlacklistModel.findOne({ where: { token: token } })

        if (isTokenBlacklisted) {
            return res.status(401).json({ success: false, message: 'Token invalid.' })
        }

        const decoded = jwt.verify(token, config.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid token." })
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token has expired." })
        }
        return res.status(500).json({ success: false, message: "Internal Server Error." })
    }
}

export default authMiddleware