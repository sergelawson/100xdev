import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Wallet from './pages/Wallet'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
      <Wallet />
    </ChakraProvider>
  )
}

export default App
