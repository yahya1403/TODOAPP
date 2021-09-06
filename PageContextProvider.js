import React, { useState, useEffect, createContext } from 'react';
export const PageContext = createContext();
const PageContextProvider = (props) => {
    const [user, setUser] = useState({
        'theme': 'light',
        'enable': true,
        'color': 'black',
        'bg': '#fff'
    });
    const toggle = () => {
        (user.enable) ? setUser({ 'enable': false, 'theme': 'dark', 'color': '#fff', 'bg': 'black' }) : setUser({ 'enable': true, 'theme': 'light', 'color': 'black', 'bg': '#fff' })
    }
    return (
        <PageContext.Provider value={{
            user, toggle
        }}>
            {props.children}
        </PageContext.Provider>
    );
}
export default PageContextProvider;