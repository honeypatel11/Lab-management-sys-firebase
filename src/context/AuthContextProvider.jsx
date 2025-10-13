import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "../config/firebase";


export  const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {

    const [user , setUser] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (data) => {
            setUser(data)
            console.log(data)
        });

        return () => unsub();
    }, []);

    const handleLogin = async (email , password) => {
        console.log(email , password)
        return await signInWithEmailAndPassword(auth , email , password);
    }
    const value = {
        user , handleLogin
    }
  return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
  )
}

export default AuthContextProvider