import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    gap: 1.25rem;
  }
`

export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:not(:disabled):hover {
    background: ${({ theme }) => theme['green-700']};
    transition: 0.2s background-color linear;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const EditTransactionButton = styled.button`
  height: 50px;
  border: 1px solid ${({ theme }) => theme['green-500']};
  background: transparent;
  color: ${({ theme }) => theme['green-500']};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:not(:disabled):hover {
    background: ${({ theme }) => theme['green-500']};
    color: ${({ theme }) => theme.white};
    transition: 0.2s background-color linear;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
