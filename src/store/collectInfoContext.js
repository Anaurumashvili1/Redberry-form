import { createContext, useCallback, useContext } from 'react';
import { useState, useEffect } from 'react';
import { SkillsContext } from './formContext';

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
  const receivedInfo = ctx.skillsContext.skillsInfo;
  useEffect(() => {
    setInfo((prevState) => ({
      ...prevState,
      ...receivedInfo,
    }));
  }, [receivedInfo]);

  return (
    <CollectInfoContext.Provider value={{ info }}>
      {children}
    </CollectInfoContext.Provider>
  );
};
