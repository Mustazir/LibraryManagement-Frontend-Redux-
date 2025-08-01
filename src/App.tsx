import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

function App() {

  return (
     <div className="app-container">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App


