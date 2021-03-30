import React, { createContext, useState } from 'react';

export const Context = createContext({});

export const ContextProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);

    return (
        <Context.Provider
            value={{
                logged,
                setLogged
            }}
        >
            {children}
        </Context.Provider>
    );
};
