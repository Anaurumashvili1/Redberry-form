import classes from './Submit.module.css';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useCallback, useState, useContext } from 'react';
import { CollectInfoContext } from '../../store/collectInfoContext';
import { SubmitContext } from '../../store/submitContext';
import axios from 'axios';

const Submit = (props) => {
  const { info, setInfo } = useContext(CollectInfoContext);
  const submitCtx = useContext(SubmitContext);

  const timeout = useCallback(() => {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
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
      .then((res) => console.log(res));
    // setInfo({ token: '23b05ea5-c77a-4096-92c2-d29670f23e0d' });
    setTimeout(() => {
      console.log(info);

      submitCtx.setIsMainPath(true);
    }, 3000);
  }, [submitCtx, info]);

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
