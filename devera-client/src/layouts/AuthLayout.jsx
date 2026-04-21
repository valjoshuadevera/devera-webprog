import { NavLink } from "react-router-dom";
import logo from "../assets/images/wwelogs.jpg";

import wweVideo from "../assets/videos/wweintro.mp4";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="WWE Logo" className="h-8" />
          </NavLink>

          {/* NAV LINKS */}
          <div className="flex gap-4 text-sm">
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive
                  ? "text-red-500 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }
            >
              Sign In
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-red-500 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="flex flex-1 pt-20">

        {/* LEFT VIDEO (hidden on mobile) */}
        <div className="hidden lg:flex w-1/2 relative bg-black">

          {/* SAFE VIDEO */}
          {wweVideo ? (
            <video
              src={wweVideo}
              autoPlay
              muted
              loop
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full text-zinc-500">
              Video not found
            </div>
          )}

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/60" />

          {/* TEXT OVER VIDEO */}
          <div className="absolute bottom-10 left-10">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-zinc-300 text-sm mt-2">
              {subtitle}
            </p>
          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">

          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-xl">
            {children}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AuthLayout;