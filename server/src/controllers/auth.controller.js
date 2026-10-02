import validator from 'validator'
import UserModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import TokenBlacklistModel from '../models/blacklist.model.js'

export const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body

        if (!fullname) {
            return res.status(400).json({ success: false, message: 'Fullname is requierd.' })
        }

        if (!email) {
            return res.status(400).json({ success: false, message: 'email is requierd.' })
        }

        if (!password) {
            return res.status(400).json({ success: false, message: 'password is requierd.' })
        }

        const normalizedFullname = fullname.trim()
        const normalizedEmail = email.trim().toLowerCase()

        if (!validator.isEmail(normalizedEmail)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address' })
        }

        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            })
        }

        const isUserExsit = await UserModel.findOne({ where: { email: normalizedEmail } })

        if (isUserExsit) {
            return res.status(409).json({ success: false, message: "A user already exists with this Email" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({ fullname: normalizedFullname, email: normalizedEmail, password: hashedPassword })
        const token = jwt.sign({ id: user.id, fullname: user.fullname }, config.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('token', token)
        return res.status(201).json({ success: true, message: 'User register successfully.', user: { id: user.id, fullname: user.fullname, email: user.email } })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal Sever Error.' })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) {
            return res.status(400).json({ success: false, message: 'email is requierd.' })
        }

        if (!password) {
            return res.status(400).json({ success: false, message: 'password is requierd.' })
        }

        const normalizedEmail = email.trim().toLowerCase()

        const user = await UserModel.findOne({ where: { email: normalizedEmail } })

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            return res.status(401).json({ success: false, message: 'Incorrect Password.' })
        }

        const token = jwt.sign({ id: user.id, fullname: user.fullname }, config.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('token', token)
        return res.status(200).json({ success: true, message: 'Logged in successfully.', user: { id: user.id, fullname: user.fullname, email: user.email } })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal Sever Error.' })
    }
}


export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token
        if (token) {
            await TokenBlacklistModel.create({ token: token })
        }
        res.clearCookie('token')
        return res.status(200).json({ success: true, message: 'Logged out Successfully.' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}


export const getUser = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await UserModel.findByPk(userId, { attributes: { exclude: ["password"] } })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." })
        }

        return res.status(200).json({ success: true, message: 'User fetched successfully.', user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}