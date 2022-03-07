import { useState, useEffect, useContext, useCallback } from 'react';
import { SkillsContext } from '../store/formContext';

const useSubmit = (receivedInfo) => {
  const context = useContext(SkillsContext);
  const ctx = context.skillsContext;

  const [info, setInfo] = useState({
    token: '23b05ea5-c77a-4096-92c2-d29670f23e0d',
  });

  const submit = useCallback(() => {
    ctx.submitPage();

    setInfo((prevState) => ({
      ...prevState,
      ...receivedInfo,
    }));
  }, [receivedInfo, ctx]);
  console.log(info);

  return { info, submit };
};

export default useSubmit;
