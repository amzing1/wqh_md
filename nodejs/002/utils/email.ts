import { createTransport, TransportOptions } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const sendEmail = async (options: any) => {
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT as string),
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    secure: false
  } as SMTPTransport.Options)

  const mailOptions = {
    from: 'wqh <wqh@qq.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  await transporter.sendMail(mailOptions)
}

export { sendEmail }
