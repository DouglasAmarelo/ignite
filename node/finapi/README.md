# FinAPI - Financeira

Aplicação desenvolvida em Nodejs com Express no curso da @Rocketseat.

### Requisitos

- [x] Deve ser possivel **criar** uma conta.
- [x] Deve ser possivel **deletar** uma conta.
- [x] Deve ser possivel **obter** os dados da conta.
- [x] Deve ser possivel **atualizar** os dados da conta.

- [x] Deve ser possivel realizar um **depósito**.
- [x] Deve ser possivel realizar um **saque**.

- [x] Deve ser possivel **obter o saldo** da conta.

- [x] Deve ser possivel **buscar** o extrato bancário do cliente.
- [x] Deve ser possivel **buscar** o extrato bancário _por data_, do cliente.

### Regras de negócio

- [x] Não deve ser possivel **criar** uma conta com _CPF já existente_.
- [x] Não deve ser possivel **deletar** uma _conta não existente_.

- [x] Não deve ser possivel realizar um **depósito** em uma _conta não existente_.
- [x] Não deve ser possivel realizar um **saque** em uma _conta não existente_.
- [x] Não deve ser possivel realizar um **saque** quando o _saldo for insuficiente_.

- [x] Não deve ser possivel **obter saldo** de uma _conta não existente_.

- [x] Não deve ser possivel **buscar** o extrato bancário em uma _conta não existente_.
