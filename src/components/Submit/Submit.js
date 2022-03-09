import classes from './Submit.module.css';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { CollectInfoContext } from '../../store/collectInfoContext';
import { SubmitContext } from '../../store/submitContext';
import {
  PersonalInfoContext,
  SkillsContext,
  CovidContext,
  InsightsContext,
} from '../../store/formContext';
import axios from 'axios';

const Submit = () => {
  const { info } = useContext(CollectInfoContext);
  const submitCtx = useContext(SubmitContext);
  const skillsCtx = useContext(SkillsContext);
  const personalCtx = useContext(PersonalInfoContext);
  const covidCtx = useContext(CovidContext);
  const insightsCtx = useContext(InsightsContext);

  const timeout = useCallback(() => {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'a9e7625e-babd-4585-a2bc-933db60b1872',
      },
    };
    axios
      .post(
        'https://bootcamp-2022.devtest.ge/api/application',
        {
          ...info,
        },
        headers,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      });

    // setInfo({ token: '23b05ea5-c77a-4096-92c2-d29670f23e0d' });
    setTimeout(() => {
      // console.log(info);
      personalCtx.clearState();
      skillsCtx.clearState();
      covidCtx.clearState();
      insightsCtx.clearState();
      submitCtx.setIsMainPath(true);
    }, 3000);
  }, [submitCtx, info, personalCtx, covidCtx, insightsCtx, skillsCtx]);

  return (
    <div className={classes.mainDiv}>
      <div>
        {' '}
        <Link to="/thank-you">
          {' '}
          <Button timeout={timeout}></Button>
        </Link>
        <Link to="/insights">
          <p>go back</p>
        </Link>
      </div>
    </div>
  );
};
export default Submit;
