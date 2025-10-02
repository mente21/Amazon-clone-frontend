import React, { createContext, useReducer } from "react";

export const datacontext = createContext();

export const Dataprovider = ({ reducer, initialvalue, children }) => {
  const [state, dispatch] = useReducer(reducer, initialvalue);
  return (
    <datacontext.Provider value={[state, dispatch]}>
      {children}
    </datacontext.Provider>
  );
};
