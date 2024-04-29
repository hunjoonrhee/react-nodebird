const express = require('express');
const postRouter = require('./routes/post');
const db = require('./models');
const app = express();

db.sequelize.sync()
  .then(()=>{
    console.log('db connected successfully');
  })
  .catch(console.error)

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
app.listen(3065, () => {
  console.log('Server starting!')
})
