const mongoose = require('mongoose')

const LaptopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'laptops'
  }
)

const Laptop = mongoose.model('laptop', LaptopSchema, 'laptops')
module.exports = Laptop
