require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./src/config/db.js')
const laptopRooter = require('./src/api/routes/laptop.js')
const app = express()
connectDB()
app.use(cors())

app.use('/api/v1/laptop', [], laptopRooter)
app.use('*', (req, res, next) => {
  return res.status(404).json('Route not Found!')
})

app.listen(3000, () => {
  console.log('Server Started At: http://localhost:3000')
})
