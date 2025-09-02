import { useDispatch } from 'react-redux';
import css from "./ResetFilter.module.css";
import { resetFilter } from '../../../redux/filters/slice';
import { Link } from 'react-router-dom';

const ResetFiltersLink = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetFilter());
  };

  return (
    <Link to="/" onClick={handleReset} className={css.resetLink} >Reset filters</Link>
  );
};

export default ResetFiltersLink;
