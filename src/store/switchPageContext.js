import { createContext } from 'react';
import { useContext, useState, useEffect } from 'react';
import { SkillsContext, PersonalInfoContext } from './formContext';

export const SwitcherContext = createContext({
  covidPageLink: '',
});
export const SwitcherProvider = ({ children }) => {
  const skillsctx = useContext(SkillsContext);
  const personalctx = useContext(PersonalInfoContext);

  const [covidPageLink, setCovidPageLink] = useState('');
  const [skillsPageLink, setSkillsPageLink] = useState('');
  const [insightsPageLink, setInsightsPageLink] = useState('');
  const [submitPageLink, setSubmitPageLink] = useState('');

  useEffect(() => {
    if (skillsctx.skillsContext.pageIsValid) {
      setCovidPageLink('/covid');
    } else {
      setCovidPageLink('');
    }
  }, [skillsctx.skillsContext.pageIsValid]);

  useEffect(() => {
    if (personalctx.personalContext.pageIsValid) {
      setSkillsPageLink('/skills');
    } else {
      setSkillsPageLink('');
    }
  }, [personalctx.personalContext.pageIsValid]);

  return (
    <SwitcherContext.Provider value={{ covidPageLink, skillsPageLink }}>
      {children}
    </SwitcherContext.Provider>
  );
};
