import nodemailer from 'nodemailer'
import path from 'path'

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT),
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

/**
 * Send an HTML email, optionally embedding an image URL as a CID attachment.
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  imageUrl?: string
) {
  const mailOptions: any = {
    from: `"Cosmic Greetings" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
  }

  if (imageUrl) {
    mailOptions.attachments = [{
      filename: path.basename(imageUrl),
      path: imageUrl,
      cid: 'planetImage'
    }]
  }

  return transporter.sendMail(mailOptions)
}