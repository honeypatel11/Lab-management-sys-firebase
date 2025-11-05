import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    await signOut(auth);
  };

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Labs", path: "/labs" },
    { name: "Pcs", path: "/pcs" },
    { name: "Students", path: "/students" },
  ];

  return (
    <>
      {pathname !== "/login" && (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg backdrop-blur-md transition-all duration-300">
          <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
           
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-90 transition-all"
            >
              <span className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 drop-shadow-sm">
                LabManagement
              </span>
            </Link>

          
            <ul className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => {
                const isActive = [
                  link.path,
                  `/add-${link.name.toLowerCase()}`,
                  `/edit-${link.name.toLowerCase()}`,
                ].includes(pathname);

                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`py-2 px-5 rounded-full font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-white text-indigo-600 shadow-md"
                          : "hover:bg-white/20 hover:shadow-lg"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
              <li>
                {user ? (
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-white text-pink-600 font-semibold px-5 py-2 rounded-full hover:bg-gray-100 transition-all shadow-md"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-full hover:bg-gray-100 transition-all shadow-md"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>

    
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-white/20 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

      
          {isOpen && (
            <div className="md:hidden bg-white/10 backdrop-blur-md flex flex-col space-y-2 px-5 pb-4 pt-3 border-t border-white/20 transition-all">
              {navLinks.map((link) => {
                const isActive = [
                  link.path,
                  `/add-${link.name.toLowerCase()}`,
                  `/edit-${link.name.toLowerCase()}`,
                ].includes(pathname);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 px-4 rounded-lg font-medium ${
                      isActive
                        ? "bg-white text-indigo-600"
                        : "hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-white text-pink-600 font-semibold py-2 rounded-lg hover:bg-gray-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-white text-indigo-600 font-semibold py-2 rounded-lg text-center hover:bg-gray-100"
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
