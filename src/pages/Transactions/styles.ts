import styled from 'styled-components'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const TransactionsContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${({ theme }) => theme['gray-700']};
    cursor: pointer;
    text-align: center;

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  .selected-transaction {
    outline: 2px solid ${({ theme }) => theme['green-500']};
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`

export const RadioTransaction = styled(RadioGroup.Item)`
  background-color: ${({ theme }) => theme.white};
  border: 0;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  color: ${({ theme }) => theme['gray-300']};

  .indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme['green-700']};
    }
  }
`
export const ScrollContainer = styled.section`
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme['gray-700']};
    border-radius: 6px;
  }
`
