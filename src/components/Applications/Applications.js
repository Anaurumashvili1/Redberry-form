import classes from './Applications.module.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import ArrowDown from '../../images/VectorDown.png';
import { SkillsContext } from '../../store/formContext';
import SelectedInput from '../../images/selectedInput.png';
import radioInput from '../../images/radiobutton.png';
import date from '../../images/date.png';

// const reducer =  (action,state)=>{
//   return{applicationsArray:[],clicked:[],skillsOutput:[]}
// }

const Applications = () => {
  const [applicationsArray, setApplicationsArray] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [skillsOutput, setSkillsOutput] = useState([]);
  const { skills } = useContext(SkillsContext);

  useEffect(() => {
    axios
      .get(
        'https://bootcamp-2022.devtest.ge/api/applications?token=b3707f03-9a3a-48df-b859-4d61405f427f'
      )
      .then((resp) => {
        setApplicationsArray(resp.data);
        setClicked(resp.data.map((e) => false));
      });
  }, []);

  useEffect(() => {
    if (applicationsArray.length > 0) {
      setSkillsOutput(
        applicationsArray
          .map((app) => app.skills)
          .map((skill) =>
            skill.map((entry) => ({
              ...entry,
              title:
                skills.find((skill) => skill.id === entry.id) !== undefined
                  ? skills.find((skill) => skill.id === entry.id).title
                  : '',
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
                            <p key={skill.id}>{skill.title}</p>
                          ))}
                        </div>
                        <div className={classes.values}>
                          {skillsOutput[index].map((skill) => (
                            <p key={skill.id}>
                              years of experience: {skill.experience}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={classes.covidAndInsights}>
                    <div className={classes.covid}>
                      <h3 className={classes.h3title}>Covid Situation</h3>
                      <div className={classes.covidRadio}>
                        <p>How would you prefer to work?</p>
                        <div>
                          {' '}
                          {applicationsArray[index].work_preference ===
                          'from_office' ? (
                            <img src={SelectedInput} alt="" />
                          ) : (
                            <img src={radioInput} alt="" />
                          )}{' '}
                          From Sairme Office
                        </div>
                        <div>
                          {applicationsArray[index].work_preference ===
                          'from_home' ? (
                            <img src={SelectedInput} alt="" />
                          ) : (
                            <img src={radioInput} alt="" />
                          )}
                          From home
                        </div>
                        <div>
                          {' '}
                          {applicationsArray[index].work_preference ===
                          'hybrid' ? (
                            <img src={SelectedInput} alt="" />
                          ) : (
                            <img src={radioInput} alt="" />
                          )}
                          Hybrid
                        </div>
                      </div>
                      <div className={classes.covidRadio}>
                        <p>Did you have Covid 19?</p>
                        <div>
                          {' '}
                          {applicationsArray[index].had_covid ? (
                            <img src={SelectedInput} alt="" />
                          ) : (
                            <img src={radioInput} alt="" />
                          )}
                          Yes
                        </div>
                        <div>
                          {!applicationsArray[index].had_covid ? (
                            <img src={SelectedInput} alt="" />
                          ) : (
                            <img src={radioInput} alt="" />
                          )}
                          No
                        </div>
                      </div>

                      <div className={classes.covidDate}>
                        <p>When did you have covid 19?</p>
                        <div>
                          {' '}
                          {applicationsArray[index].had_covid_at !== null
                            ? applicationsArray[index].had_covid_at
                            : 'N/A'}
                          <img src={date} alt="" />
                        </div>
                      </div>

                      <div className={classes.covidRadio}>
                        <p>Have you been vaccinated?</p>
                        <div>
                          {' '}
                          {applicationsArray[index].vaccinated ? (
                            <img src={SelectedInput} alt="" />
                          ) : (
                            <img src={radioInput} alt="" />
                          )}
                          Yes
                        </div>
                        <div>
                          {!applicationsArray[index].vaccinated ? (
                            <img src={SelectedInput} alt="" />
                          ) : (
                            <img src={radioInput} alt="" />
                          )}
                          No
                        </div>
                      </div>

                      <div className={classes.covidDate}>
                        <p>When did you get covid vaccine?</p>
                        <div>
                          {' '}
                          {applicationsArray[index].vaccinated_at !== null
                            ? applicationsArray[index].vaccinated_at
                            : 'N/A'}
                          <img src={date} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className={classes.insights}>
                      <h3 className={classes.h3title}>Insigts</h3>
                      <div className={classes.covidRadio}>
                        <p>
                          Would you attend Devtalks and maybe also organize your
                          own?
                        </p>
                        <div>
                          {' '}
                          {applicationsArray[index].will_organize_devtalk ? (
                            <img src={SelectedInput} alt="" />
                          ) : (
                            <img src={radioInput} alt="" />
                          )}
                          Yes
                        </div>
                        <div>
                          {!applicationsArray[index].will_organize_devtalk ? (
                            <img src={SelectedInput} alt="" />
                          ) : (
                            <img src={radioInput} alt="" />
                          )}
                          No
                        </div>
                      </div>

                      <div className={classes.textArea}>
                        <p>What would you speak about at Devtalk?</p>
                        <div className={classes.bigTextarea}>
                          {applicationsArray[index].devtalk_topic}
                        </div>
                      </div>
                      <div className={classes.textArea}>
                        <p>Tell us somthing special</p>
                        <div className={classes.smallTextArea}>
                          {applicationsArray[index].something_special}
                        </div>
                      </div>
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
