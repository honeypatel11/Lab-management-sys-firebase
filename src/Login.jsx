import { useEffect, useState } from "react"
import { useContext } from "react"
// import { AuthContext } from "../context/AuthContextProvider"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "./context/AuthContextProvider"

const Login = () => {

  const [input, setInput] = useState({
    email: "", password: ""
  })
  const { user,  handleLogin } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate("/")
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await handleLogin(input.email, input.password);
      if(res){
        navigate("/")
      }
     
    } catch (error) {
      if(error.code == "auth/invalid-credential"){
        toast.error("Invalid credential")
      }
    }
  }
  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <div className="container">
        <h1 className="text-3xl  text-center my-10 text-white font-semibold">Lab Login</h1>
        <form onSubmit={handleSubmit} className="md:w-4/12 w-8/12 mx-auto">
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Your email</label>
            <input type="email" onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })} value={input.email} id="email"
              className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="admin@gmail.com" required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Your password</label>
            <input type="password" onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })} value={input.password} id="password"
              className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login