const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const hpp = require('hpp');
const passportConfig = require('./passport');
const db = require('./models');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const hashtagRouter = require('./routes/hashtag');

dotenv.config();

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db connected successfully');
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));

  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: ['http://localhost:3002', 'http://reactbird.com'],
    credentials: true,
  }),
);

app.use('/', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === 'production' && '.reactbird.com',
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/', (req, res) => {
  res.send('hello express api');
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(80, () => {
  console.log('Server starting!');
});
