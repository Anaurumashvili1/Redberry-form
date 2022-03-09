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
  const skillsCtx = useContext(SkillsContext);
  const personalCtx = useContext(PersonalInfoContext);
  const covidCtx = useContext(CovidContext);
  const insightsCtx = useContext(InsightsContext);

  const [info, setInfo] = useState({
    token: 'a9e7625e-babd-4585-a2bc-933db60b1872',
  });

  useEffect(() => {
    if (
      covidCtx.hadCovid === 'yes' &&
      covidCtx.isVaccinated === 'yes' &&
      insightsCtx.devtalk_topic !== '' &&
      personalCtx.phone !== ''
    ) {
      setInfo((prevState) => ({
        ...prevState,
        first_name: personalCtx.first_name,
        last_name: personalCtx.last_name,
        email: personalCtx.email,
        phone: personalCtx.phone,
        skills: skillsCtx.skillsInfo,
        work_preference: covidCtx.workType,
        had_covid: covidCtx.hadCovid === 'yes',
        had_covid_at: covidCtx.covidDate === null ? '' : covidCtx.covidDate,
        vaccinated: covidCtx.isVaccinated === 'yes',
        vaccinated_at:
          covidCtx.vaccineDate === null ? '' : covidCtx.vaccineDate,
        will_organize_devtalk: insightsCtx.will_organize_devtalk === 'yes',
        devtalk_topic: insightsCtx.devtalk_topic,
        something_special: insightsCtx.something_special,
      }));
    } else if (
      covidCtx.hadCovid === 'yes' &&
      insightsCtx.devtalk_topic !== '' &&
      personalCtx.phone !== ''
    ) {
      setInfo((prevState) => ({
        ...prevState,
        first_name: personalCtx.first_name,
        last_name: personalCtx.last_name,
        email: personalCtx.email,
        phone: personalCtx.phone,
        skills: skillsCtx.skillsInfo,
        work_preference: covidCtx.workType,
        had_covid: covidCtx.hadCovid === 'yes',
        vaccinated: covidCtx.isVaccinated === 'yes',
        had_covid_at: covidCtx.covidDate,
        will_organize_devtalk: insightsCtx.will_organize_devtalk === 'yes',
        devtalk_topic: insightsCtx.devtalk_topic,
        something_special: insightsCtx.something_special,
      }));
    } else if (
      covidCtx.isVaccinated === 'yes' &&
      insightsCtx.devtalk_topic !== '' &&
      personalCtx.phone !== ''
    ) {
      setInfo((prevState) => ({
        ...prevState,
        first_name: personalCtx.first_name,
        last_name: personalCtx.last_name,
        email: personalCtx.email,
        phone: personalCtx.phone,
        skills: skillsCtx.skillsInfo,
        work_preference: covidCtx.workType,
        had_covid: covidCtx.hadCovid === 'yes',
        vaccinated: covidCtx.isVaccinated === 'yes',
        vaccinated_at: covidCtx.vaccineDate,
        will_organize_devtalk: insightsCtx.will_organize_devtalk === 'yes',
        devtalk_topic: insightsCtx.devtalk_topic,
        something_special: insightsCtx.something_special,
      }));
    } else if (insightsCtx.devtalk_topic !== '' && personalCtx.phone !== '') {
      setInfo((prevState) => ({
        ...prevState,
        first_name: personalCtx.first_name,
        last_name: personalCtx.last_name,
        email: personalCtx.email,
        phone: personalCtx.phone,
        skills: skillsCtx.skillsInfo,
        work_preference: covidCtx.workType,
        had_covid: covidCtx.hadCovid === 'yes',
        vaccinated: covidCtx.isVaccinated === 'yes',
        will_organize_devtalk: insightsCtx.will_organize_devtalk === 'yes',
        devtalk_topic: insightsCtx.devtalk_topic,
        something_special: insightsCtx.something_special,
      }));
    } else if (insightsCtx.devtalk_topic !== '') {
      setInfo((prevState) => ({
        ...prevState,
        first_name: personalCtx.first_name,
        last_name: personalCtx.last_name,
        email: personalCtx.email,
        skills: skillsCtx.skillsInfo,
        work_preference: covidCtx.workType,
        had_covid: covidCtx.hadCovid === 'yes',
        vaccinated: covidCtx.isVaccinated === 'yes',
        will_organize_devtalk: insightsCtx.will_organize_devtalk === 'yes',
        devtalk_topic: insightsCtx.devtalk_topic,
        something_special: insightsCtx.something_special,
      }));
    } else if (personalCtx.phone !== '') {
      setInfo((prevState) => ({
        ...prevState,
        first_name: personalCtx.first_name,
        last_name: personalCtx.last_name,
        email: personalCtx.email,
        phone: personalCtx.phone,
        skills: skillsCtx.skillsInfo,
        work_preference: covidCtx.workType,
        had_covid: covidCtx.hadCovid === 'yes',
        vaccinated: covidCtx.isVaccinated === 'yes',
        will_organize_devtalk: insightsCtx.will_organize_devtalk === 'yes',
        something_special: insightsCtx.something_special,
      }));
    } else {
      setInfo((prevState) => ({
        ...prevState,
        first_name: personalCtx.first_name,
        last_name: personalCtx.last_name,
        email: personalCtx.email,
        skills: skillsCtx.skillsInfo,
        work_preference: covidCtx.workType,
        had_covid: covidCtx.hadCovid === 'yes',
        vaccinated: covidCtx.isVaccinated === 'yes',
        will_organize_devtalk: insightsCtx.will_organize_devtalk === 'yes',
        something_special: insightsCtx.something_special,
      }));
    }
  }, [skillsCtx, personalCtx, covidCtx, insightsCtx]);

  return (
    <CollectInfoContext.Provider value={{ info, setInfo }}>
      {children}
    </CollectInfoContext.Provider>
  );
};
