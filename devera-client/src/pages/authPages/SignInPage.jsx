import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import constants from "../../constants";

const SignInPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${constants.HOST}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to sign in.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstName: data.firstName,
          type: data.type,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>

      {error && (
        <div className="mb-4 rounded border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-zinc-400">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-3 rounded bg-black border border-zinc-700 focus:border-red-600 outline-none"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-3 rounded bg-black border border-zinc-700 focus:border-red-600 outline-none"
            placeholder="********"
            autoComplete="current-password"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <p className="text-sm text-zinc-400 mt-6 text-center">
        Don't have an account?{" "}
        <NavLink to="/auth/signup" className="text-red-500">
          Sign Up
        </NavLink>
      </p>
    </>
  );
};

export default SignInPage;
