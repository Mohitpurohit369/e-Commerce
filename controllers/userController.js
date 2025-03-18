const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
const randomstring = require('randomstring');


const securepassword = async (password) => {
    try {
        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash

    } catch (error) {
        res.status(400).send(error.message);
    }
}


const create_token = async (id) => {
    try {

        const token = await jwt.sign({ _id: id }, config.secret_jwt);
        return token;

    } catch (error) {
        res.status(400).send(error.message);
    }

}


// nodemail

const sendResetPasswordMail = async () => {
    try {
        const transproter = nodemailer.createTransport({
            host: "smtp.gamil.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                password: config.password
            }
        });
        const mailOption = {
            from: config.emailUser,
            to: email,
            subject: "For Reset Password",

        }
        transproter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log("", error);
            }
            else {
                console.log("Mail has been Sent", info.response);
            }
        })
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

// register_user

const register_user = async (req, res) => {
    try {
        const spassword = await securepassword(req.body.password);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: spassword,
            image: req.file.filename,
            mobile: req.body.mobile,
            type: req.body.type
        });
        const userData = await User.findOne({ email: req.body.email });
        if (userData) {
            res.status(200).send({ suceess: false, msg: "this user already exists" });
        }
        else {
            const user_data = await user.save();
            res.status(200).send({ suceess: true, data: user_data });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

}


// login_user

const login_user = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fetch user data from the database
        const userdata = await User.findOne({ email });

        if (!userdata) {
            return res.status(200).send({ success: false, msg: "Login details are incorrect" });
        }

        // Compare passwords
        const passwordMatch = await bcryptjs.compare(password, userdata.password);



        if (!passwordMatch) {

            return res.status(200).send({ success: false, msg: "Login details are incorrect" });
        }

        const tokenData = await create_token(userdata._id);

        // Prepare user response data
        const userResult = {
            _id: userdata._id,
            name: userdata.name,
            email: userdata.email,
            password: userdata.password,
            image: userdata.image,
            mobile: userdata.mobile,
            type: userdata.type,
            token: tokenData

        };

        // Send success response
        return res.status(200).send({
            success: true,
            msg: "User details",
            data: userResult
        });

    } catch (error) {
        return res.status(400).send({ success: false, msg: error.message });
    }
};



const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, userId } = req.body;
        // Extract user ID from JWT token

        // Find the user by ID
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        // Check if old password matches
        const isMatch = await bcryptjs.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: "Old password is incorrect" });
        }

        const password = await securepassword(newPassword);

        // Update password in database
        // user.password = hashedPassword;
        // await user.save();
        const userData = await User.findByIdAndUpdate({ _id: userId }, {
            $set: {
                newPassword: password
            }
        })

        res.status(200).json({ success: true, msg: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};



const forget_password = async (req, res) => {
    const email = req.body.email;
    try {
        const userData = await User.findOne({ email: email });

        if (!userData) {
            res.status(200).send({ success: true, msg: "this email is node exists" });
        }
        else {
            const randomString = randomstring.generate();
            const data = await User.updateOne({ email: email }, { $set: { token: randomString } });
            res.status(200).send({ success: true, msg: "pas check your email" });
        }

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


module.exports = {
    register_user,
    login_user,
    updatePassword,
    forget_password
}