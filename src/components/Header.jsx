import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
    const { user } = useContext(AuthContext);
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <>
            {pathname !== "/login" && (
                <nav className="bg-white border-b border-gray-300 sticky top-0 z-50">
                    <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

                        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1827/1827504.png"
                                className="h-8 logo-image"
                                alt="Lab Logo"
                            />
                            <span className="text-2xl font-bold text-black">LabPortal</span>
                        </Link>

                        <ul className="hidden md:flex space-x-6">
                            <li>
                                <Link
                                    to="/"
                                    className={`block py-2 px-5 rounded-full font-semibold transition-all duration-300 ${pathname === "/" ? "bg-black text-white" : "hover:bg-black hover:text-white"
                                        }`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/labs"
                                    className={`block py-2 px-5 rounded-full font-semibold transition-all duration-300 ${["/labs", "/add-lab", "/edit-lab"].includes(pathname)
                                            ? "bg-black text-white"
                                            : "hover:bg-black hover:text-white"
                                        }`}
                                >
                                    Labs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/pcs"
                                    className={`block py-2 px-5 rounded-full font-semibold transition-all duration-300 ${["/pcs", "/add-pc", "/edit-pc"].includes(pathname)
                                            ? "bg-black text-white"
                                            : "hover:bg-black hover:text-white"
                                        }`}
                                >
                                    Pcs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/students"
                                    className={`block py-2 px-5 rounded-full font-semibold transition-all duration-300 ${["/students", "/add-student", "/edit-student"].includes(pathname)
                                            ? "bg-black text-white"
                                            : "hover:bg-black hover:text-white"
                                        }`}
                                >
                                    Students
                                </Link>
                            </li>
                        </ul>

                        <div className="hidden md:block">
                            {user ? (
                                <button
                                    onClick={logout}
                                    className="bg-black text-white hover:bg-gray-800 font-medium rounded-full text-sm px-5 py-2.5 transition-all duration-300"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="bg-black text-white hover:bg-gray-800 font-medium rounded-full text-sm px-5 py-2.5 transition-all duration-300"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center p-2 ml-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isOpen ? (
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                ) : (
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z"
                                        clipRule="evenodd"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {isOpen && (
                        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
                            <Link
                                to="/"
                                className={`block py-2 px-5 rounded-full font-semibold transition-all duration-300 ${pathname === "/" ? "bg-black text-white" : "hover:bg-black hover:text-white"
                                    }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/labs"
                                className={`block py-2 px-5 rounded-full font-semibold transition-all duration-300 ${["/labs", "/add-lab", "/edit-lab"].includes(pathname)
                                        ? "bg-black text-white"
                                        : "hover:bg-black hover:text-white"
                                    }`}
                            >
                                Labs
                            </Link>
                            <Link
                                to="/pcs"
                                className={`block py-2 px-5 rounded-full font-semibold transition-all duration-300 ${["/pcs", "/add-pc", "/edit-pc"].includes(pathname)
                                        ? "bg-black text-white"
                                        : "hover:bg-black hover:text-white"
                                    }`}
                            >
                                Pcs
                            </Link>
                            <Link
                                to="/students"
                                className={`block py-2 px-5 rounded-full font-semibold transition-all duration-300 ${["/students", "/add-student", "/edit-student"].includes(pathname)
                                        ? "bg-black text-white"
                                        : "hover:bg-black hover:text-white"
                                    }`}
                            >
                                Students
                            </Link>
                            {user ? (
                                <button
                                    onClick={logout}
                                    className="bg-black text-white hover:bg-gray-800 font-medium rounded-full text-sm px-5 py-2.5 transition-all duration-300"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="bg-black text-white hover:bg-gray-800 font-medium rounded-full text-sm px-5 py-2.5 transition-all duration-300"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    )}
                </nav>
            )}
        </>
    );
};

export default Header;