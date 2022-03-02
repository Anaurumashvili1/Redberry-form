import classes from "./Main.module.css";
import Button from "./Button";
import rocketman from "../../rocketman.png";

const Main = () => {
  return (
    <div className={classes.stars}>
      <h1 className={classes.h1Red}>Welcome Rocketeer !</h1>
      <Button></Button>
      <p className={classes.applicationsP}>Submitted Applications</p>
      <img className={classes.rocketman} src={rocketman} alt="" />
    </div>
  );
};

export default Main;
