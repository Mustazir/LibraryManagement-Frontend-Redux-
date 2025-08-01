import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { Toaster } from 'sonner'
import { PageLoader } from "@/components/ui/loading";
import { Suspense } from "react";
function App() {

  return (
     <div className="app-container">
      <Suspense fallback={<PageLoader message="Loading Library System..." fullScreen />}>

      <Navbar />
      <main className="content">
         <Toaster position="top-right" />
        <Outlet />
      </main>
      <Footer />
      </Suspense>
    </div>
  )
}

export default App


