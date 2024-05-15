const UserModel = require('../models/User')
const bcrypt = require("bcrypt"); // Password encryption
//uploading image on cloudinary
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dtmlikaii',
    api_key: '851966655832888',
    api_secret: '6Nrh9yRy-hTfjucr_ixPR1pDW6k'
});
const jwt = require('jsonwebtoken')

class UserController {

    static getAllUsers = async (req, res) => {
        try {
            const data = await UserModel.find()
            res.status(200).json({
                success: true,
                data
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Single user
    static getSingleUser = async (req, res) => {
        try {
            const data = await UserModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                data
            })
        } catch (err) {
            console.log(err)
        }
    }

    // insert data
    static userInsert = async (req, res) => {
        try {
            console.log(req.files.image)
            const file = req.files.image
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'profileapi'
            })

            //console.log(imageUpload)
            //console.log(req.body)
            const { n, e, p, cp } = req.body

            const user = await UserModel.findOne({ email: e }) //find one record
            console.log(user)

            if (user) {
                // req.flash('error', 'Email is already exist')
                // res.redirect('/register')
                res
                    .status(401)
                    .json(
                        {
                            status: "failed",
                            message: "THIS EMAIL IS ALREADY EXIST"
                        }
                    )
            }
            else {
                if (n && e && p && cp) {
                    if (p == cp) {
                        const hashpassword = await bcrypt.hash(p, 10) //generate secured password
                        const result = new UserModel({
                            //model : view
                            name: n,
                            email: e,
                            password: hashpassword,  //p
                            image: {
                                public_id: imageUpload.public_id,
                                url: imageUpload.secure_url
                            }
                        })
                        await result.save()
                        res
                            .status(201)
                            .json(
                                {
                                    status: "success",
                                    message: "Registration Successfully"
                                }
                            )
                    }
                    else {
                        // req.flash('error', 'Password and Confirm Password does not match')
                        // res.redirect('/register')
                        res
                            .status(401)
                            .json(
                                {
                                    status: "failed",
                                    message: "Password and Confirm Password does not match"
                                }
                            )
                    }
                }
                else {
                    // req.flash('error', 'All Fields are required')
                    // res.redirect('/register')
                    res
                        .status(401)
                        .json(
                            {
                                status: "failed",
                                message: "All Fields are required"
                            }
                        )
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    // login
    static loginUser = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body
            // console.log(password)
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                // console.log(user)
                if (user != null) {
                    const isMatched = await bcrypt.compare(password, user.password)
                    if ((user.email === email) && isMatched) {
                        //generate jwt token
                        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
                        // console.log(token)
                        res.cookie('token', token)
                        res
                            .status(201)
                            .json({ status: "success", message: "Login successfully with web token 😃🍻", token, user });
                    } else {
                        res.status(401).json({ status: "failed", message: "'Email and Password is not valid !😓" });
                    }
                } else {
                    res.status(401).json({ status: "failed", message: "'You are not registered user😓" });
                }
            } else {
                res.status(401).json({ status: "failed", message: "'All Fields are required 😓" });
            }
        } catch (err) {
            console.log(err)
        }
    }

    // logout
    static logout = async (req, res) => {

        try {
            res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            });

            res.status(200).json({
                success: true,
                message: "Logged Out",
            });
        } catch (error) {
            console.log(error)
        }
    }

    // update password
    static updatePassword = async (req, res) => {
        // console.log(req.user)
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body

            if (oldPassword && newPassword && confirmPassword) {
                const user = await UserModel.findById(req.user.id);
                const isMatch = await bcrypt.compare(oldPassword, user.password)
                //const isPasswordMatched = await userModel.comparePassword(req.body.oldPassword);
                if (!isMatch) {
                    res.status(201).json({ "status": 400, "message": "Old password is incorrect" })
                } else {
                    if (newPassword !== confirmPassword) {
                        res.status(201)
                            .json({ "status": "failed", "message": "password does not match" })
                    } else {
                        const salt = await bcrypt.genSalt(10)
                        const newHashPassword = await bcrypt.hash(newPassword, salt)
                        //console.log(req.user)
                        await UserModel.findByIdAndUpdate(req.user.id, { $set: { password: newHashPassword } })
                        res.status(201)
                            .json({ "status": "success", "message": "Password changed succesfully" })
                    }
                }
            } else {
                res.status(201)
                    .json({ "status": "failed", "message": "All Fields are Required" })
            }
        } catch (err) {
            res.status(201)
                .json(err)
        }
    }

    // update profile
    static updateProfile = async (req, res) => {
        try {
            //console.log(req.body)
            if (req.file) {
                const user = await UserModel.findById(req.user.id);
                const image_id = user.image.public_id;
                await cloudinary.uploader.destroy(image_id);

                const file = req.files.image;
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "profileapi",
                    width: 150,
                });
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                };
            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                };
            }

            const updateuserprofile = await UserModel.findByIdAndUpdate(
                req.user.id,
                data
            );
            res.status(200).json({
                success: true,
                updateuserprofile,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // user detail
    static getUserDetail = async (req, res) => {
        try {
            //   console.log(req.user);
            const user = await UserModel.findById(req.user.id);

            res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // delete user
    static deleteUser = async (req, res) => {
        try {
            const data = await UserModel.findByIdAndDelete(req.params.id)
            res
                .status(200)
                .json({ status: "success", message: "User deleted successfully 😃🍻" });
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = UserController