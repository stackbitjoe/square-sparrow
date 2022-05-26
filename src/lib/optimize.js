import { createContext, useContext } from 'react';

const gaContext = createContext(null);

export const GaProvider = gaContext.Provider;

export const useGa = () => useContext(gaContext);