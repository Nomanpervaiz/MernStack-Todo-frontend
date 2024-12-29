import React from 'react'
import AppRouter from './routes/Router'
import { UserProvider } from './context/userContext'

function App() {
  return (
    <UserProvider>
    <AppRouter/> 
    </UserProvider>
   )
}

export default App