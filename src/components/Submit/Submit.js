import classes from './Submit.module.css';
import Button from './Button';
import { Link } from 'react-router-dom';

const Submit = (props) => {
  return (
    <div className={classes.mainDiv}>
      <div>
        {' '}
        <Link to="/thank-you">
          {' '}
          <Button timeout={props.timeout}></Button>
        </Link>
        <Link to="/insights">
          <p>go back</p>
        </Link>
      </div>
    </div>
  );
};
export default Submit;
