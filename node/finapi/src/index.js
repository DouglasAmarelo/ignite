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

const formatDate = date => new Date(date + ' 00:00');

const filterStatementByDate = ({ account, date }) => {
  const statement = account.statement.filter(statement => {
    if (statement.created_at.toDateString() === new Date(date).toDateString()) {
      return statement;
    }
  });

  return statement;
};

// Middlewares
const checkIfAccountExists = (req, res, next) => {
  const { cpf } = req.headers;
  const cleanCPF = String(cpf).replace(/\./gim, '');

  if (!cleanCPF) {
    return res.status(400).json({ error: 'CPF is a required value' });
  }

  const accountFound = CUSTOMERS.find(account => account.cpf === cleanCPF);

  if (!accountFound) {
    return res.status(400).json({ error: 'Account not found' });
  }

  req.accountFound = accountFound;

  return next && next();
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
app.get('/account', checkIfAccountExists, (req, res) => {
  const { accountFound } = req;

  return res.json(accountFound);
});

// Deletar conta
app.delete('/account', checkIfAccountExists, (req, res) => {
  const { accountFound } = req;

  CUSTOMERS = CUSTOMERS.filter(account => account.cpf !== accountFound.cpf);

  return res.json({
    message: `The account of the client [${accountFound.name}] with the CPF [${accountFound.cpf}] was deleted`,
  });
});

// Atualizar conta
app.put('/account', checkIfAccountExists, (req, res) => {
  const { name } = req.body;
  const { accountFound } = req;

  if (!name) {
    return res.status(400).json({ error: 'Name is a required value' });
  }

  accountFound.name = name;

  return res.json(accountFound);
});

// Buscar extrato
app.get('/statement', checkIfAccountExists, (req, res) => {
  const { accountFound } = req;

  return res.json({
    balance: getbalance(accountFound),
    statement: accountFound?.statement,
  });
});

// Buscar extrato (por data)
app.get('/statement/date', checkIfAccountExists, (req, res) => {
  const { accountFound } = req;
  const { date } = req.query;

  const formatedDate = formatDate(date);
  const statement = filterStatementByDate({
    account: accountFound,
    date: formatedDate,
  });

  return res.json({ statement });
});

// Depositar
app.post('/deposit', checkIfAccountExists, (req, res) => {
  const { accountFound } = req;
  const { description, amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: 'Value is a required value' });
  }

  const newStatement = {
    description: `(+) entrada: ${description}`,
    amount,
    id: uuidv4(),
    type: 'credit',
    created_at: new Date(),
  };

  accountFound.statement.push(newStatement);

  const balance = getbalance(accountFound);

  return res.json({
    message: `The deposit of R$ ${amount} was made`,
    statement: newStatement,
    balance,
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
    description: '(-) saída',
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
