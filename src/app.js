const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const session = require('express-session');
const bodyParser = require('body-parser');

const database = require('./config/mysql.config');
const authRoutes = require('./routes/api.routes');
const viewRoutes = require('./routes/view.routes');

const app = express();
const port = process.env.APP_PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'super-secret', resave: false,
saveUninitialized: true }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use('/', viewRoutes);

app.listen(port, () =>{
    console.log(`App running on : localhost:${port}`);
})



