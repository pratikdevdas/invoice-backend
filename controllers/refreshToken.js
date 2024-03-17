const refreshTokenRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

refreshTokenRouter.get('/', async (request, response) => {
    const cookies = request.cookies
    if (!cookies?.['jwt-refresh']) return response.status(403).json({ error: 'no token' })

    const refreshToken = cookies['jwt-refresh']

    console.log(refreshToken, 'refreshToken')
    const user = await User.findOne({ refreshToken })
    if(!user) return response.status(403).json({ error: 'no user' })

    // evaluate jwt token

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || user.username !== decoded.username) return response.status(403).json({ error: 'invalid token' })

        const accessToken = jwt.sign({ username: decoded.username, id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' }
        )
        response.json({ accessToken })
    })
})

module.exports = refreshTokenRouter
