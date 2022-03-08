import classes from '../form.module.css';
import PageSwitcher from '../PageSwitcher';
import ellipse from '../../../EllipseRed.png';
import lightEllipse from '../../../EllipseLight.png';
import { useContext } from 'react';
import { PersonalInfoContext } from '../../../store/formContext';
import { SwitcherContext } from '../../../store/switchPageContext';

const PersonalInfoLeft = () => {
  const context = useContext(PersonalInfoContext);
  const ctx = context.personalContext;
  const switcherCtx = useContext(SwitcherContext);

  const h1Classes = classes.title + ' ' + classes.titleFirst;
  return (
    <div className={classes.left}>
      <h2 className={h1Classes}>Hey, Rocketeer, what are your coordinates?</h2>
      <form className={classes.form}>
        <input
          type="text"
          placeholder="First Name"
          value={ctx.first_name}
          onChange={ctx.changeFirstName}
          onBlur={ctx.firstNameBlur}
        />
        {!ctx.firstNameIsValid && ctx.firstNameIsTouched && (
          <p className={classes.required}>
            First name has to include at least 2 symbols
          </p>
        )}
        <input
          type="text"
          placeholder="Last Name"
          value={ctx.last_name}
          onChange={ctx.changeLastName}
          onBlur={ctx.lastNameBlur}
        />
        {!ctx.lastNameIsValid && ctx.lastNameIsTouched && (
          <p className={classes.required}>
            Last name has to include at least 2 symbols
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={ctx.email}
          onChange={ctx.changeEmail}
          onBlur={ctx.emailBlur}
        />
        {!ctx.emailIsValid && ctx.emailIsTouched && (
          <p className={classes.required}>please enter valid email address</p>
        )}
        <input
          type="text"
          placeholder="+995 5-- --- ---"
          value={ctx.phone}
          onChange={ctx.changePhone}
          onBlur={ctx.phoneBlur}
        />
        {!ctx.phoneNumberIsValid && (
          <p className={classes.required}>please enter valid phone number</p>
        )}
      </form>
      <PageSwitcher
        previous="/"
        next={switcherCtx.skillsPageLink}
        click={ctx.submitPage}
        img={ellipse}
        img2={lightEllipse}
        img3={lightEllipse}
        img4={lightEllipse}
        img5={lightEllipse}
      ></PageSwitcher>
    </div>
  );
};

export default PersonalInfoLeft;
