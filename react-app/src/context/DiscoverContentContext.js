import { createContext, useContext, useState } from 'react';
export const DiscoverContentContext = createContext();

export const useDiscoverContent = () => useContext(DiscoverContentContext);

export default function DiscoverContentProvider({ children }) {
  const [discoverContent, setDiscoverContent] = useState('HoroscopeMatch')


  return (
    <DiscoverContentContext.Provider
      value={{
        discoverContent,
        setDiscoverContent
      }}
    >
      {children}
    </DiscoverContentContext.Provider>
  );
}
