import classes from '../form.module.css';
import PageSwitcher from '../PageSwitcher';
import { useState } from 'react';
import ellipse from '../../../EllipseRed.png';
import lightEllipse from '../../../EllipseLight.png';

const formClasses = classes.form + ' ' + classes.formCovid;

const CovidLeft = () => {
  const [covidAnswer, setCovidAnswer] = useState('');
  const [vaccineAnswer, setVaccineAnswer] = useState('');
  return (
    <>
      <div className={classes.left}>
        <h2 className={classes.title}>Covid Stuff</h2>
        <div className={formClasses}>
          <div
            className={classes.radio}
            onChange={(e) => console.log(e.target.value)}
          >
            <label htmlFor="work">How would you prefer to work?</label>
            <div className={classes.inputText}>
              <input
                className={classes.radioInput}
                type="radio"
                id="Office"
                name="work"
                value="Office"
              />
              From Sairme Office
            </div>
            <div className={classes.inputText}>
              <input
                className={classes.radioInput}
                type="radio"
                id="Home"
                name="work"
                value="Home"
              />
              From Home
            </div>
            <div className={classes.inputText}>
              <input
                className={classes.radioInput}
                type="radio"
                id="Hybrid"
                name="work"
                value="Hybrid"
              />
              Hybrid
            </div>
          </div>
          <div
            className={classes.radio}
            onChange={(e) => setCovidAnswer(e.target.value)}
          >
            <label htmlFor="covid">Did you contact covid 19? :(</label>
            <div className={classes.inputText}>
              {' '}
              <input
                className={classes.radioInput}
                type="radio"
                id="yes"
                name="covid"
                value="yes"
              />
              Yes
            </div>
            <div className={classes.inputText}>
              <input
                className={classes.radioInput}
                type="radio"
                id="no"
                name="covid"
                value="no"
              />
              No
            </div>
          </div>
          {covidAnswer === 'yes' && (
            <div className={classes.dateDiv}>
              <label className={classes.dateLabel} htmlFor="whenCovid">
                When?
              </label>
              <input type="date" />
            </div>
          )}

          <div
            className={classes.radio}
            onChange={(e) => setVaccineAnswer(e.target.value)}
          >
            <label htmlFor="vaccine">Have you been vaccinated?</label>
            <div className={classes.inputText}>
              <input
                className={classes.radioInput}
                type="radio"
                id="yes"
                name="vaccine"
                value="yes"
              />
              Yes
            </div>
            <div className={classes.inputText}>
              <input
                className={classes.radioInput}
                type="radio"
                id="no"
                name="vaccine"
                value="no"
              />
              No
            </div>
          </div>
          {vaccineAnswer === 'yes' && (
            <div className={classes.dateDiv}>
              <label htmlFor="whenCovid" className={classes.dateLabel}>
                When did you get your last covid vaccine?
              </label>
              <input type="date" />
            </div>
          )}
        </div>
        <PageSwitcher
          previous="/skills"
          next="/insights"
          img={ellipse}
          img2={ellipse}
          img3={ellipse}
          img4={lightEllipse}
          img5={lightEllipse}
        ></PageSwitcher>
      </div>
    </>
  );
};

export default CovidLeft;
