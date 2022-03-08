import classes from './PageSwitcher.module.css';
import previous from '../../Previous.png';
import next from '../../Next.png';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { SwitcherContext } from '../../store/switchPageContext';
import { SkillsContext, PersonalInfoContext } from '../../store/formContext';

const PageSwitcher = (props) => {
  const switcherCtx = useContext(SwitcherContext);
  const skillsCtx = useContext(SkillsContext);
  const personalCtx = useContext(PersonalInfoContext);

  return (
    <>
      <div className={classes.switcherWrapper}>
        <Link to={props.previous}>
          {' '}
          <img src={previous} alt="" />
        </Link>
        <Link to="/personal">
          <img src={props.img} alt="" />
        </Link>
        <Link
          to={switcherCtx.skillsPageLink}
          onClick={personalCtx.personalContext.submitPage}
        >
          <img src={props.img2} alt="" />
        </Link>

        <Link
          to={switcherCtx.covidPageLink}
          onClick={skillsCtx.skillsContext.submitPage}
        >
          {' '}
          <img src={props.img3} alt="" />
        </Link>
        <Link to="/insights">
          {' '}
          <img src={props.img4} alt="" />
        </Link>
        <Link to="/submit">
          {' '}
          <img src={props.img5} alt="" />
        </Link>

        <Link to={props.next}>
          {' '}
          <img src={next} onClick={props.click} alt="" />
        </Link>
      </div>
    </>
  );
};

export default PageSwitcher;
