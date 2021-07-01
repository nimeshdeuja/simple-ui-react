import React, { ReactElement, ReactNode } from 'react'

interface Props {
    children: ReactNode,
  };

const Index = ({children}:Props):ReactElement => {
    return (
        <div data-testid='test'>{children}</div>
    )
}

export default Index
