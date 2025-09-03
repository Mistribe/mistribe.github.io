import { NavLink } from 'react-router-dom'
import { siGithub } from 'simple-icons'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur text-white animate-navbar-slide-down rune-border">
      <nav className="max-w-7xl mx-auto px-4 py-2 flex items-center">
        <div className="flex-1" />
        <div className="flex items-center gap-5 text-lg mx-auto font-alegreyasc">
          <NavLink
            to="/"
            className={({ isActive }) => `${isActive ? 'font-semibold' : 'font-normal'} hover:underline`}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => `${isActive ? 'font-semibold' : 'font-normal'} hover:underline`}
          >
            Projects
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `${isActive ? 'font-semibold' : 'font-normal'} hover:underline`}
          >
            About Us
          </NavLink>
        </div>
        <div className="flex-1 flex justify-end">
          <a
            href="https://github.com/Mistribe"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-white/80 hover:text-white"
          >
            <svg className="w-5 h-5" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="currentColor">
              <path d={siGithub.path} />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  )
}
