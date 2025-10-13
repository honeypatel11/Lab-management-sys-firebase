import { useContext } from "react";
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContextProvider";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Header = () => {

    const { user } = useContext(AuthContext);
    const { pathname } = useLocation()
    console.log(pathname)
    const logout = async () => {
        await signOut(auth);
    }

    return (
        <div>
            {
                pathname == "/login" ? "" :
                    <nav className="bg-white dark:bg-gray-900  w-full  border-b border-gray-200 dark:border-gray-600">
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                            </a>
                            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                {user ? (
                                    <button
                                        onClick={logout}
                                        type="button"
                                        className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2 text-center">
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center">
                                        Login
                                    </Link>
                                )}
                            </div>

                            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                    <li>
                                        <Link to={'/'} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to={'/labs'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Labs</Link>
                                    </li>
                                    <li>
                                        <Link to={'/pcs'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Computers</Link>
                                    </li>
                                    <li>
                                        <Link to={'/students'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Students</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
            }
        </div>
    )
}

export default Header