const mongoose = require('mongoose')

const SliderSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description:{
    type: String,
    require: true
  },
  images: {
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        requiredd: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

})

var SliderModel = mongoose.model('slider', SliderSchema);
module.exports = SliderModel;