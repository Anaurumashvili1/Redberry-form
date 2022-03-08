import { createContext, useState, useCallback, useContext } from 'react';
import { CollectInfoContext } from './collectInfoContext';
export const SubmitContext = createContext({ isMainPath: null });

export const SubmitProvider = ({ children }) => {
  const { info } = useContext(CollectInfoContext);
  const [isMainPath, setIsMainPath] = useState(false);

  return (
    <SubmitContext.Provider value={{ isMainPath, setIsMainPath }}>
      {children}
    </SubmitContext.Provider>
  );
};
