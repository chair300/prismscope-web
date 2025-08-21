export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Consultant Network. All rights reserved.</p>
          <p className="mt-2">
            Powered by Prismscope AI Technology
          </p>
        </div>
      </div>
    </footer>
  )
}