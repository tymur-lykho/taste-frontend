import css from "./Time.module.css";
import Icon from "../../reuseable/Icon/Icon";

export default function Time({ time }) {
  return (
    <span className={css["card-time"]}>
      {/* <Icon className={css["time-icon"]} iconName="icon-time" /> */}
      {time}
    </span>
  );
}
