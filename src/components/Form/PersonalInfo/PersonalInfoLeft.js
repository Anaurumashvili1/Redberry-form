import classes from '../form.module.css';
import PageSwitcher from '../PageSwitcher';
import ellipse from '../../../EllipseRed.png';
import lightEllipse from '../../../EllipseLight.png';

const PersonalInfoLeft = () => {
  const h1Classes = classes.title + ' ' + classes.titleFirst;
  return (
    <div className={classes.left}>
      <h2 className={h1Classes}>Hey, Rocketeer, what are your coordinates?</h2>
      <form className={classes.form}>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="+995 5-- --- ---" />
      </form>
      <PageSwitcher
        previous="/"
        next="/skills"
        img={ellipse}
        img2={lightEllipse}
        img3={lightEllipse}
        img4={lightEllipse}
        img4={lightEllipse}
      ></PageSwitcher>
    </div>
  );
};

export default PersonalInfoLeft;
