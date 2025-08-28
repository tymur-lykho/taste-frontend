import { useState } from "react";
import { useSelector } from "react-redux";
import css from "../SearchBox/SearchBox.module.css";
import { selectActiveSearchValue } from "../../redux/filters/selectors.js";

export default function SearchBox() {
  //   const dispatch = useDispatch();
  const selectSearch = useSelector(selectActiveSearchValue);
  const [inputValue, setInputValue] = useState(selectSearch);

  //   const handleChange = () => {
  //     dispatch(selectSearch);
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     handleSearch();
  //   };

  return (
    <div className={css.heroSection}>
      <div className={css.heroOverlay}>
        <h1 className={css.heroTitle}>
          Plan, Cook, and
          <br />
          Share Your Flavors
        </h1>
        <form className={css.heroForm}>
          <input
            type="text"
            placeholder="Search recipes"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={css.heroInput}
          />
          <button type="submit" className={css.heroButton}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
