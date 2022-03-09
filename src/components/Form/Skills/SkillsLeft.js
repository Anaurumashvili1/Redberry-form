import classes from '../form.module.css';
import PageSwitcher from '../PageSwitcher';
import ellipse from '../../../images/EllipseRed.png';
import lightEllipse from '../../../images/EllipseLight.png';
import { useContext } from 'react';
import { SkillsContext } from '../../../store/formContext';
import minus from '../../../images/Remove.png';
import { SwitcherContext } from '../../../store/switchPageContext';
import { CollectInfoContext } from '../../../store/collectInfoContext';
// import useSubmit from '../../../hooks/use-submit';

const SkillsLeft = () => {
  const ctx = useContext(SkillsContext);
  const switcherCtx = useContext(SwitcherContext);
  const infoCtx = useContext(CollectInfoContext);
  console.log(infoCtx.info);
  const pageValidationClasses = classes.required + ' ' + classes.requiredBottom;

  return (
    <>
      <div className={classes.left}>
        <h2 className={classes.title}>Tell us about your skills</h2>
        <form className={classes.form}>
          <select
            onChange={ctx.titleChanger}
            name="skills"
            id="skills"
            value={ctx.skillTitle}
          >
            <option value="Skills" disabled={true}>
              Skills
            </option>
            {ctx.skills.map((skill) => (
              <option key={skill.id} value={skill.title}>
                {skill.title}
              </option>
            ))}
          </select>
          {ctx.skillIsTouched && ctx.skillTitle === 'Skills' && (
            <p className={classes.required}>*Please Select the skill</p>
          )}

          <input
            value={ctx.years}
            type="number"
            placeholder="Experience Duration in Years"
            min="0.1"
            onChange={ctx.yearChanger}
          />
          {!ctx.yearIsValid && ctx.yearIsTouched && (
            <p className={classes.required}>*Experience duration is required</p>
          )}
          <button onClick={ctx.addLanguage} className={classes.button}>
            Add Programming Language
          </button>
          {ctx.skillsArray.map((skill) => {
            return (
              <div className={classes.skills} key={skill.title}>
                <div className={classes.innerFlex}>
                  <p>{skill.title}</p>
                  <p>
                    Years of Experience: <span>{skill.years}</span>
                  </p>
                </div>
                <img
                  src={minus}
                  alt=""
                  onClick={() => ctx.removeLanguage(skill.title)}
                />
              </div>
            );
          })}
        </form>
        {ctx.pageSubmitted && !ctx.pageIsValid && (
          <p className={pageValidationClasses}>Please add at least 1 skill</p>
        )}
        <PageSwitcher
          previous="/personal"
          next={switcherCtx.covidPageLink}
          click={ctx.submitPage}
          img={ellipse}
          img2={ellipse}
          img3={lightEllipse}
          img4={lightEllipse}
          img5={lightEllipse}
        ></PageSwitcher>
      </div>
    </>
  );
};

export default SkillsLeft;
