const mailRouter = require('express').Router()
const nodemailer = require('nodemailer')
const mailgen = require('mailgen')

mailRouter.post('/', async(req, res) => {
    const { name, email } = req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
	  user: process.env.EMAIL,
	  pass: process.env.PASSWORD,
        },
    })
    let MailGenerator = new Mailgen({
        theme: {
	  path: path.resolve('invoice.html'),
        },
        product: {
	  name: 'KIIT MUN',
	  link:'www.kiitmun.org',
	  user: body.name,
	  ticket: ticket.id
        },
    })

    let mail = MailGenerator.generate({ body:{} })

    let message = {
        from: process.env.EMAIL_USER,
        to: body.email,
        subject: `Ticket Raise Successful: ${body.subject}`,
        html: mail
    }

    await transporter.sendMail(message)
    return res.status(201).json({ message: 'Mail sent' })
})

module.exports = mailRouter