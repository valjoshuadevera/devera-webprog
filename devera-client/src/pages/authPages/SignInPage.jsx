import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import AuthLayout from "../../layouts/AuthLayout";

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User signed in");
    navigate("/");
  };

  return (
    <AuthLayout
      title="Welcome Back Superstar"
      subtitle="Enter the ring. Watch the action. Stay legendary."
      active="signin"
    >
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-zinc-400">Email</label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-3 rounded bg-black border border-zinc-700 focus:border-red-600 outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-3 rounded bg-black border border-zinc-700 focus:border-red-600 outline-none"
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
          Sign In
        </Button>
      </form>

      <p className="text-sm text-zinc-400 mt-6 text-center">
        Don’t have an account?{" "}
        <NavLink to="/signup" className="text-red-500">
          Sign Up
        </NavLink>
      </p>
    </AuthLayout>
  );
};

export default SignInPage;