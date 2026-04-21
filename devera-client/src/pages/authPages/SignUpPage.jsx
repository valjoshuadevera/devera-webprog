import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import AuthLayout from "../../layouts/AuthLayout";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    console.log("User signed up");

  
    navigate("/");
  };

  return (
    <AuthLayout
      title="Join the WWE Universe"
      subtitle="Create your account and unlock exclusive highlights."
      active="signup"
    >
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-zinc-400">Full Name</label>
          <input
            type="text"
            className="w-full mt-1 px-4 py-3 rounded bg-black border border-zinc-700 focus:border-red-600 outline-none"
            placeholder="John Cena"
          />
        </div>

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

        {/* ✅ FIXED BUTTON */}
        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
          Create Account
        </Button>
      </form>

      <p className="text-sm text-zinc-400 mt-6 text-center">
        Already have an account?{" "}
        <NavLink to="/signin" className="text-red-500">
          Sign In
        </NavLink>
      </p>
    </AuthLayout>
  );
};

export default SignUpPage;
