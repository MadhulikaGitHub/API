const SliderModel = require('../models/Slider')
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dtmlikaii',
    api_key: '851966655832888',
    api_secret: '6Nrh9yRy-hTfjucr_ixPR1pDW6k'
})

class SliderController {

    // display
    static displaySlider = async (req, res) => {
        try {
            const data = await SliderModel.find()
            res.status(200).json({
                success: true,
                data
            })
        } catch (error) {
            console.log(error)
        }
    }

    // insert
    static insertSlider = async (req, res) => {
        try {
            //console.log(req.body)
            const file = req.files.images
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'profileapi'
            })
            const result = new SliderModel({
                title: req.body.title,
                description: req.body.description,
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
                        message: "Slider insert Successfully"
                    }
                )
        } catch (error) {
            console.log(error)
        }
    }

    // view
    static viewSlider = async (req, res) => {
        try {
            const data = await SliderModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                data
            })
        } catch (error) {
            console.log(error)
        }
    }

    // update
    static updateSlider = async (req, res) => {
        try {
            //console.log(req.body)
            if (req.file) {
                const slider = await SliderModel.findById(req.params.id);
                const image_id = slider.images.public_id;
                await cloudinary.uploader.destroy(image_id);

                const file = req.files.images
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "profileapi",
                    width: 150,
                })
                var data = {
                    title: req.body.title,
                    description: req.body.description,
                    images: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                };
            } else {
                var data = {
                    title: req.body.title,
                    description: req.body.description,
                }
            }

            const sliderUpdate = await SliderModel.findByIdAndUpdate(
                req.params.id,
                data
            );
            res.status(200).json({
                success: true,
                sliderUpdate,
            });
        } catch (error) {
            console.log(error);
        }      
    }

    // delete
    static deleteSlider = async (req, res) => {
        try {
            await SliderModel.findByIdAndDelete(req.params.id)
            res
                .status(200)
                .json({ status: "success", message: "Slider deleted successfully 😃🍻" });

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = SliderController