import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

export interface TransactionsType {
  id: number
  type: 'income' | 'outcome'
  price: number
  description: string
  category: string
  createdAt: string
  updatedAt: string
}

interface CreateTransactionInput {
  category: string
  description: string
  price: number
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: TransactionsType[]
  transactionToEdit?: TransactionsType
  handleWithEditingTransaction: (id: number | undefined) => void
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  editTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  childreen: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ childreen }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsType[]>([])
  const [selectedIdTransaction, setSelectedIdTransaction] = useState<
    number | undefined
  >()

  const transactionToEdit = transactions.find(
    (transaction) => transaction.id === selectedIdTransaction,
  )

  const fetchTransactions = useCallback(async (query?: string) => {
    const { data } = await api.get(`transactions`, {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { category, description, price, type } = data
      const response = await api.post(`transactions`, {
        category,
        description,
        price,
        type,
        createdAt: new Date(),
        updatedAt: '',
      })

      setTransactions((state) => [...state, response.data])
    },
    [],
  )

  function handleWithEditingTransaction(id: number | undefined) {
    setSelectedIdTransaction(id)
  }

  const editTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      if (transactionToEdit) {
        const { category, description, price, type } = data
        const { id, createdAt } = transactionToEdit
        await api.put(`transactions/${id}`, {
          category,
          description,
          price,
          type,
          createdAt,
          updatedAt: new Date(),
        })

        await fetchTransactions()
      }
    },
    [transactionToEdit, fetchTransactions],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionToEdit,
        fetchTransactions,
        createTransaction,
        handleWithEditingTransaction,
        editTransaction,
      }}
    >
      {childreen}
    </TransactionsContext.Provider>
  )
}
