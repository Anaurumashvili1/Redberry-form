import { createContext } from 'react';
import { useContext, useState, useEffect } from 'react';
import {
  SkillsContext,
  PersonalInfoContext,
  CovidContext,
} from './formContext';

export const SwitcherContext = createContext({
  covidPageLink: '',
});
export const SwitcherProvider = ({ children }) => {
  const skillsctx = useContext(SkillsContext);
  const personalctx = useContext(PersonalInfoContext);
  const covidCtx = useContext(CovidContext);

  const [covidPageLink, setCovidPageLink] = useState('');
  const [skillsPageLink, setSkillsPageLink] = useState('');
  const [insightsPageLink, setInsightsPageLink] = useState('');
  const [submitPageLink, setSubmitPageLink] = useState('');
  console.log(covidCtx.pageIsValid);
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

  useEffect(() => {
    if (covidCtx.pageIsValid) {
      setInsightsPageLink('/insights');
    } else setInsightsPageLink('');
  }, [covidCtx.pageIsValid]);

  return (
    <SwitcherContext.Provider
      value={{ covidPageLink, skillsPageLink, insightsPageLink }}
    >
      {children}
    </SwitcherContext.Provider>
  );
};
