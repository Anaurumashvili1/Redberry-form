import classes from "./form.module.css";

const FormWrapper = (props) => {
  return <div className={classes.wrapper}>{props.children}</div>;
};

export default FormWrapper;
