var express = require('express');
var router = express.Router();
const Contact = require('../modules/contact-schema');

router.get('/', (req, res, next) => {
  Contact.find()
    .populate('group')
    .then(contacts => {
      res.status(200).json({
          message: 'Contacts fetched successfully!',
          contacts: contacts
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// router.post('/', (req, res) => {
//   const newContact = new Contact(req.body);
//   newContact.save((error, contacts) => {
//     if (error) {
//       console.log('Error creating contact:', error);
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(201);
//     }
//   });
// });

// router.put('/:id', (req, res) => {
//   const contactID = req.params.id;
//   Contact.findByIdAndUpdate(contactID, req.body, (error, contact) => {
//     if (error) {
//       console.log('Error updating contact:', error);
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// router.delete('/:id', (req, res) => {
//   const contactID = req.params.id;
//   Contact.findByIdAndDelete(contactID, (error, Contact) => {
//     if (error) {
//       console.log('Error deleting contact:', error);
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });


module.exports = router; 
