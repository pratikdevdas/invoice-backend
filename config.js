require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'development'
    ? process.env.DEV_
    : process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}