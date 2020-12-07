require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors());

app.use(express.json());

dbConnection();


app.use('/api/admins', require('./routes/admins'));
app.use('/api/login', require('./routes/auth'));

//mean_user
//sNmvfvyKHuuq4lS9

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});