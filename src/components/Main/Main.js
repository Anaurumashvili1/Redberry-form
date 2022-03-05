import classes from './Main.module.css';
import Button from './Button';
import rocketman from '../../rocketman.png';
import { Link } from 'react-router-dom';
import FormMain from '../Form/FormMain';
const Main = () => {
  return (
    <div className={classes.stars}>
      <h1 className={classes.h1Red}>Welcome Rocketeer !</h1>
      <Link to="/personal">
        <Button></Button>
      </Link>
      <Link to="/applications">
        {' '}
        <p className={classes.applicationsP}>Submitted Applications</p>
      </Link>
      <img className={classes.rocketman} src={rocketman} alt="" />
    </div>
  );
};

export default Main;
