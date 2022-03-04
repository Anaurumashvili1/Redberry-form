import classes from '../form.module.css';
import PageSwitcher from '../PageSwitcher';
import { useState } from 'react';
import ellipse from '../../../EllipseRed.png';
import lightEllipse from '../../../EllipseLight.png';

const InsightsLeft = () => {
  return (
    <>
      <div className={classes.left}>
        <h2 className={classes.title}>What about you?</h2>
        <form className={classes.form}>
          <div>
            <label htmlFor="whatAbout">
              Would you attend Devtalks and maybe also organize your own?
            </label>
            <div className={classes.inputText}>
              <input
                type="radio"
                name="whatAbout"
                className={classes.radioInput}
                value="yes"
              />
              Yes
            </div>
            <div className={classes.inputText}>
              <input
                type="radio"
                name="whatAbout"
                className={classes.radioInput}
                value="no"
              />
              No
            </div>
          </div>

          <div>
            <label htmlFor="devTalks" className={classes.devTalksLabel}>
              What would you speak about at Devtalk?
            </label>
            <textarea
              name="devTalks"
              id="devTalks"
              cols="36"
              rows="4"
              placeholder="I would..."
            ></textarea>
          </div>
          <div>
            <label htmlFor="you" className={classes.devTalksLabel}>
              What would you speak about at Devtalk?
            </label>
            <textarea name="you" id="you" placeholder="I..."></textarea>
          </div>
        </form>
        <PageSwitcher></PageSwitcher>
      </div>
    </>
  );
};
export default InsightsLeft;
