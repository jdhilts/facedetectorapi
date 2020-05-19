const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//app.use(express.urlencoded({extended: false}));
const database = knex({
	client: 'pg',
	connection: {
		connectionString : process.env.DATABASE_URL,
		ssl: true
	}});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send(database.users)});
app.post('/signin', (req, res) => {signin.handleSignin(req, res, database, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleGetProfile(req, res, database)});
app.put('/image', (req, res) => {image.handleImage(req, res, database)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});
app.post('/register', (req, res) => {register.handleRegister(req, res, database, bcrypt)});


app.listen(process.env.PORT || 300, () => {console.log('THE APP IS RUNNING ON SERVER ' + process.env.PORT)});



