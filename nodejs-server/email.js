let nodemailer = require('nodemailer');
let cfg = require('./config');
let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587, // TLS port
    secure: false, // true for 465, false for other ports
    auth: {
        user: cfg.email,
        pass: cfg.password
    },
    tls: { rejectUnauthorized: false },
});



let sendMail = (token, email) => {
    // create an html basic template
    let template = `
    <html>
    <body> 
        <div id="container">
        <img src="${cfg.logo}" alt="logo" width="42" height="42">
        <h3>Registration confirmation</h3>
        <p> Please click the link bellow to confirm your registeration </p>
        <a href="http://192.168.0.10:3000/confirm/${token}"> Confirmation Link </a>
        </div>
    </body>
    </html>
    `;
    // send mail with defined transport object
    let confirmationEmail = transporter.sendMail({
        from: '"themoviedb-store" <nazim@ryanleulmi.com>', // sender address
        to: email, // list of receivers
        subject: "Registration confirmation", // Subject line
        html: template
    }).then(info => {
        console.log("confirmation email has been sent from nodejs");
    }).catch(err => console.log(err));
    return confirmationEmail;
}

module.exports = sendMail;
