import classes from '../form.module.css';
import PageSwitcher from '../PageSwitcher';
import ellipse from '../../../EllipseRed.png';
import lightEllipse from '../../../EllipseLight.png';
import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import minus from '../../../Remove.png';

const skillsYearsReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.payload,
      isValid: action.payload !== '',
      isTouched: true,
    };
  }
  if (action.type === 'ERROR') {
    return { value: state.value, isValid: false, isTouched: true };
  }
  if (action.type === 'CLEAR') {
    return { value: '', isValid: true, isTouched: false };
  }
  return { value: '', isValid: false, isTouched: false };
};

const skillsTitleReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.payload,
      isSelected: true,
      isTouched: true,
    };
  }
  if (action.type === 'ERROR') {
    return { value: state.value, isSelected: false, isTouched: true };
  }

  if (action.type === 'CLEAR') {
    return { value: 'Skills', isSelected: false, isTouched: false };
  }
  return { value: 'Skills', isSelected: false, isTouched: false };
};

const skillsValidityReducer = (state, action) => {
  if (action.type === 'ADD') {
    return {
      skillsPageIsValid: state.skillsArray.length + 1 > 0,
      skillsArray: [...state.skillsArray, action.payload],
    };
  }
  if (action.type === 'REMOVE') {
    return {
      skillsArray: state.skillsArray.filter(
        (skill) => skill !== action.payload
      ),
      skillsPageIsValid: state.skillsArray.length - 1 > 0,
    };
  }
  return { skillsPageIsValid: false, skillsArray: [] };
};

const SkillsLeft = () => {
  const [skills, setSkills] = useState([]);

  const [titleState, dispatchTitle] = useReducer(skillsTitleReducer, {
    value: 'Skills',
    isSelected: false,
    isTouched: false,
  });

  const [yearState, dispatchYear] = useReducer(skillsYearsReducer, {
    value: '',
    isValid: false,
    isTouched: false,
  });

  const [skillsValidityState, dispatchSkillsValidity] = useReducer(
    skillsValidityReducer,
    { skillsPageIsValid: false, skillsArray: [] }
  );
  // const [skillsArray, setSkillsArray] = useState([]);
  const [removedList, setRemovedList] = useState([]);

  // const [skillsPageIsValid, setSkillsPageIsValid] = useState(false);
  useEffect(() => {
    axios
      .get('https://bootcamp-2022.devtest.ge/api/skills')
      .then((response) => {
        setSkills(response.data);
      });
  }, []);

  const addLanguage = (e) => {
    e.preventDefault();
    if (
      skills.length > 0 &&
      yearState.value !== '' &&
      titleState.value !== 'Skills'
    ) {
      const skillsObj = { title: titleState.value, years: yearState.value };

      dispatchSkillsValidity({ type: 'ADD', payload: skillsObj });

      const editedSkills = [...skills];
      const removed = editedSkills.splice(
        editedSkills.indexOf(
          editedSkills.find((skill) => skill.title === skillsObj.title)
        ),
        1
      );
      const removedObjects = removedList.slice();
      setRemovedList([...removedObjects, removed]);
      setSkills(editedSkills);
      dispatchTitle({ type: 'CLEAR' });
      dispatchYear({ type: 'CLEAR' });
    } else if (!yearState.value && titleState.value === 'Skills') {
      console.log('?');
      dispatchYear({ type: 'ERROR' });
      dispatchTitle({ type: 'ERROR' });
    } else if (!yearState.isValid) {
      dispatchYear({ type: 'ERROR' });
    } else if (!titleState.value === 'Skills') {
      dispatchTitle({ type: 'ERROR' });
    }
  };

  const removeLanguage = (title) => {
    const fromRemoved = removedList.filter(
      (skill) => skill[0].title === title
    )[0][0];
    const toRemove = skillsValidityState.skillsArray.find(
      (skill) => skill.title === fromRemoved.title
    );

    dispatchSkillsValidity({
      type: 'REMOVE',
      payload: toRemove,
    });
  };
  const yearChanger = (e) => {
    dispatchYear({ type: 'USER_INPUT', payload: e.target.value });
  };

  const titleChanger = (e) => {
    dispatchTitle({ type: 'USER_INPUT', payload: e.target.value });
  };
  return (
    <>
      <div className={classes.left}>
        <h2 className={classes.title}>Tell us about your skills</h2>
        <form className={classes.form}>
          <select
            onChange={titleChanger}
            name="skills"
            id="skills"
            value={titleState.value}
          >
            <option value="Skills" disabled={true}>
              Skills
            </option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.title}>
                {skill.title}
              </option>
            ))}
          </select>
          {titleState.isTouched && titleState.value === 'Skills' && (
            <p className={classes.required}>*Please Select the skill</p>
          )}

          <input
            value={yearState.value}
            type="number"
            placeholder="Experience Duration in Years"
            min="0.1"
            onChange={yearChanger}
          />
          {!yearState.isValid && yearState.isTouched && (
            <p className={classes.required}>*Experience duration is required</p>
          )}
          <button onClick={addLanguage} className={classes.button}>
            Add Programming Language
          </button>
          {skillsValidityState.skillsArray.map((skill) => {
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
                  onClick={() => removeLanguage(skill.title)}
                />
              </div>
            );
          })}
        </form>
        <PageSwitcher
          previous="/personal"
          next="/covid"
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
