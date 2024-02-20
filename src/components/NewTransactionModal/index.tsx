import * as z from 'zod'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Content,
  Overlay,
  CloseButton,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { useEffect } from 'react'

const newTransactionFormSchema = z.object({
  price: z.number(),
  description: z.string(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTrasactionModal() {
  const [createTransaction, editTransaction, transactionToEdit] =
    useContextSelector(TransactionsContext, (context) => {
      return [
        context.createTransaction,
        context.editTransaction,
        context.transactionToEdit,
      ]
    })

  const {
    control,
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    createTransaction(data)
    reset()
  }

  async function handleEditTransaction(data: NewTransactionFormInputs) {
    editTransaction(data)
    reset()
  }

  useEffect(() => {
    if (transactionToEdit) {
      setValue('description', transactionToEdit.description)
      setValue('price', transactionToEdit.price)
      setValue('category', transactionToEdit.category)
      setValue('type', transactionToEdit.type)
    } else {
      reset()
    }
  }, [setValue, transactionToEdit, reset])

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <Dialog.Title>
          {' '}
          {transactionToEdit ? 'Editar Transação' : 'Nova Transação'}
        </Dialog.Title>
        <form
          action=""
          onSubmit={handleSubmit(
            transactionToEdit
              ? handleEditTransaction
              : handleCreateNewTransaction,
          )}
        >
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />

          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />

          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  defaultValue={transactionToEdit?.type}
                  onValueChange={field.onChange}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            {transactionToEdit ? 'Editar' : 'Cadastrar'}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
