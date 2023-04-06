const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String },
   email: { type: String },
   phone: { type: String },
   imageURL: { type: String },
   group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('Message', contactSchema);