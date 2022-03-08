import { createContext, useCallback, useContext } from 'react';
import { useState, useEffect } from 'react';
import { SkillsContext, PersonalInfoContext } from './formContext';

export const CollectInfoContext = createContext({
  info: {},
});

export const CollectInfoProvider = ({ children }) => {
  const ctx = useContext(SkillsContext);

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
  const receivedSkillsInfo = ctx.skillsContext.skillsInfo;
  const personalInfoContext = useContext(PersonalInfoContext);
  const personalCtx = personalInfoContext.personalContext;

  useEffect(() => {
    setInfo((prevState) => ({
      ...prevState,
      first_name: personalCtx.first_name,
      last_name: personalCtx.last_name,
      email: personalCtx.email,
      phone: personalCtx.phone,
      ...receivedSkillsInfo,
    }));
  }, [receivedSkillsInfo, personalCtx]);

  return (
    <CollectInfoContext.Provider value={{ info }}>
      {children}
    </CollectInfoContext.Provider>
  );
};
