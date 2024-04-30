const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const cors = require('cors');
const db = require('./models');
const passportConfig = require('./passport');
const session = require('express-session')
const passport = require('passport');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

const app = express();

db.sequelize.sync()
  .then(()=>{
    console.log('db connected successfully');
  })
  .catch(console.error)

passportConfig();

app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session(({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET
})));

app.use(passport.initialize());
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('hello express');
})

app.get('/', (req, res) => {
  res.send('hello express api');
})

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello'},
    { id: 2, content: 'hello2'},
    { id: 3, content: 'hello3'}
  ])
})
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('Server starting!')
})
