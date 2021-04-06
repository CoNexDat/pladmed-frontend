import React, { createContext, useState } from 'react';
import { storeToken, clearToken, getToken } from '../storage/auth_storage'
import { requestLogin, requestRegister } from '../requesters/account_requester'
import { requestUserData } from '../requesters/account_requester'
import {
    LoginError,
    RegisterError,
    UserDataError,
    AllProbesError,
    MyProbesError,
    CreateProbeError,
    MyOperationsError,
    CreateOperationsError,
    FindOperationError
} from '../exceptions/request_exceptions'
import {
    requestAllProbes,
    requestMyProbes,
    requestRegisterProbe
} from '../requesters/probes_requester';
import {
    requestCreateOperation,
    requestMyOperations,
    requestFindOperation
} from '../requesters/operations_requester'

export const Context = createContext({});

export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(getToken());

    const saveToken = (token) => {
        storeToken(token);
        setToken(token);
    }

    const logout = () => {
        clearToken();
        setToken(null);
    }

    const login = async (email, password) => {
        const [status, res] = await requestLogin(email, password);

        const success = status === 200;

        if (!success) {
            throw new LoginError("Credenciales inválidas")
        }

        saveToken(res["access_token"])
    }

    function handleAuthRequest(fn) {
        return async function() {
            const [status, data] = await fn.apply(this, arguments);

            if (status === 401) {
                logout();
            }

            return [status, data]
        };
    }

    return (
        <Context.Provider
            value={{
                token,
                logged: () => {
                    return token !== null;
                },
                saveToken: (token) => {
                    saveToken(token)
                },
                logout: () => {
                    logout();
                },
                login: async (email, password) => {
                    return login(email, password);
                },
                register: async (email, password) => {
                    const [status, ] = await requestRegister(email, password);

                    const success = status === 201;
            
                    if (!success) {
                        throw new RegisterError(
                            "El email ya se encuentra registrado"
                        )
                    }

                    return login(email, password);
                },
                getUserData: async () => {
                    const fn = handleAuthRequest(requestUserData);

                    const [status, data] = await fn(token);

                    const success = status === 200;
                    
                    if (!success) {
                        throw new UserDataError("El usuario no existe")
                    }

                    return data;
                },
                getAllProbes: async () => {
                    const fn = handleAuthRequest(requestAllProbes);

                    const [status, data] = await fn(token);

                    const success = status === 200;
                    
                    if (!success) {
                        throw new AllProbesError("Ocurrio un error inesperado")
                    }

                    return data;                    
                },
                getMyProbes: async () => {
                    const fn = handleAuthRequest(requestMyProbes);

                    const [status, data] = await fn(token);

                    const success = status === 200;
                    
                    if (!success) {
                        throw new MyProbesError("Ocurrio un error inesperado")
                    }

                    return data;                      
                },
                registerProbe: async (latitude, longitude) => {
                    const fn = handleAuthRequest(requestRegisterProbe);

                    const [status, data] = await fn(latitude, longitude, token);

                    const success = status === 201;
                    
                    if (!success) {
                        throw new CreateProbeError("Ocurrio un error inesperado")
                    }

                    return data;                       
                },
                getMyOperations: async () => {
                    const fn = handleAuthRequest(requestMyOperations);

                    const [status, data] = await fn(token);

                    const success = status === 200;
                    
                    if (!success) {
                        throw new MyOperationsError("Ocurrio un error inesperado")
                    }

                    return data;   
                },
                createOperation: async (operation, format, params, probes) => {
                    const fn = handleAuthRequest(requestCreateOperation);

                    const [status, data] = await fn(
                        operation,
                        format,
                        params,
                        probes,
                        token
                    );

                    const success = status === 201;
                    
                    if (!success) {
                        throw new CreateOperationsError("Ocurrio un error inesperado")
                    }

                    return data;                       
                },
                findOperation: async (operation) => {
                    const fn = handleAuthRequest(requestFindOperation);

                    const [status, data] = await fn(
                        operation,
                        token
                    );

                    const success = status === 200;
                    
                    if (!success) {
                        throw new FindOperationError("Ocurrio un error inesperado")
                    }

                    return data;    
                }
            }}
        >
            {children}
        </Context.Provider>
    );
};
