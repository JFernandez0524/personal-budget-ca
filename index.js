import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
const app = express();
const port = process.env.PORT || 3000;

import envelopesRouter from './routes/envelopes.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cors());
// Use the envelopes router
app.use('/envelopes', envelopesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.put('/envelopes/:name', (req, res) => {
  const { name: envelopeName } = req.params;
  const { name, amount } = req.body;

  // Find the envelope by name
  const envelopeIndex = envelopes.findIndex((env) => env.name === envelopeName);
  // If the envelope does not exist, return a 404 error
  if (envelopeIndex === -1) {
    return res.status(404).send('Envelope not found.');
  }

  // If the name is provided, update the envelope name
  if (name) {
    // Check if the new name already exists
    if (
      envelopes.some((env) => env.name === name && env.name !== envelopeName)
    ) {
      return res.status(400).send('Envelope with this name already exists.');
    }
    envelopes[envelopeIndex].name = name;
  }
  // If the amount is provided, update the envelope amount
  if (amount !== undefined) {
    // Validate the new amount
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res
        .status(400)
        .send('Amount must be a valid number greater than zero.');
    }
    // Check if the new amount exceeds the total budget limit
    if (numericAmount > 1000) {
      return res.status(400).send('Total budget cannot exceed $1000.');
    }

    // Validate input
    if (!amount) {
      return res.status(400).send('Amount is required.');
    }

    const envelope = envelopes.find((env) => env.name === name);
    if (!envelope) {
      return res.status(404).send('Envelope not found.');
    }

    // Update the total budget
    totalBudget -= envelope.amount;
    totalBudget += numericAmount;
    envelope.amount = numericAmount;
    res.send(`Envelope ${name} updated with new amount ${amount}.`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
