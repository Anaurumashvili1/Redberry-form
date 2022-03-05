import classes from '../form.module.css';
import PageSwitcher from '../PageSwitcher';
import ellipse from '../../../EllipseRed.png';
import lightEllipse from '../../../EllipseLight.png';
import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import minus from '../../../Remove.png';

const SkillsLeft = () => {
  const [skills, setSkills] = useState([]);

  const [years, setYears] = useState('');
  const [title, setTitle] = useState('Skills');
  const [skillsArray, setSkillsArray] = useState([]);
  const [removedList, setRemovedList] = useState([]);
  const [skillIsValid, setSkillIsValid] = useState(true);
  const [skillsSelected, setSkillsSelected] = useState(true);

  useEffect(() => {
    axios
      .get('https://bootcamp-2022.devtest.ge/api/skills')
      .then((response) => {
        setSkills(response.data);
      });
  }, []);

  const addLanguage = (e) => {
    e.preventDefault();
    if (skills.length > 0 && years !== '' && title !== 'Skills') {
      const skillsObj = { title, years };

      setSkillsArray([...skillsArray, skillsObj]);

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
    } else if (years === '' && title === 'Skills') {
      setSkillIsValid(false);
      setSkillsSelected(false);
    } else if (years === '') {
      setSkillIsValid(false);
    } else if (title === 'Skills') {
      setSkillsSelected(false);
    }

    setTitle('Skills');
    setYears('');
  };

  console.log(title);

  const removeLanguage = (title) => {
    const fromRemoved = removedList.filter(
      (skill) => skill[0].title === title
    )[0][0];
    const toRemove = skillsArray.find(
      (skill) => skill.title === fromRemoved.title
    );

    setSkillsArray(skillsArray.filter((skill) => skill !== toRemove));
    setSkills([...skills, fromRemoved]);
  };
  console.log(skillIsValid);
  return (
    <>
      <div className={classes.left}>
        <h2 className={classes.title}>Tell us about your skills</h2>
        <form className={classes.form}>
          <select
            onChange={(e) => setTitle(e.target.value)}
            name="skills"
            id="skills"
            value={title}
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
          {!skillsSelected && (
            <p className={classes.required}>*Please Select the skill</p>
          )}

          <input
            value={years}
            type="number"
            placeholder="Experience Duration in Years"
            min="0.1"
            onChange={(e) => setYears(e.target.value)}
          />
          {!skillIsValid && (
            <p className={classes.required}>*Experience duration is required</p>
          )}
          <button onClick={addLanguage} className={classes.button}>
            Add Programming Language
          </button>
          {skillsArray.map((skill) => {
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
          img4={lightEllipse}
        ></PageSwitcher>
      </div>
    </>
  );
};

export default SkillsLeft;
