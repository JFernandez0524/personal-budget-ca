import express from 'express';

import { readEnvelopes, writeEnvelopes, addEnvelope } from '../lib/fs.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const envelopes = await readEnvelopes();
  res.json(envelopes);
});

router.post('/', (req, res) => {
  const { name, amount } = req.body;

  // Validate input
  const validInput = validateInput(name, amount);
  if (!validInput) {
    return res.status(400).send('Invalid input.');
  }
  const numericAmount = Number(amount);
  // Read existing envelopes
  const envelopes = readEnvelopes();
  // Add new envelope
  addEnvelope(envelopes, { name, amount: numericAmount });
  // Write updated envelopes to file
  writeEnvelopes(envelopes)
    .then(() => res.status(201).send(`Envelope ${name} created.`))
    .catch((err) =>
      res.status(500).send(`Error creating envelope: ${err.message}`)
    );
});

export default router;
