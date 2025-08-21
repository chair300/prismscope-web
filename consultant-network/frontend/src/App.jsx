import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import ConsultantNetwork from './components/ConsultantNetwork'
import ConsultantSignupModal from './components/ConsultantSignupModal'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header onJoinClick={() => setIsSignupModalOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ConsultantNetwork />} />
          </Routes>
        </main>
        <Footer />
        <ConsultantSignupModal 
          isOpen={isSignupModalOpen} 
          onClose={() => setIsSignupModalOpen(false)} 
        />
      </div>
    </Router>
  )
}

export default App