import fs from 'node:fs/promises';
import path from 'path';

export async function readEnvelopes() {
  try {
    const data = await fs.readFile('./envelopes.json', { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading envelopes:', err);
    throw err;
  }
}

export async function writeEnvelopes(envelopes) {
  try {
    await fs.writeFile('./envelopes.json', JSON.stringify(envelopes, null, 2));
  } catch (err) {
    console.error('Error writing envelopes:', err);
    throw err;
  }
}

export function getAbsolutePath() {
  const __path = path.resolve('/');
  console.log(`Absolute path: ${__path}`);
  return __path;
}
export function validateInput(name, amount) {
  // Validate input
  if (!name || !amount) {
    throw new Error('Name and amount are required.');
  }
  const numericAmount = Number(amount);
  // Check if the amount is a valid number
  if (isNaN(numericAmount)) {
    throw new Error('Amount must be a valid number.');
  }
  const envelopes = readEnvelopes();
  // Check if the envelope name already exists
  if (envelopes.some((envelope) => envelope.name === name)) {
    throw new Error('Envelope with this name already exists.');
  }
  if (numericAmount <= 0) {
    throw new Error('Amount must be greater than zero.');
  }

  // Check if the total budget exceeds the limit
  if (numericAmount > 1000) {
    throw new Error('Total budget cannot exceed $1000.');
  }
  return true;
}
export function updateTotalBudget(totalBudget, numericAmount, envelopes, name) {
  // Update the total budget
  totalBudget -= envelopes.find((env) => env.name === name).amount;
  totalBudget += numericAmount;
  return totalBudget;
}
export function findEnvelopeByName(envelopes, name) {
  const envelope = envelopes.find((env) => env.name === name);
  if (!envelope) {
    throw new Error('Envelope not found.');
  }
  return envelope;
}
export function updateEnvelope(envelopes, envelopeName, name, amount) {
  const envelopeIndex = envelopes.findIndex((env) => env.name === envelopeName);
  // If the envelope does not exist, throw an error
  if (envelopeIndex === -1) {
    throw new Error('Envelope not found.');
  }

  // If the name is provided, update the envelope name
  if (name) {
    // Check if the new name already exists
    if (
      envelopes.some((env) => env.name === name && env.name !== envelopeName)
    ) {
      throw new Error('Envelope with this name already exists.');
    }
    envelopes[envelopeIndex].name = name;
  }

  // If the amount is provided, update the envelope amount
  if (amount !== undefined) {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new Error('Amount must be a valid number greater than zero.');
    }
    envelopes[envelopeIndex].amount = numericAmount;
  }
}
export function addEnvelope(envelopes, name, numericAmount) {
  const newEnvelope = { name, amount: numericAmount };
  envelopes.push(newEnvelope);
  return newEnvelope;
}
