import { useDispatch } from "react-redux";
import css from "./ResetFilter.module.css";
import { resetFilter } from "../../../redux/filters/slice";

const ResetFiltersLink = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetFilter());
  };

  return (
    <button onClick={handleReset} className={css.resetLink}>
      Reset filters
    </button>
  );
};

export default ResetFiltersLink;
