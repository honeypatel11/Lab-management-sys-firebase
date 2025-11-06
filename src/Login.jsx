import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./context/AuthContextProvider";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({ email: "", password: "" });
  const { user, handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await handleLogin(input.email, input.password);
      if (res) navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid credentials");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl w-80 md:w-96 p-8 transition-transform hover:scale-[1.01] duration-200">
        <h1 className="text-4xl pb-3 font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 drop-shadow-sm">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={input.email}
              onChange={(e) =>
                setInput({ ...input, [e.target.id]: e.target.value })
              }
              placeholder="admin@gmail.com"
              required
              className="bg-white/60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={input.password}
              onChange={(e) =>
                setInput({ ...input, [e.target.id]: e.target.value })
              }
              required
              className="bg-white/60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-pink-600 shadow-md hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
