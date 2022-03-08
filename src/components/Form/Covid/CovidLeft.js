import classes from '../form.module.css';
import PageSwitcher from '../PageSwitcher';
import { useState } from 'react';
import ellipse from '../../../EllipseRed.png';
import lightEllipse from '../../../EllipseLight.png';
import { CovidContext } from '../../../store/formContext';
import { useContext } from 'react';
import { SwitcherContext } from '../../../store/switchPageContext';

const formClasses = classes.form + ' ' + classes.formCovid;
const requiredClasses = classes.required + ' ' + classes.requiredRadio;
const requiredClassesForDate =
  classes.required + ' ' + classes.requiredRadio + ' ' + classes.dateRequired;

const CovidLeft = () => {
  const ctx = useContext(CovidContext);
  const switcherCtx = useContext(SwitcherContext);
  console.log(ctx.workType);
  // console.log(ctx.vaccineDateIsValid);

  return (
    <>
      <div className={classes.left}>
        <h2 className={classes.title}>Covid Stuff</h2>
        <div className={formClasses}>
          <div
            className={classes.radio}
            // value={ctx.workType}
            // onChange={ctx.workTypeChanger}
          >
            <label htmlFor="work">How would you prefer to work?</label>
            <div className={classes.inputText}>
              <input
                className={classes.radioInput}
                type="radio"
                id="Office"
                name="work"
                value="from-office"
                checked={ctx.workType === 'from-office'}
                onChange={ctx.workTypeChanger}
              />
              From Sairme Office
            </div>
            <div className={classes.inputText}>
              <input
                className={classes.radioInput}
                type="radio"
                id="Home"
                name="work"
                value="from_home"
                checked={ctx.workType === 'from_home'}
                onChange={ctx.workTypeChanger}
              />
              From Home
            </div>
            <div className={classes.inputText}>
              <input
                className={classes.radioInput}
                type="radio"
                id="Hybrid"
                name="work"
                value="hybrid"
                checked={ctx.workType === 'hybrid'}
                onChange={ctx.workTypeChanger}
              />
              Hybrid
            </div>
          </div>
          {ctx.isSubmitted && !ctx.workTypeIsValid && (
            <p className={requiredClasses}>*Please select an answer</p>
          )}
          <div className={classes.radio} onChange={ctx.hadCovidChanger}>
            <label htmlFor="covid">Did you contact covid 19? :(</label>
            <div className={classes.inputText}>
              {' '}
              <input
                className={classes.radioInput}
                type="radio"
                id="yes"
                name="covid"
                value="yes"
                onChange={ctx.hadCovidChanger}
                checked={ctx.hadCovid === 'yes'}
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
                onChange={ctx.hadCovidChanger}
                checked={ctx.hadCovid === 'no'}
              />
              No
            </div>
          </div>
          {ctx.isSubmitted && !ctx.hadCovidIsValid && (
            <p className={requiredClasses}>*Please select an answer</p>
          )}
          {ctx.hadCovid === 'yes' && (
            <div
              className={classes.dateDiv}
              value={ctx.covidDate}
              onChange={ctx.covidDateChanger}
            >
              <label className={classes.dateLabel} htmlFor="whenCovid">
                When?
              </label>
              <input type="date" defaultValue={ctx.covidDate} />
              {ctx.isSubmitted && !ctx.covidDateIsValid && (
                <p className={requiredClassesForDate}>*Please select date</p>
              )}
            </div>
          )}

          <div className={classes.radio}>
            <label htmlFor="vaccine">Have you been vaccinated?</label>
            <div className={classes.inputText}>
              <input
                className={classes.radioInput}
                type="radio"
                id="yes"
                name="vaccine"
                value="yes"
                onChange={ctx.isVaccinedChanger}
                checked={ctx.isVaccinated === 'yes'}
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
                onChange={ctx.isVaccinedChanger}
                checked={ctx.isVaccinated === 'no'}
              />
              No
            </div>
          </div>
          {ctx.isSubmitted && !ctx.isVaccinatedIsValid && (
            <p className={requiredClasses}>*Please select an answer</p>
          )}
          {ctx.isVaccinated === 'yes' && (
            <div
              className={classes.dateDiv}
              value={ctx.vaccineDate}
              onChange={ctx.vaccineDateChanger}
            >
              <label htmlFor="whenCovid" className={classes.dateLabel}>
                When did you get your last covid vaccine?
              </label>
              <input type="date" defaultValue={ctx.vaccineDate} />
              {ctx.isSubmitted && !ctx.vaccineDateIsValid && (
                <p className={requiredClassesForDate}>*Please select date</p>
              )}
            </div>
          )}
        </div>
        <PageSwitcher
          previous="/skills"
          next={switcherCtx.insightsPageLink}
          click={ctx.submitPage}
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
