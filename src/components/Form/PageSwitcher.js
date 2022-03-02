import classes from "./PageSwitcher.module.css";
import previous from "../../Previous.png";
import next from "../../Next.png";

const PageSwitcher = (props) => {
  return (
    <>
      <div className={classes.switcherWrapper}>
        <img src={previous} alt="" />
        {props.children}
        <img src={next} alt="" />
      </div>
    </>
  );
};

export default PageSwitcher;
