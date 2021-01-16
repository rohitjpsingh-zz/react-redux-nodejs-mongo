const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


const PORT = 4000;
const cors = require('cors');

const mongoose = require('mongoose');
const config = require('./DB.js');

const productRoute = require('./routes/product.route');


mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/product', productRoute);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});