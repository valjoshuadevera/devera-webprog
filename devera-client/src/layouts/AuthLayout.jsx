import { NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/images/wwelogo.png";
import wweVideo from "../assets/videos/wweintro.mp4";

const pageCopy = {
  "/auth/signup": {
    title: "Join the WWE Universe",
    subtitle: "Create your account and unlock exclusive highlights.",
  },
  "/auth/signin": {
    title: "Welcome Back Superstar",
    subtitle: "Enter the ring. Watch the action. Stay legendary.",
  },
};

const AuthLayout = () => {
  const { pathname } = useLocation();
  const copy = pageCopy[pathname] || pageCopy["/auth/signin"];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="WWE Logo" className="h-8" />
          </NavLink>

          <div className="flex gap-4 text-sm">
            <NavLink
              to="/auth/signin"
              className={({ isActive }) =>
                isActive
                  ? "text-red-500 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }
            >
              Sign In
            </NavLink>

            <NavLink
              to="/auth/signup"
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

      <div className="flex flex-1 pt-20">
        <div className="hidden lg:flex w-1/2 relative bg-black">
          <video
            src={wweVideo}
            autoPlay
            muted
            loop
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute bottom-10 left-10">
            <h1 className="text-3xl font-bold">{copy.title}</h1>
            <p className="text-zinc-300 text-sm mt-2">{copy.subtitle}</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
