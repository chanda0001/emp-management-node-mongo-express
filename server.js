const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 8000;

const app = express();
app.set('view engine', 'ejs');
app.set('views',  './views');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const auth = require('./routes/auth');
app.use('/api/auth', auth);

const employee = require('./routes/employee');
app.use('/employee', employee);


const connectWithDb = require("./config/database");
connectWithDb();

app.listen(PORT, () => {
  console.log(`Server started sucessfully at ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  });


