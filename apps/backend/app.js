const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
const cors = require('cors');
const db = require('./models');
const passportConfig = require('./passport');
const session = require('express-session')
const passport = require('passport');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config()

const app = express();

db.sequelize.sync()
  .then(()=>{
    console.log('db connected successfully');
  })
  .catch(console.error)

passportConfig();

app.use(morgan('dev'))
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

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);


app.listen(3065, () => {
  console.log('Server starting!')
})
