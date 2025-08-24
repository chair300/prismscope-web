import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import logoSmall from '../assets/prismscope-logo-small.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const solutions = [
    { name: 'For Executives', path: '/executives', description: 'Strategic automation and competitive advantage' },
    { name: 'For Operations', path: '/operations', description: 'Team productivity and workflow optimization' },
    { name: 'For HR Teams', path: '/hr', description: 'Employee satisfaction and workplace improvement' },
    { name: 'For CI Professionals', path: '/continuous-improvements', description: 'Process improvement and automation' }
  ]

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoSmall} alt="Prismscope Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900">Prismscope</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button 
                className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                onMouseEnter={() => setIsSolutionsOpen(true)}
              >
                Solutions
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {isSolutionsOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  onMouseLeave={() => setIsSolutionsOpen(false)}
                >
                  {solutions.map((solution) => (
                    <Link
                      key={solution.path}
                      to={solution.path}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsSolutionsOpen(false)}
                    >
                      <div className="font-medium text-gray-900">{solution.name}</div>
                      <div className="text-sm text-gray-600">{solution.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {isHomePage ? (
              <>
                <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</a>
              </>
            ) : (
              <>
                <Link to="/#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</Link>
                <Link to="/#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</Link>
              </>
            )}
            <Link to="/demo" className="text-gray-600 hover:text-primary-600 transition-colors">Demo</Link>
            {isHomePage ? (
              <a href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</a>
            ) : (
              <Link to="/#contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</Link>
            )}
            <button 
              className="btn-primary"
              onClick={() => window.location.href = 'https://my.prismscope.ai'}
            >
              Start Free Assessment
            </button>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <div className="font-medium text-gray-900 mb-2">Solutions</div>
                {solutions.map((solution) => (
                  <Link
                    key={solution.path}
                    to={solution.path}
                    className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {solution.name}
                  </Link>
                ))}
              </div>
              {isHomePage ? (
                <>
                  <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
                  <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</a>
                </>
              ) : (
                <>
                  <Link to="/#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</Link>
                  <Link to="/#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</Link>
                </>
              )}
              <Link to="/demo" className="text-gray-600 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Demo</Link>
              {isHomePage ? (
                <a href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</a>
              ) : (
                <Link to="/#contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</Link>
              )}
              <button 
                className="btn-primary w-full"
                onClick={() => window.location.href = 'https://my.prismscope.ai'}
              >
                Start Free Assessment
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header