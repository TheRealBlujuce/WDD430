const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression')

// import the routing file to handle the default (index) route
var index = require('./src/app/server/routes/app');
var messageRoutes = require('./src/app/server/routes/messages');
var documentsRoutes = require('./src/app/server/routes/documents');
var contactsRoutes = require('./src/app/server/routes/contacts');

// Connect to MongoDB
mongoose.connect('mongodb+srv://willmarda:Icu4MongoDBAtlas@maincluster.twrdd3f.mongodb.net/cms?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('MongoDB connection error', error);
});


const app = express();
app.use(compression())

// Add support for CORS
app.use(cors());

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Define the API routes

// Serve the static files generated by Angular
app.use(express.static(path.join(__dirname, 'dist/cms')));

// Redirect all non-API requests to the Angular app
app.get('*', (req, res) => {
  console.log(`Received request for URL: ${req.url}`);
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

// Tell express to map the default route ('/') to the index route
app.use('/', index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use('/messages', messageRoutes);
app.use('/contacts', contactsRoutes);
app.use('/documents', documentsRoutes);

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, () => {
  console.log(`API running on localhost: ${port}`);
});
