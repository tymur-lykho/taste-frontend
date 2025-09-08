import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { setSearch } from "../../redux/filters/slice";
import { selectSearch } from "../../redux/filters/selectors";

import css from "../SearchBox/SearchBox.module.css";
import Container from "../../reuseable/Container/Container";

export default function SearchBox() {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectSearch);

  const [titleInput, setTitleInput] = useState(nameFilter || "");

  useEffect(() => setTitleInput(nameFilter || ""), [nameFilter]);

  const isValidText = (value) => /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]*$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = titleInput.trim();

    if (!value) {
      toast.error("Please enter a recipe name", { id: "search-error" });
      return;
    }
    if (value.length < 3) {
      toast.error("Recipe name must be at least 3 characters", {
        id: "search-error",
      });
      return;
    }
    if (!isValidText(value)) {
      toast.error("Only letters are allowed", { id: "search-error" });
      return;
    }

    dispatch(setSearch(titleInput));
    toast.success("Search submitted!", { id: "search-success" });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTitleInput(value);
    if (!isValidText(value)) {
      toast.error("Only letters are allowed", { id: "search-error" });
    }
  };

  return (
    <div className={css.heroSection}>
      <Container>
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
              {titleInput && (
                <button
                  type="button"
                  className={css.clearButton}
                  onClick={() => {
                    dispatch(setSearch(""));
                    setTitleInput("");
                    toast.success("Search cleared!", { id: "clear-success" });
                  }}
                  aria-label="Clear search"
                  title="Clear search"
                >
                  &times;
                </button>
              )}
            </div>
            <button type="submit" className={css.heroButton}>
              Search
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
