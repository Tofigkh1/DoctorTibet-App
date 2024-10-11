import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../server/configs/firebase';

// AuthContext'in tipini tanımlayalım
interface AuthContextType {
    useer: any;
    googleSignIn: () => Promise<void>;
    logOut: () => Promise<void>;
}

// AuthContext'i tanımlarken tipini belirtiyoruz
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [useer, setUser] = useState<any>(null);

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        
        if (accessToken) {
            localStorage.setItem('access_token', accessToken); // access_token'ı kaydet
        }

        setUser(result.user);
    };

    const logOut = async () => {
        await signOut(auth);
        localStorage.removeItem('access_token'); // Çıkış yapıldığında access_token'ı sil
        setUser(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ useer, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
