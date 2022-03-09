import classes from './PageSwitcher.module.css';
import previous from '../../images/Previous.png';
import next from '../../images/Next.png';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { SwitcherContext } from '../../store/switchPageContext';
import {
  SkillsContext,
  PersonalInfoContext,
  CovidContext,
  InsightsContext,
} from '../../store/formContext';

const PageSwitcher = (props) => {
  const switcherCtx = useContext(SwitcherContext);
  const skillsCtx = useContext(SkillsContext);
  const personalCtx = useContext(PersonalInfoContext);
  const covidCtx = useContext(CovidContext);
  const insightsCtx = useContext(InsightsContext);
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
        <Link to={switcherCtx.skillsPageLink} onClick={personalCtx.submitPage}>
          <img src={props.img2} alt="" />
        </Link>

        <Link to={switcherCtx.covidPageLink} onClick={skillsCtx.submitPage}>
          {' '}
          <img src={props.img3} alt="" />
        </Link>
        <Link to={switcherCtx.insightsPageLink} onClick={covidCtx.submitPage}>
          {' '}
          <img src={props.img4} alt="" />
        </Link>
        <Link to={switcherCtx.submitPageLink} onClick={insightsCtx.submitPage}>
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
