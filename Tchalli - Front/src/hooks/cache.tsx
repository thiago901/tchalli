import React, { createContext, useCallback, useState, useContext } from 'react';

interface CacheState {
  id: string;
  data: object;
}

interface CacheContextData {
  data: object;
  setCache(id: string, data: object): void;
  getCache(id: string): object;
}

const CacheContext = createContext<CacheContextData>({} as CacheContextData);

const CacheProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<CacheState>({} as CacheState);
  const setCache = useCallback((id: string, ob: object) => {
    localStorage.setItem(`@Broadcast:${id}`, JSON.stringify(ob));

    setData({ id, data: ob });
  }, []);

  const getCache = useCallback((id: string) => {
    const ls = localStorage.getItem(`@Broadcast:${id}`);

    if (ls) {
      setData({ id, data: JSON.parse(ls) });
      return JSON.parse(ls);
    }
    setData({ id, data: [] });
    return [];
  }, []);
  return (
    <CacheContext.Provider value={{ data, setCache, getCache }}>
      {children}
    </CacheContext.Provider>
  );
};

function useCache(): CacheContextData {
  const context = useContext(CacheContext);

  if (!context) {
    throw new Error('useCache must be used within an CacheProvider');
  }
  return context;
}

export { CacheProvider, useCache };
