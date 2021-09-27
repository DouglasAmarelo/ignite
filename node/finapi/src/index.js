const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

/**
 ---- ESTRUTURA DA CONTA ----
 * cpf: string
 * name: string
 * id: uuid
 * statement: array
*/

let CUSTOMERS = [];

// Middlewares
const checkIfAccountExists = (req, res, next) => {
  const { cpf } = req.headers;
  const cleanCPF = String(cpf).replace(/\./gim, '');

  if (!cleanCPF) {
    return res.status(400).json({ error: 'CPF is a required value' });
  }

  const accountFound = CUSTOMERS.find(account => account.cpf === cleanCPF);

  if (!accountFound) {
    return res.status(400).json({ error: 'Client not found' });
  }

  req.accountFound = accountFound;

  return next();
};

// Helpers
const getbalance = account => {
  const balance = account.statement.reduce((acc, curr) => {
    if (curr.type === 'credit') {
      return acc + curr.amount;
    }

    return acc - curr.amount;
  }, 0);

  return balance;
};

// Criar uma conta
app.post('/account', (req, res) => {
  const { cpf, name } = req.body;
  const cleanCPF = String(cpf).replace(/\./gim, '');

  if (!cleanCPF) {
    return res.status(400).json({ error: 'CPF is a required value' });
  }

  const customerAlreadyExists = CUSTOMERS.some(
    customer => customer.cpf === cleanCPF
  );

  if (customerAlreadyExists) {
    return res.status(404).json({ error: 'Customer already exists' });
  }

  const newClient = {
    id: uuidv4(),
    name,
    cpf: cleanCPF,
    statement: [],
  };

  CUSTOMERS.push(newClient);

  return res.json(newClient);
});

// Buscar conta
app.get('/account', (req, res) => {
  const { cpf } = req.body;
  const cleanCPF = String(cpf).replace(/\./gim, '');

  if (!cleanCPF) {
    return res.status(400).json({ error: 'CPF is a required value' });
  }

  const accountFound = CUSTOMERS.find(account => account.cpf === cleanCPF);

  return accountFound
    ? res.json({ account: accountFound })
    : res.status(404).json({ error: 'Account Not Found' });
});

// Deletar conta
app.delete('/account', (req, res) => {
  const { cpf } = req.body;
  const cleanCPF = String(cpf).replace(/\./gim, '');

  if (!cleanCPF) {
    return res.status(400).json({ error: 'CPF is a required value' });
  }

  const accountFound = CUSTOMERS.find(account => account.cpf === cleanCPF);

  if (!accountFound) {
    return res.status(404).json({ error: 'Account Not Found' });
  }

  CUSTOMERS = CUSTOMERS.filter(account => account.cpf !== cleanCPF);

  return res.json({
    message: `The account of the client [${accountFound.name}] with the CPF [${accountFound.cpf}] was deleted`,
  });
});

// Buscar Extrato
app.get('/statement', checkIfAccountExists, (req, res) => {
  const { accountFound } = req;

  return res.json({ statement: accountFound?.statement });
});

// Depositar
app.post('/deposit', checkIfAccountExists, (req, res) => {
  const { accountFound } = req;
  const { description, amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: 'Value is a required value' });
  }

  const newStatement = {
    description: `=> entrada: ${description}`,
    amount,
    id: uuidv4(),
    type: 'credit',
    created_at: new Date(),
  };

  accountFound.statement.push(newStatement);

  return res.json({
    message: `The deposit of R$ ${amount} was made`,
    statement: newStatement,
  });
});

// Sacar
app.post('/withdraw', checkIfAccountExists, (req, res) => {
  const { accountFound } = req;
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: 'Value is a required value' });
  }

  const balance = getbalance(accountFound);

  if (balance < amount) {
    return res.status(400).json({ error: 'Insufficient funds' });
  }

  const newStatement = {
    description: '<= saída',
    amount,
    id: uuidv4(),
    type: 'debit',
    created_at: new Date(),
  };

  accountFound.statement.push(newStatement);

  return res.json({
    message: `The withdraw of R$ ${amount} was made`,
    statement: newStatement,
  });
});

// Start server
app.listen(3333);
