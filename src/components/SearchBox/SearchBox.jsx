import { Button } from "../Button/Button";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  return (
    <div className={css.search}>
      <input
        className={css.input}
        type="text"
        name="search"
        placeholder="Search recipes"
        title="Search recipes"
        aria-label="Search recipes"
      />
      <Button color="fill" width="329px" height="46px">
        Search
      </Button>
    </div>
  );
}
