import {
  ButtonsGroup,
  EditTransactionButton,
  HeaderContainer,
  HeaderContent,
  NewTransactionButton,
} from './styles'
import logoImg from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTrasactionModal } from '../NewTransactionModal'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'

export function Header() {
  const transactionToEdit = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.transactionToEdit
    },
  )

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <ButtonsGroup>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <EditTransactionButton
                disabled={!transactionToEdit}
                type="button"
              >
                Editar Transação
              </EditTransactionButton>
            </Dialog.Trigger>

            <Dialog.Trigger asChild>
              <NewTransactionButton
                disabled={!!transactionToEdit}
                type="button"
              >
                Nova Transação
              </NewTransactionButton>
            </Dialog.Trigger>
            <NewTrasactionModal />
          </Dialog.Root>
        </ButtonsGroup>
      </HeaderContent>
    </HeaderContainer>
  )
}
