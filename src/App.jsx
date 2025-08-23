import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import OAuthCallback from './components/OAuthCallback'
import ThankYouPage from './components/ThankYouPage'
import ExampleReport from './components/ExampleReport'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/:provider/callback" element={<OAuthCallback />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/example-report" element={<ExampleReport />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App