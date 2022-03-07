import { useState, useEffect, useContext, useCallback } from 'react';
import { SkillsContext } from '../store/formContext';

const useSubmit = (receivedInfo) => {
  const [info, setInfo] = useState({
    token: '23b05ea5-c77a-4096-92c2-d29670f23e0d',
  });
  console.log(useContext(SkillsContext.skillsContext));
  useEffect(() => {
    setInfo((prevState) => ({
      ...prevState,
      ...receivedInfo,
    }));
  }, [receivedInfo, info]);

  return { info };
};

export default useSubmit;
