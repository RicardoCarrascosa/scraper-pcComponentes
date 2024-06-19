const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('DB is connected')
  } catch {
    console.log('Error Connecting to the DB')
  }
}

module.exports = { connectDB }
