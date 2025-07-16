import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;

const envelopes = [];
let totalBudget = 0;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/envelopes', (req, res) => {
  if (envelopes.length === 0) {
    return res.status(404).send('No envelopes found.');
  }

  res.json(envelopes);
});

app.post('/envelopes', (req, res) => {
  const { name, amount } = req.body;
  if (!name || !amount) {
    return res.status(400).send('Name and amount are required.');
  }
  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) {
    return res.status(400).send('Amount must be a valid number.');
  }

  if (
    envelopes.some((envelope) => envelope.name === name) ||
    envelopes.some((envelope) => envelope.amount === numericAmount)
  ) {
    return res
      .status(400)
      .send('Envelope with this name or amount already exists.');
  }

  const newEnvelope = { name, amount: numericAmount };
  envelopes.push(newEnvelope);

  envelopes.push({ name, amount });
  res.send(`Envelope ${name} with amount ${amount} added.`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
