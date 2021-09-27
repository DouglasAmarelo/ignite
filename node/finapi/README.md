# FinAPI - Financeira

Aplicação desenvolvida em Nodejs com Express no curso da @Rocketseat.

### Requisitos

- [x] Deve ser possivel **criar** uma conta.
- [x] Deve ser possivel **deletar** uma conta.
- [ ] Deve ser possivel **obter** os dados da conta.
- [ ] Deve ser possivel **atualizar** os dados da conta.

- [ ] Deve ser possivel realizar um **depósito**.
- [ ] Deve ser possivel realizar um **saque**.

- [ ] Deve ser possivel **obter o saldo** da conta.

- [x] Deve ser possivel **buscar** o extrato bancário do cliente.
- [ ] Deve ser possivel **buscar** o extrato bancário _por data_, do cliente.

### Regras de negócio

- [x] Não deve ser possivel **criar** uma conta com _CPF já existente_.
- [ ] Não deve ser possivel **deletar** uma _conta não existente_.

- [ ] Não deve ser possivel realizar um **depósito** em uma _conta não existente_.
- [ ] Não deve ser possivel realizar um **saque** em uma _conta não existente_.
- [ ] Não deve ser possivel realizar um **saque** quando o _saldo for insuficiente_.

- [ ] Não deve ser possivel **obter saldo** de uma _conta não existente_.

- [x] Não deve ser possivel **buscar** o extrato bancário em uma _conta não existente_.
