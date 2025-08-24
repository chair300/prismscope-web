import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import OAuthCallback from './components/OAuthCallback'
import ThankYouPage from './components/ThankYouPage'
import ExampleReport from './components/ExampleReport'
import ExecutivesPage from './components/ExecutivesPage'
import HRPage from './components/HRPage'
import ContinuousImprovementsPage from './components/ContinuousImprovementsPage'
import OperationsPage from './components/OperationsPage'
import DemoIntegrated from './components/DemoIntegrated'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/executives" element={<ExecutivesPage />} />
            <Route path="/hr" element={<HRPage />} />
            <Route path="/continuous-improvements" element={<ContinuousImprovementsPage />} />
            <Route path="/operations" element={<OperationsPage />} />
            <Route path="/demo" element={<DemoIntegrated />} />
            <Route path="/demo/:section" element={<DemoIntegrated />} />
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