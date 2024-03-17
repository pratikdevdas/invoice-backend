const logoutRouter = require('express').Router()
const User = require('../models/user')

logoutRouter.get('/', async (request, response) => {

    // on client side, need to delete access token
    const cookies = request.cookies

    const refreshToken = cookies['jwt-refresh']

    if (!cookies?.['jwt-refresh']) {
        response.clearCookie('jwt-refresh', {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        })

        return response.sendStatus(204)
    }

    // is refresh token in db
    const user = await User.findOne({ refreshToken })

    if (!user) {
        response.clearCookie('jwt-refresh', {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        })

        return response.sendStatus(204)
    }

    // evaluate jwt token
    await User.findByIdAndUpdate(
        user.id,
        { refreshToken: 'null' },
        { new: true }
    )

    response.clearCookie('jwt-refresh', {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
    })

    return response.sendStatus(204)
})

module.exports = logoutRouter
