import classes from './Applications.module.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import ArrowDown from '../../VectorDown.png';
import { SkillsContext } from '../../store/formContext';

const Applications = () => {
  const [applicationsArray, setApplicationsArray] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [skillsOutput, setSkillsOutput] = useState([]);
  const { skills } = useContext(SkillsContext);

  console.log(skillsOutput);
  console.log(applicationsArray);

  //   skills;

  useEffect(() => {
    axios
      .get(
        'https://bootcamp-2022.devtest.ge/api/applications?token=23b05ea5-c77a-4096-92c2-d29670f23e0d'
      )
      .then((resp) => {
        setApplicationsArray(resp.data);
        setClicked(resp.data.map((e) => false));
      });
  }, []);

  useEffect(() => {
    const mappedSkills = applicationsArray.map((app) => app.skills);
    console.log(mappedSkills);
    if (mappedSkills.length > 0 && skills.length > 0) {
      setSkillsOutput(
        mappedSkills.map((skill) =>
          skill.map((entry) => ({
            ...entry,
            title: skills.find((skill) => skill.id === entry.id).title,
          }))
        )
      );
    }
  }, [skills, applicationsArray]);

  const handleClick = (value, index) => {
    let clickedCopy = clicked.slice();
    clickedCopy[index] = !clickedCopy[index];
    setClicked(clickedCopy);
  };

  return (
    <>
      <div className={classes.main}>
        <h1 className={classes.title}>Submitted Applications</h1>
        <div className={classes.applications}>
          {applicationsArray.map((obj, index) => (
            <div key={index} className={classes.application}>
              {!clicked[index] ? (
                <div
                  className={classes.applicationHead}
                  onClick={() => handleClick(obj, index)}
                >
                  {index + 1}
                  <img src={ArrowDown} alt="" />
                </div>
              ) : (
                <div
                  className={
                    classes.applicationHeadAltered +
                    ' ' +
                    classes.applicationHead
                  }
                  onClick={() => handleClick(obj, index)}
                >
                  {index + 1}
                  <img src={ArrowDown} alt="" />
                </div>
              )}
              {clicked[index] && (
                <div className={classes.applicationBody} key={index}>
                  <div className={classes.personalInfoAndSkills}>
                    <div className={classes.personal}>
                      <h3 className={classes.h3title}>Personal Information</h3>
                      <div className={classes.personalInfo}>
                        <div className={classes.keys}>
                          <p>First Name</p>
                          <p>Last Name</p>
                          <p>E-mail</p>
                          <p>Phone</p>
                        </div>
                        <div className={classes.values}>
                          <p>{applicationsArray[index].first_name}</p>
                          <p>{applicationsArray[index].last_name}</p>
                          <p>{applicationsArray[index].email}</p>
                          <p>{applicationsArray[index].phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className={classes.skills}>
                      <h3 className={classes.h3title}>Skillset</h3>
                      <div className={classes.skillsInfo}>
                        <div className={classes.keys}>
                          {skillsOutput[index].map((skill) => (
                            <p>{skill.title}</p>
                          ))}
                        </div>
                        <div className={classes.values}>
                          {skillsOutput[index].map((skill) => (
                            <p>years of experience: {skill.experience}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={classes.covidAndInsights}>
                    <div className={classes.covid}>
                      <h3 className={classes.h3title}>Covid Situation</h3>
                      <div className={classes.covidRadio}>
                        <label htmlFor="covid">
                          how would you prefer to work?
                        </label>
                        <div>
                          {' '}
                          <input type="radio" name="covid" id="from_office" />
                          From Sairme Office
                        </div>
                        <div>
                          <input
                            className={classes.radio}
                            type="radio"
                            name="covid"
                            id="from_home"
                            disabled={true}
                          />
                          From Home
                        </div>
                        <div>
                          {' '}
                          <input
                            type="radio"
                            name="covid"
                            id="hybrid"
                            checked={true}
                          />
                          Hybrid
                        </div>
                      </div>
                    </div>
                    <div className={classes.insights}>
                      <h3 className={classes.h3title}>Insigts</h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Applications;
