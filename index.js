require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors());

app.use(express.json());

dbConnection();

app.use('/api/admins', require('./routes/admins'));
app.use('/api/degrees', require('./routes/degrees'));
app.use('/api/enrollments', require('./routes/enrollments'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/students', require('./routes/students'));
app.use('/api/todo', require('./routes/searches'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));

//mean_user
//sNmvfvyKHuuq4lS9

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT);
});
