import { createContext } from 'react';
import { useState, useEffect, useContext } from 'react';
import {
  SkillsContext,
  PersonalInfoContext,
  CovidContext,
  InsightsContext,
} from './formContext';

export const CollectInfoContext = createContext({
  info: {},
});

export const CollectInfoProvider = ({ children }) => {
  const ctx = useContext(SkillsContext);
  const receivedSkillsInfo = ctx.skillsContext.skillsInfo;
  const personalInfoContext = useContext(PersonalInfoContext);
  const personalCtx = personalInfoContext.personalContext;
  const covidCtx = useContext(CovidContext);
  const insightsCtx = useContext(InsightsContext);

  const [info, setInfo] = useState({
    token: '23b05ea5-c77a-4096-92c2-d29670f23e0d',
    // first_name: '',
    // last_name: '',
    // email: '',
    // phone: '',
    // skills: [],
    // work_preference: '',
    // had_covid: null,
    // had_covid_at: '',
    // vaccinated: null,
    // vaccinated_at: '',
    // will_organize_devtalk: null,
    // devtalk_topic: '',
    // something_special: '',
  });

  useEffect(() => {
    if (covidCtx.hadCovid === 'yes' && covidCtx.isVaccinated === 'yes') {
      setInfo((prevState) => ({
        ...prevState,
        first_name: personalCtx.first_name,
        last_name: personalCtx.last_name,
        email: personalCtx.email,
        phone: personalCtx.phone,
        ...receivedSkillsInfo,
        work_preference: covidCtx.workType,
        had_covid: covidCtx.hadCovid,
        had_covid_at: covidCtx.covidDate,
        vaccinated: covidCtx.isVaccinated,
        vaccinated_at: covidCtx.vaccineDate,
        will_organize_devtalk: insightsCtx.will_organize_devtalk,
        devtalk_topic: insightsCtx.devtalk_topic,
        something_special: insightsCtx.something_special,
      }));
    } else if (covidCtx.hadCovid === 'yes') {
      setInfo((prevState) => ({
        ...prevState,
        first_name: personalCtx.first_name,
        last_name: personalCtx.last_name,
        email: personalCtx.email,
        phone: personalCtx.phone,
        ...receivedSkillsInfo,
        work_preference: covidCtx.workType,
        had_covid: covidCtx.hadCovid,
        had_covid_at: covidCtx.covidDate,
        vaccinated: covidCtx.isVaccinated,
        will_organize_devtalk: insightsCtx.will_organize_devtalk,
        devtalk_topic: insightsCtx.devtalk_topic,
        something_special: insightsCtx.something_special,
      }));
    } else if (covidCtx.isVaccinated === 'yes') {
      setInfo((prevState) => ({
        ...prevState,
        first_name: personalCtx.first_name,
        last_name: personalCtx.last_name,
        email: personalCtx.email,
        phone: personalCtx.phone,
        ...receivedSkillsInfo,
        work_preference: covidCtx.workType,
        had_covid: covidCtx.hadCovid,
        vaccinated: covidCtx.isVaccinated,
        vaccinated_at: covidCtx.vaccineDate,
        will_organize_devtalk: insightsCtx.will_organize_devtalk,
        devtalk_topic: insightsCtx.devtalk_topic,
        something_special: insightsCtx.something_special,
      }));
    } else {
      setInfo((prevState) => ({
        ...prevState,
        first_name: personalCtx.first_name,
        last_name: personalCtx.last_name,
        email: personalCtx.email,
        phone: personalCtx.phone,
        ...receivedSkillsInfo,
        work_preference: covidCtx.workType,
        had_covid: covidCtx.hadCovid,
        vaccinated: covidCtx.isVaccinated,
        will_organize_devtalk: insightsCtx.will_organize_devtalk,
        devtalk_topic: insightsCtx.devtalk_topic,
        something_special: insightsCtx.something_special,
      }));
    }
  }, [receivedSkillsInfo, personalCtx, covidCtx, insightsCtx]);

  return (
    <CollectInfoContext.Provider value={{ info }}>
      {children}
    </CollectInfoContext.Provider>
  );
};
