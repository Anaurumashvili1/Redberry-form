import classes from '../form.module.css';
import PageSwitcher from '../PageSwitcher';
import ellipse from '../../../EllipseRed.png';
import lightEllipse from '../../../EllipseLight.png';
import { useContext } from 'react';
import { InsightsContext } from '../../../store/formContext';
import { SwitcherContext } from '../../../store/switchPageContext';

const InsightsLeft = () => {
  const ctx = useContext(InsightsContext);

  const switcherCtx = useContext(SwitcherContext);

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
                onChange={ctx.changeWillOrganize}
                checked={ctx.will_organize_devtalk === 'yes'}
              />
              Yes
            </div>
            <div className={classes.inputText}>
              <input
                type="radio"
                name="whatAbout"
                className={classes.radioInput}
                value="no"
                onChange={ctx.changeWillOrganize}
                checked={ctx.will_organize_devtalk === 'no'}
              />
              No
            </div>
          </div>
          {ctx.will_organize_devtalk === 'yes' && (
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
                onChange={ctx.changeTopic}
                value={ctx.devtalk_topic}
              ></textarea>
            </div>
          )}

          <div>
            <label htmlFor="you" className={classes.devTalksLabel}>
              What would you speak about at Devtalk?
            </label>
            <textarea
              name="you"
              id="you"
              placeholder="I..."
              onChange={ctx.changeSpecial}
              value={ctx.something_special}
            ></textarea>
          </div>
        </form>
        <PageSwitcher
          previous="/covid"
          next={switcherCtx.submitPageLink}
          click={ctx.submitPage}
          img={ellipse}
          img2={ellipse}
          img3={ellipse}
          img4={ellipse}
          img5={lightEllipse}
        ></PageSwitcher>
      </div>
    </>
  );
};
export default InsightsLeft;
