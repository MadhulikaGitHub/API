const UserModel = require('../models/User')
const bcrypt = require("bcrypt"); // Password encryption
//uploading image on cloudinary
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dtmlikaii',
    api_key: '851966655832888',
    api_secret: '6Nrh9yRy-hTfjucr_ixPR1pDW6k'
});

class UserController {

    static getAllUsers = async (req, res) => {
        try {
            res.send('Hello user !')
        } catch (error) {
            console.log(error)
        }
    }

    // insert data
    static userInsert = async (req, res) => {
        try {
            //console.log(req.files.image)
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

}

module.exports = UserController