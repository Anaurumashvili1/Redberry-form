import { createContext } from 'react';
import { useContext, useState, useEffect } from 'react';
import {
  SkillsContext,
  PersonalInfoContext,
  CovidContext,
  InsightsContext,
} from './formContext';

export const SwitcherContext = createContext({
  covidPageLink: '',
});
export const SwitcherProvider = ({ children }) => {
  const skillsctx = useContext(SkillsContext);
  const personalctx = useContext(PersonalInfoContext);
  const covidCtx = useContext(CovidContext);
  const insightsCtx = useContext(InsightsContext);
  const [covidPageLink, setCovidPageLink] = useState('');
  const [skillsPageLink, setSkillsPageLink] = useState('');
  const [insightsPageLink, setInsightsPageLink] = useState('');
  const [submitPageLink, setSubmitPageLink] = useState('');

  useEffect(() => {
    if (skillsctx.pageIsValid) {
      setCovidPageLink('/covid');
    } else {
      setCovidPageLink('');
    }
  }, [skillsctx.pageIsValid]);

  useEffect(() => {
    if (personalctx.pageIsValid) {
      setSkillsPageLink('/skills');
    } else {
      setSkillsPageLink('');
    }
  }, [personalctx.pageIsValid]);

  useEffect(() => {
    if (covidCtx.pageIsValid) {
      setInsightsPageLink('/insights');
    } else setInsightsPageLink('');
  }, [covidCtx.pageIsValid]);

  useEffect(() => {
    if (insightsCtx.pageIsValid) {
      setSubmitPageLink('/submit');
    } else setSubmitPageLink('');
  }, [insightsCtx.pageIsValid]);

  return (
    <SwitcherContext.Provider
      value={{
        covidPageLink,
        skillsPageLink,
        insightsPageLink,
        submitPageLink,
      }}
    >
      {children}
    </SwitcherContext.Provider>
  );
};
