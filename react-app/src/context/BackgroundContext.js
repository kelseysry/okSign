import { createContext, useContext, useState } from 'react';
export const BackgroundContentContext = createContext();

export const useBackgroundContent = () => useContext(BackgroundContentContext);

export default function BackgroundContentProvider({ children }) {
  const [backgroundContent, setBackgroundContent] = useState('dark')

  return (
    <BackgroundContentContext.Provider
      value={{
        backgroundContent,
        setBackgroundContent
      }}
    >
      {children}
    </BackgroundContentContext.Provider>
  );
}
