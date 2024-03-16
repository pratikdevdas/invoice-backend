const mongoose = require('mongoose')

const itemSchema = {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    id: { type: String, required: true },
    gst: { type: Number, required: true },
    specialCode: { type: String, required: true }
}

const orderSlipSchema = new mongoose.Schema({
    vendorName: { type: String, required: true },
    outlet: { type: String, required: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String, required: true },
    clientAddress: { type: String },
    clientCity: { type: String },
    clientPostCode: { type: String },
    clientGST: { type: String },
    clientBirthDate: { type: Date },
    deliveryDate: { type: Date, required: true },
    advancePayment: { type: Number, required: true },
    discount: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    editedAt: { type: Date },
    total: { type: Number, required: true },
    id: { type: String, unique:true, required: true },
    leftToPay: { type: Number, required: true },
    status: { type: String, required: true },
    customId: { type: String,unique:true, required: true },
    items: { type: [itemSchema], required: true }
})

orderSlipSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.mid = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('OrderSlip', orderSlipSchema)
