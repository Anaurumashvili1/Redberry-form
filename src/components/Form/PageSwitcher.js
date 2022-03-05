import classes from './PageSwitcher.module.css';
import previous from '../../Previous.png';
import next from '../../Next.png';
import { Link } from 'react-router-dom';

const PageSwitcher = (props) => {
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
        <Link to="/skills">
          <img src={props.img2} alt="" />
        </Link>
        <Link to="/covid">
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
          <img src={next} alt="" />
        </Link>
      </div>
    </>
  );
};

export default PageSwitcher;
