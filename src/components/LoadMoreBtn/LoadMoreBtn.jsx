import PropTypes from "prop-types";
import s from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick, disabled = false, isLoading = false }) {
  return (
    <button
      type="button"
      className={s.btn}    
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Loading..." : "Load More"}
    </button>
  );
}

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  fullWidth: PropTypes.bool,
};