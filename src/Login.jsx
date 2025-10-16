// import { useEffect, useState } from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({ email: "", password: "" });
  const { user, handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await handleLogin(input.email, input.password);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid credential");
      }
    }
  };

  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 md:w-96">
        <h1 className="text-3xl text-center mb-8 text-black font-semibold">
          Lab Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black"
            >
              Your email
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
              className="bg-transparent border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 placeholder-gray-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-black"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={input.password}
              onChange={(e) =>
                setInput({ ...input, [e.target.id]: e.target.value })
              }
              required
              className="bg-transparent border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-gray-900 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;