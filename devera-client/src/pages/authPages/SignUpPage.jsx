import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import constants from "../../constants";

const roles = ["admin", "editor", "viewer"];

const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    role: "viewer",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      // SPLIT FULL NAME
      const [firstName, ...lastNameParts] = form.fullName
        .trim()
        .split(/\s+/);

      const payload = {
        firstName,
        lastName: lastNameParts.join(" ") || "User",
        email: form.email.trim(),
        username: form.username.trim(),
        password: form.password,
        type: form.role, // ROLE LOGIC
      };

      const response = await fetch(`${constants.HOST}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // HANDLE API ERRORS
      if (!response.ok) {
        throw new Error(data.message || "Unable to create account.");
      }

      // SAVE AUTH DATA
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          firstName: data.user?.firstName,
          type: data.user?.type,
        })
      );

      setSuccess("Account created successfully!");

      // REDIRECT
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-white">
        Sign Up
      </h2>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-4 rounded border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="mb-4 rounded border border-green-800 bg-green-950/60 px-4 py-3 text-sm text-green-100">
          {success}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>

        {/* FULL NAME */}
        <div>
          <label className="text-sm text-zinc-400">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="John Cena"
            autoComplete="name"
            required
            className="mt-1 w-full rounded border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-red-600"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-zinc-400">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="mt-1 w-full rounded border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-red-600"
          />
        </div>

        {/* USERNAME */}
        <div>
          <label className="text-sm text-zinc-400">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="johncena"
            autoComplete="username"
            required
            className="mt-1 w-full rounded border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-red-600"
          />
        </div>

        {/* ROLE DROPDOWN */}
        <div>
          <label className="text-sm text-zinc-400">
            Select Role
          </label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-red-600"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-zinc-400">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
            autoComplete="new-password"
            minLength={8}
            required
            className="mt-1 w-full rounded border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-red-600"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Creating Account..."
            : "Create Account"}
        </Button>
      </form>

      {/* SIGN IN LINK */}
      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <NavLink
          to="/auth/signin"
          className="text-red-500 hover:text-red-400"
        >
          Sign In
        </NavLink>
      </p>
    </>
  );
};

export default SignUpPage;