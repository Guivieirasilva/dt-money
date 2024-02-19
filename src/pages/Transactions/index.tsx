import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearcForm } from './components/SearchForm'
import {
  PriceHighlight,
  RadioTransaction,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { ArrowDown } from 'phosphor-react'

export function Transactions() {
  const [transactions, handleWithEditingTransaction, transactionToEdit] =
    useContextSelector(TransactionsContext, (context) => {
      return [
        context.transactions,
        context.handleWithEditingTransaction,
        context.transactionToEdit,
      ]
    })

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearcForm />
        <RadioGroup.Root value={transactionToEdit?.id.toString()}>
          <TransactionsTable>
            <thead>
              <tr>
                <th>
                  <ArrowDown />
                </th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Criado em</th>
                <th>Atualizado em</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={
                    transactionToEdit?.id === transaction.id
                      ? 'selected-transaction'
                      : ''
                  }
                  onClick={() =>
                    transactionToEdit?.id === transaction.id
                      ? handleWithEditingTransaction(undefined)
                      : handleWithEditingTransaction(transaction.id)
                  }
                >
                  <td>
                    <RadioTransaction value={transaction.id.toString()}>
                      <RadioGroup.Indicator className="indicator" />
                    </RadioTransaction>
                  </td>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                  <td>
                    {transaction.updatedAt
                      ? dateFormatter.format(new Date(transaction.updatedAt))
                      : 'Não Atualizado'}
                  </td>
                </tr>
              ))}
            </tbody>
          </TransactionsTable>
        </RadioGroup.Root>
      </TransactionsContainer>
    </div>
  )
}
