import classes from './Submit.module.css';

const Button = (props) => {
  return (
    <>
      <button onClick={props.timeout} className={classes.button}>
        Submit
      </button>
    </>
  );
};

export default Button;
