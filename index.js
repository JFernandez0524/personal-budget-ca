require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT;

const envelopes = [];
const totalBudget = 0;

app.use(morgan('tiny'));
app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/envelopes', (req, res) => {
  res.send('Here are the envelopes.s');
});

app.post('/envelopes', (req, res) => {
  res.send('Post Request');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
