import { Link } from 'react-router-dom'

export default function Header({ onJoinClick }) {
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/src/assets/prismscope-logo.png"
                alt="Consultant Network"
              />
              <span className="ml-3 text-xl font-semibold text-gray-900">
                Consultant Network
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Login
            </Link>
            <button
              onClick={onJoinClick}
              className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
            >
              Join as Consultant
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}