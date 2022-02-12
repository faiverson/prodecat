const nodemailer = require("nodemailer");


const smtp = nodemailer.createTransport({
  host: "0.0.0.0",
  port: 1025,
  secure: false, // true for 465, false for other ports
  // auth: {
  //   user: testAccount.user, // generated ethereal user
  //   pass: testAccount.pass, // generated ethereal password
  // },
});


const mail = ({from, to, subject, html}) => {
  let info = smtp.sendMail({from, to, subject, html}, (err, info) => {
    if (!err) {
      console.log(info.envelope)
      console.log(info.messageId)
    } else {
      console.log('Mail err', err)
    }
    smtp.close()
  })
}


export default mail
