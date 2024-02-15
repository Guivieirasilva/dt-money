import { ReactNode, createContext, useEffect, useState } from "react";

export interface TransactionsType {
  id: number;
  type: "income" | "outcome";
  price: number;
  description: string;
  category: string;
  cratedAt: string;
}

interface TransactionsContextType {
  transactions: TransactionsType[];
}

interface TransactionsProviderProps {
  childreen: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ childreen }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsType[]>([]);

  async function loadTransactions() {
    const response = await fetch(`http://localhost:3000/transactions`);
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);
  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {childreen}
    </TransactionsContext.Provider>
  );
}
