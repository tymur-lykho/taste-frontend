import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "../SearchBox/SearchBox.module.css";
import { setFilter } from "../../redux/filters/slice";
import { selectActiveSearchValue } from "../../redux/filters/selectors";

export default function SearchBox() {
  const dispatch = useDispatch();
  const selectedQuery = useSelector(selectActiveSearchValue); // поточний query зі стора
  const [inputValue, setInputValue] = useState(selectedQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Диспатчимо action з redux
    dispatch(setFilter({ key: "query", value: inputValue }));
    setInputValue(""); // якщо хочеш очищати інпут після пошуку
  };

  return (
    <div className={css.heroSection}>
      <div className={css.heroOverlay}>
        <h1 className={css.heroTitle}>
          Plan, Cook, and
          <br />
          Share Your Flavors
        </h1>
        <form onSubmit={handleSubmit} className={css.heroForm}>
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
