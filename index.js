var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Configure multer for file uploads
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use original file name
  }
});

var upload = multer({ storage: storage });

app.post('/upload', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({
    filename: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
