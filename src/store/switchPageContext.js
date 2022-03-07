import { createContext } from 'react';
import { useContext, useState, useEffect } from 'react';
import { SkillsContext } from './formContext';

export const SwitcherContext = createContext({
  covidPageLink: '',
});

export const SwitcherProvider = ({ children }) => {
  const ctx = useContext(SkillsContext);

  const [covidPageLink, setCovidPageLink] = useState('');

  useEffect(() => {
    if (ctx.skillsContext.pageIsValid) {
      setCovidPageLink('/covid');
    } else {
      setCovidPageLink('');
    }
  }, [ctx.skillsContext.pageIsValid]);

  return (
    <SwitcherContext.Provider value={{ covidPageLink }}>
      {children}
    </SwitcherContext.Provider>
  );
};
