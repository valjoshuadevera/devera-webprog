import { NavLink, useNavigate } from 'react-router-dom';
import Button from './button';
import logo from "../assets/images/wwelogo.png";

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Tickets', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-zinc-900 bg-zinc-900 text-zinc-50'
      : 'border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900',
  ].join(' ');

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-zinc-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="WWE Logo" className="h-8" />
        </NavLink>

        {/* NAV LINKS */}
        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* AUTH BUTTONS (WWE STYLE) */}
        <div className="flex items-center gap-2">

          {/* SIGN IN */}
          <button
            onClick={() => navigate('/signin')}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white transition"
          >
            Sign In
          </button>

          {/* SIGN UP */}
          <button
            onClick={() => navigate('/signup')}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700 transition"
          >
            Sign Up
          </button>

        </div>

      </div>
    </header>
  );
};

export default NavBar;