import React, { createContext, useState, useEffect, useContext } from 'react';

// Crée le UserContext
export const UserContext = createContext();

// Crée le composant UserProvider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const loadUserData = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');

            if (token && userData) {
                try {
                    const parsedUserData = JSON.parse(userData);
                    setUser(parsedUserData);
                    setLoggedIn(true);
                    setRole(parsedUserData.role);
                    console.log('User data successfully loaded.');
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    localStorage.removeItem('user');
                    setLoggedIn(false);
                    setRole(null);
                }
            } else {
                console.log('No valid token or user data found.');
            }
        };

        loadUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, role, setRole }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personnalisé pour accéder au contexte utilisateur
export const useUserContext = () => {
    return useContext(UserContext);
};
