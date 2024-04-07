const JWT = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');
var { expressjwt: jwt } = require("express-jwt")


//middleware
const requiredSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})

//register
const registerController = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body
        //validation
        if (!firstname) {
            return res.status(400).send({
                success: false,
                message: 'firstname is required'
            })
        }
        if (!lastname) {
            return res.status(400).send({
                success: false,
                message: 'lastname is required'
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
        const user = await userModel({ firstname, lastname, email, password: hashedPassword }).save()

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
            expiresIn: '30d',
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

//update user
const updateUserController = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body
        //find user
        const user = await userModel.findOne({ email })
        //password validate
        if (password && password.length < 6) {
            return res.status(400).send({
                success: false,
                message: 'Password is required and should be at least 6 characters long'
            })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        //updated user
        const updatedUser = await userModel.findOneAndUpdate({ email }, {
            firstname: firstname || user.firstname,
            lastname: lastname || user.lastname,
            password: hashedPassword || user.password,
        }, { new: true })
        //hide password
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Profile updated, please login",
            updatedUser
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in user update api'.
                error
        })

    }
}


module.exports = { registerController, loginController, updateUserController, requiredSignIn };