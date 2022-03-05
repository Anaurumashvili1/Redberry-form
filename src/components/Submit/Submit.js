import classes from './Submit.module.css';
import Button from './Button';
import { Link } from 'react-router-dom';
const Submit = () => {
  return (
    <div className={classes.mainDiv}>
      <div>
        {' '}
        <Link to="/thank-you">
          {' '}
          <Button></Button>
        </Link>
        <Link to="/insights">
          <p>go back</p>
        </Link>
      </div>
    </div>
  );
};
export default Submit;
