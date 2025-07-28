

import { Outlet } from 'react-router'
import './App.css'
import { Button } from './components/ui/button'

function App() {

  return (
    <>
       <div><div className="flex min-h-svh ">
      <Button>Click me</Button></div>
      <Outlet/>
    </div>
    </>
  )
}

export default App


