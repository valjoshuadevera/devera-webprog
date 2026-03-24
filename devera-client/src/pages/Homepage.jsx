import Button from "../components/button";
import { NavLink } from 'react-router-dom';
import logo from "../assets/images/wwelogo.png";
import hero from "../assets/images/cmpunkvsroman.jpg";
import brock from "../assets/images/brock.jpg";
import cmpunk from "../assets/images/layoutone.jpg";
import layoutTwo from "../assets/images/layouttwo.jpg";
import layoutThree from "../assets/images/layoutthree.jpg";

/* Navbar Links */
const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Tickets', to: '/articles' },
];

/* NavLink classes */
const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-zinc-900 bg-zinc-900 text-zinc-50'
      : 'border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900',
  ].join(' ');

/* NavBar Component */
const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-zinc-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="WWE Logo" className="h-8" />
        </NavLink>

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

        <Button variant="secondary">Sign In</Button>
      </div>
    </header>
  );
};

/* HomePage Component */
const HomePage = () => {
  const thumbs = [brock, cmpunk, hero, layoutTwo, layoutThree];
  
  const matches = [
    { img: brock, title: "Brock Lesnar vs Roman Reigns" },
    { img: cmpunk, title: "CM Punk vs Roman Reigns" },
    { img: hero, title: "Main Event Highlight" },
    { img: layoutTwo, title: "Tag Team Showdown" },
    { img: layoutThree, title: "Women's Championship Match" },
  ];

  return (
    <div className="bg-black text-white flex flex-col min-h-screen pt-20"> {/* pt-20 offsets navbar */}
      
      {/* 🔴 NAVBAR */}
      <NavBar />

      {/* 🔴 TOP SCROLLER */}
      <section className="border-b border-zinc-800 px-4 py-3 overflow-x-auto">
        <div className="flex gap-4">
          {thumbs.map((img, i) => (
            <div key={i} className="min-w-[180px]">
              <div className="relative group">
                <img
                  src={img}
                  className="h-28 w-full object-cover rounded"
                />
                <span className="absolute top-1 right-1 bg-black/80 px-1 text-xs">
                  03:21
                </span>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  ▶
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔴 HERO */}
      <section className="grid lg:grid-cols-2">
        <div className="relative h-[400px] lg:h-[520px]">
          <img
            src={hero}
            className="h-full w-full object-cover"
            alt="CM Punk vs Roman Reigns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="flex flex-col justify-center bg-red-600 p-8 lg:p-12">
          <p className="text-xs uppercase tracking-widest text-white/70">
            Pay-Per-View
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight lg:text-4xl">
            CM Punk vs Roman Reigns
          </h1>
          <div className="mt-6 flex gap-3">
            <Button variant="primary">Preview</Button>
            <Button variant="secondary">Watch Highlights</Button>
          </div>
        </div>
      </section>

      {/* 🔴 MATCHES */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Latest Highlights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {matches.map((match, i) => (
            <article key={i} className="group">
              <div className="relative overflow-hidden">
                <img
                  src={match.img}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                  alt={match.title}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <span className="text-lg">▶</span>
                </div>
              </div>
              <h3 className="mt-3 font-semibold text-lg">{match.title}</h3>
              <Button className="mt-3" variant="primary">
                Watch
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;