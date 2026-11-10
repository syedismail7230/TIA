const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'creatorsalliance.media@gmail.com',
    pass: 'yudcqmjsedbopqxf'
  }
});

async function run() {
  const res = await transporter.sendMail({
    from: '"The Influencer\'s Agency" <noreply@theinfluencers.agency>',
    sender: 'noreply@theinfluencers.agency',
    replyTo: 'support@theinfluencers.agency',
    to: 'creatorsalliance.media@gmail.com',
    subject: 'Header Test: Sender & From Address Verification',
    text: 'Testing sender address configuration.'
  });
  console.log('Result envelope:', res.envelope);
  console.log('Message ID:', res.messageId);
  console.log('Accepted:', res.accepted);
}

run().catch(console.error);

