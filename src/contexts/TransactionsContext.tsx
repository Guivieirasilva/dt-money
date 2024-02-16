import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'

export interface TransactionsType {
  id: number
  type: 'income' | 'outcome'
  price: number
  description: string
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  category: string
  description: string
  price: number
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: TransactionsType[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  childreen: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ childreen }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsType[]>([])

  async function fetchTransactions(query?: string) {
    const { data } = await api.get(`transactions`, {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(data)
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { category, description, price, type } = data
    const response = await api.post(`transactions`, {
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [...state, response.data])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])
  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {childreen}
    </TransactionsContext.Provider>
  )
}
