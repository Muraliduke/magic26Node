var express = require('express');
var router = express.Router();
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// let transporter = nodemailer.createTransport(
  
//   smtpTransport({
//     service: 'gmail',
//     auth: {
//         user: 'magicmailmanager',
//         pass: 'magic26@123'
//     }, 
//     tls: {
//       rejectUnauthorized: false
//     }
// })
// );
/* GET home page. */
router.post('/api', function(req, res, next) {
 
  const saveData = req.body;
//   let {firstName,
//     lastName,
//     emailId,
//     contact,
//     query} = saveData
//   const mailOptions = {
//     from: `magicmailmanager@gmail.com`, // Something like: Jane Doe <janedoe@gmail.com>
//     to: 'muraliduke4461@gmail.com',
//     subject: `Enquiry to Magic26 - ${firstName}`, // email subject
//     html: `
//     <div>
//         <b>An Enquiry has been made on Magic26 website.Please find below the details</b>
//         <section>
//             <p><b>Customer first Name </b>- ${firstName} </p>
//             <p><b>Customer last Name </b>- ${lastName}</p>
//             <p><b>Customer Mail </b>- ${emailId}</p>
//             <p><b>Contact details </b>- ${contact}</p>
//             <p><b>Query Information </b>- ${query}</p>
//         </section>

//     </div>
//     `
// };

// transporter.sendMail(mailOptions, (erro, info) => {
//     console.log(info)
//     if(erro){
//         return res.status(500).send(erro.toString());
//     }
//     return res.status(200).json({status: 'Mail delivered successfully'});
// });


    fs.readFile(__basedir + '/model/data.json', function(err, data) { // get the data from the file
        const rawData = data.toString();
        const parsedData = JSON.parse(rawData);

        saveData["_id"] = uuidv4();
        parsedData.push(saveData)
        fs.writeFile(__basedir + '/model/data.json', JSON.stringify(parsedData), (err) => {
            if(err){
              res.status(500).send({message: err.toString()})
            }else{
              res.status(200).send({message: "successfully updated"})
            }
        });            
    });
});

router.get('/alldata', (req,res)=> {
  fs.readFile(__basedir + '/model/data.json', function(err, data) { // get the data from the file
    const rawData = data.toString();
    const parsedData = JSON.parse(rawData);
    res.send(parsedData)
  })
})

router.delete('/:id', (req, res, next)=> {
let id = req.params.id;
fs.readFile(__basedir + '/model/data.json', function(err, data) { // get the data from the file
  const rawData = data.toString();
  const parsedData = JSON.parse(rawData);
  const remData = parsedData.filter((a)=> a._id !== id);
  fs.writeFile(__basedir + '/model/data.json', JSON.stringify(remData), (err) => {
      if(err){
        res.status(500).send({message: err.toString()})
      }else{
        res.status(200).send({message: "successfully removed " + id})
      }
  });            
});
})


module.exports = router;
