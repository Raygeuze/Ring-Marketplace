var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var fs = require("fs");
var validator = require('email-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log(req.body.firstname);
  res.render('contact', {
    title: 'Contact Us',
    email: null,
    firstname: null,
    lastname: null,
    subject: null,
    message: null
  });
});

router.post('/', function(req, res, next) {
  //Pretty confident this all works but i need to work out how to secure
  //the application first. google wont let me send as it think it is a random
  //who might have my password

  //get the private data of email from json config file
  var content = fs.readFileSync("emailInfo.json");
  var jsonContent = JSON.parse(content);
  var email = jsonContent.email;
  var pass = jsonContent.pass;
  var emailTo = jsonContent.emailTo;

  console.log("testing TESETIIINTNGNNGNDGNSDFN");

  //honeypot for spam bots. extra field that only bots will see
  if(req.body.company){
    res.render('contact', {
      //not sure if this is the best way to handle this.
      //am i confident a user will never get to this.
      title: "ERROR: Spam Bot Detected",
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      subject: req.body.subject,
      message: req.body.message
    });
    return;
  }

  //check all fields are filled in
  if(!req.body.email || !req.body.subject || !req.body.message){
    res.render('contact', {
      title: "ERROR: You need to fill in all of the fields",
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      subject: req.body.subject,
      message: req.body.message
    });
    return;
  }

  //check the email is legit
  var emailCheck = validator.validate(req.body.email);

  if(emailCheck == false){
    res.render('contact', {
      //sets all the fields to what the user has already entered
      //so they dont need to retype
      title: "ERROR: Invalid email",
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      subject: req.body.subject,
      message: req.body.message
    });
    return;
  }

  //set up nodemailer trasport, i chose outlook.com
  var transporter = nodemailer.createTransport({
    service: 'Outlook.com',
    auth: {
      user: email,
      pass: pass
    }
  });

  // Setting the mail options
  var mailOptions = {
    from: req.body.firstname + ' &lt;' + email + ' &gt;',
    to: emailTo,
    subject: req.body.subject,
    text: 'Reply to '+ req.body.email +' from info@... \n\n'
     + 'From: ' + req.body.firstname + ' ' + req.body.lastname + '\n\n'
     + req.body.message
  };

  transporter.sendMail(mailOptions, function(error, info){

    //Email not sent
    if(error){
      console.log(error);
      res.render('contact', {
        title: "Error",
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        subject: req.body.subject,
        message: req.body.message
    });
    }
    //message sent
    else {
      res.render('contact', {
        title: "Successfully sent",
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        subject: req.body.subject,
        message: req.body.message
      });
    }

  });
});

module.exports = router;
