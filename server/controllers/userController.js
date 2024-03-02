const JWT = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');

//register
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        //validation
        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'name is required'
            })
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: 'email is required'
            })
        }
        if (!password || password.length < 6) {
            return res.status(400).send({
                success: false,
                message: 'password is required and should be atleast 6 characters long'
            })
        }
        //existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'user already exists.'
            })
        }

        //hash password
        const hashedPassword = await hashPassword(password)

        //save
        const user = await userModel({ name, email, password: hashedPassword }).save()

        res.status(201).send({
            success: true,
            message: 'Registration successful, please login.'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'error in register.'
        })
    }
};

//login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please fill all the fields.'
            })
        }

        //find user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'User not found.'
            })
        }

        //match password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(500).send({
                success: false,
                message: 'Invalid name or password.'
            })
        }
        //jwt
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        //hide password
        // user.password = undefined;

        res.status(200).send({
            success: true,
            message: 'logged in succcesfully.',
            token,
            user,
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'error in login.'
        })
    }
}


module.exports = { registerController, loginController };