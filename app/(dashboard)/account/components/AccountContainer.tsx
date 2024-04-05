import { Account } from '@prisma/client'
import React from 'react'

interface AccountContainerProps {
  account: Account;
}

function AccountContainer({ account }: AccountContainerProps) {
  return (
    <div>AccountContainer</div>
  )
}

export default AccountContainer