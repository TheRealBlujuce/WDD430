
var express = require('express');
var router = express.Router();
const Contact = require('../modules/contact-schema');

router.get('/', (req, res, next) => {
    Contact.find().then(contacts =>{
        console.log(contacts)
        res.status(200).json({
          message: "contact found!",
          contacts: contacts
        }).catch(err =>{
          console.log(err);
        })
      })
 });


module.exports = router; 
