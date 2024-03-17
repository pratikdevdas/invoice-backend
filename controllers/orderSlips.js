const orderSlipRouter = require('express').Router()
const OrderSlip = require('../models/orderSlip')
const middleware = require('../utils/middleware')
// const jwt = require('jsonwebtoken')

orderSlipRouter.get('/', async(request, response) => {
    const orderSlips = await OrderSlip.find({})
    response.json(orderSlips)
})

orderSlipRouter.get('/:id',[middleware.tokenExtractor, middleware.userExtractor], async(request, response) => {
    const orderSlip = await OrderSlip.findOne({ id: request.params.id })
    console.log(request.user, 'user13')
    response.json(orderSlip)
})

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if(authorization && authorization.toLowerCase().startsWith('bearer ')){
//         return authorization.substring(7)
//     }
//     return null
// }

//  ex 4.20 applied getTokenFrom refactored to middleware
orderSlipRouter.post('/', async(request, response) => {
    const body = request.body

    const addOrderSlip = new OrderSlip({
        ...body
    })
    const savedOrderSlip = await addOrderSlip.save()
    console.log(savedOrderSlip)
    response.json(addOrderSlip)
})

// orderSlipRouter.delete('/:id',middleware.userExtractor, async(request, response) => {
//     const user = request.user

//     const orderSlip = await OrderSlip.findById(request.params.id)
//     // fetching this from partitcular orderSlip itself
//     const userIdOfBlog = orderSlip.user._id
//     console.log(userIdOfBlog)
//     console.log(user._id)
//     if(userIdOfBlog.toString() === user._id.toString()){
//         await OrderSlip.findByIdAndRemove(orderSlip._id.toString())

//         response.status(204).end()
//     }
//     else{
//         return response.status(401).json({ error : 'unauthorized' })
//     }
// })

// orderSlipRouter.put('/:id', async(request,response) => {
//     const body = request.body

//     const orderSlip = {
//         title: body.title,
//         author: body.author,
//         likes: body.likes,
//         url: body.url,
//     }
//     const updatedBLog = await OrderSlip.findByIdAndUpdate(request.params.id, orderSlip, { new: true })
//     // console.log(updatedBLog, 'HI', request.params.id)
//     response.json(updatedBLog.toJSON())
//     //since we have async await it automattically pushes errors to next
//     /*  try{
//         const updatedBLog = await OrderSlip.findByIdAndUpdate(request.params.id, orderSlip, { new:true })
//         response.json(updatedBLog.toJSON())
//     } catch(exception) {
//         next(exception)
//     } */

//     /*  OrderSlip.findByIdAndUpdate(request.params.id, orderSlip, { new:true })
//     .then(updatedBlog => {
//     response.json(updatedBlog.toJSON())
//     })*/
// })
module.exports = orderSlipRouter