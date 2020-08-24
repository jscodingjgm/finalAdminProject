const express = require('express');
const userRouter = require('./routes/user');
const newsRouter = require('./routes/news');
const adminRouter = require('./routes/admin');

const app = express();

var users = {};

const port = process.env.PORT;
require('./db/db');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/api/user', userRouter);
app.use('/api/news', newsRouter);
app.use('/admin', adminRouter);

app.listen(port, '127.0.0.1');
