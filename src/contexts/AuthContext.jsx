import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);
  const login = (email, password) => auth.signInWithEmailAndPassword(email, password); // may have to change depending on server
  const logout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const sendPwdResetEmail = email => sendPasswordResetEmail(auth, email);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
        sendPwdResetEmail,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
