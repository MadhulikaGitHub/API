const CategoryModel = require('../models/Category')
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dtmlikaii',
    api_key: '851966655832888',
    api_secret: '6Nrh9yRy-hTfjucr_ixPR1pDW6k'
})

class CategoryController {

    // insert
    static insertCategory = async (req, res) => {
        try {
            //console.log(req.body)
            const file = req.files.images
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'profileapi'
            })
            const result = new CategoryModel({
                name: req.body.name,
                images: {
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
                        message: "Category insert Successfully"
                    }
                )
        } catch (error) {
            console.log(error)
        }
    }

    // display
    static categoryDisplay = async (req, res) => {
        try {
            const data = await CategoryModel.find()
            res.status(200).json({
                success: true,
                data
            })
        } catch (error) {
            console.log(error)
        }
    }

    // view
    static categoryView = async (req, res) => {
        try {
            const data = await CategoryModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                data
            })
        } catch (error) {
            console.log(error)
        }
    }

    // update
    static updateCategory = async (req, res) => {
        try {
            //console.log(req.body)
            if (req.file) {
                const category = await categoryModel.findById(req.params.id);
                const image_id = category.images.public_id;
                await cloudinary.uploader.destroy(image_id);

                const file = req.files.images
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "profileapi",
                    width: 150,
                })
                var data = {
                    name: req.body.name,
                    images: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                };
            } else {
                var data = {
                    name: req.body.name,
                }
            }

            const updateCategory = await CategoryModel.findByIdAndUpdate(
                req.params.id,
                data
            );
            res.status(200).json({
                success: true,
                updateCategory,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // delete
    static deleteCategory = async (req, res) => {
        try {
            await CategoryModel.findByIdAndDelete(req.params.id)
            res
                .status(200)
                .json({ status: "success", message: "Category deleted successfully 😃🍻" });

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CategoryController