import classes from './Submit.module.css';
import Button from './Button';
const Submit = () => {
  return (
    <div className={classes.mainDiv}>
      <div>
        {' '}
        <Button></Button>
        <p>go back</p>
      </div>
    </div>
  );
};
export default Submit;
