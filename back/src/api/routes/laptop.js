const { postManyLaptop, getAll } = require('../controllers/laptop.js')

const laptopRooter = require('express').Router()
laptopRooter.post('/take_All', postManyLaptop)
laptopRooter.get('/', getAll)

module.exports = laptopRooter
