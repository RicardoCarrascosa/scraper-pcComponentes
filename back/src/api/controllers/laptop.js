const Laptop = require('../models/laptop.js')
const laptopsjson = require('../../../products.json')

const postManyLaptop = async (req, res, next) => {
  try {
    // console.log(laptopsjson)
    await Laptop.insertMany(laptopsjson)
    return res.status(200).json('All Laptop added to DB')
  } catch {
    return res.status(400).json('Error inserting Laptop')
  }
}

const getAll = async (req, res, next) => {
  try {
    const allLaptops = await Laptop.find()
    return res.status(200).json(allLaptops)
  } catch {
    return res.status(400).json('Error')
  }
}

module.exports = { postManyLaptop, getAll }
