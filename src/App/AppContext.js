import React, { useState } from 'react';
export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [session, setSession] = useState({
    loginFlag: false,
    userId: '',

  });

  return (
    <AppContext.Provider value={{ session, setSession }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
