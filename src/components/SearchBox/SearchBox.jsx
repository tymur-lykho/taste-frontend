import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "../SearchBox/SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);

  const [titleInput, setTitleInput] = useState(nameFilter);

  useEffect(() => setTitleInput(nameFilter), [nameFilter]);

  const isValidText = (value) => /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]*$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = titleInput.trim();

    if (!value) {
      toast.error("Please enter a recipe name");
      return;
    }
    if (value.length < 3) {
      toast.error("Recipe name must be at least 3 characters");
      return;
    }
    if (!isValidText(value)) {
      toast.error("Only letters are allowed");
      return;
    }

    dispatch(setFilter({ key: "name", value: titleInput }));
    toast.success("Search submitted!");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTitleInput(value);

    if (!isValidText(value)) {
      toast.error("Only letters are allowed");
    }
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
          <div className={css.inputGroup}>
            <input
              type="text"
              placeholder="Search recipes"
              value={titleInput}
              onChange={handleChange}
              className={css.heroInput}
            />
          </div>
          <button type="submit" className={css.heroButton}>
            Search
          </button>
        </form>
        {/* Компонент тостов */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
