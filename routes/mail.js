var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer');
// const cors = require('cors')({origin: true});

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'magicmailmanager',
        pass: 'magic26@123'
    },
    tls: {
        rejectUnauthorized: false
      }
});


/* GET home page. */
router.post('/', function(req, res, next) {
    const {name, number, email, city, zip, service} = req.body
    const mailOptions = {
        from: `koops enquiry <${name}>`, // Something like: Jane Doe <janedoe@gmail.com>
        to: 'info@koops.co.in',
        subject: `Enquiry to Koops - ${name}`, // email subject
        html: `
        <div>
            <b>An Enquiry has been made on koops website.Please find below the details</b>
            <section>
                <p><b>Customer Name </b>- ${name} </p>
                <p><b>Customer Number </b>- ${number}</p>
                <p><b>Customer Mail </b>- ${email}</p>
                <p><b>City </b>- ${city}</p>
                <p><b>Pincode </b>- ${zip}</p>
                <p><b>Service </b>- ${service}</p>
            </section>

        </div>
        `
    };

    transporter.sendMail(mailOptions, (erro, info) => {
        console.log(info)
        if(erro){
            return res.status(500).send(erro.toString());
        }
        return res.status(200).json({status: 'Mail delivered successfully'});
    });
});

module.exports = router;
/**
* Here we're using Gmail to send 
*/
