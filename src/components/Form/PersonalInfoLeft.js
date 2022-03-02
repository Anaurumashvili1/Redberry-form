import classes from "./form.module.css";

const PersonalInfoLeft = () => {
  return (
    <div className={classes.left}>
      <h2 className={classes.title}>
        Hey, Rocketeer, what are your coordinates?
      </h2>
      <form className={classes.form}>
        <input type="text" placeHolder="First Name" />
        <input type="text" placeHolder="Last Name" />
        <input type="email" placeHolder="Email" />
        <input type="text" placeHolder="+995 5-- --- ---" />
      </form>
    </div>
  );
};

export default PersonalInfoLeft;
