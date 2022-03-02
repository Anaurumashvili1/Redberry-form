import classes from "../form.module.css";
import PageSwitcher from "../PageSwitcher";
import ellipse from "../../../EllipseRed.png";
import lightEllipse from "../../../EllipseLight.png";

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
      <PageSwitcher>
        <img src={ellipse} alt="" />
        <img src={lightEllipse} alt="" />
        <img src={lightEllipse} alt="" />
        <img src={lightEllipse} alt="" />
        <img src={lightEllipse} alt="" />
      </PageSwitcher>
    </div>
  );
};

export default PersonalInfoLeft;
