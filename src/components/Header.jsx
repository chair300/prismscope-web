import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logoSmall from '../assets/prismscope-logo-small.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoSmall} alt="Prismscope Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900">Prismscope</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
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