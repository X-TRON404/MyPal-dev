import React, {createContext,useContext,useReducer} from 'react';

// Create Context Object
export const StateContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const StateProvider = ({ reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);