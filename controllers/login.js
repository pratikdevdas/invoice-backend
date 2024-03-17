const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
    try {
        const { username, password } = request.body

        console.log('username:', username)
        const user = await User.findOne({ username })
        const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)

        console.log(user.id)
        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: 'invalid username or password',
            })
        }

        const userForToken = {
            username: user.username,
            id: user.id,
        }

        //setting and sending the token
        const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d',
        })

        console.log(accessToken)
        const refreshToken = jwt.sign(userForToken, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '30d',
        })

        await User.findByIdAndUpdate(user.id, { refreshToken }, { new: true })


        await response.cookie('jwt-refresh', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        })

        response.status(200).send({ accessToken })
    } catch (error) {
        console.log('error:', error)
    }
})

module.exports = loginRouter
