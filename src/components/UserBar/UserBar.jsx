import { Link } from "react-router-dom";
import css from "./UserBar.module.css";
export default function UserBar() {
  return (
    <nav className={css.userBar}>
      <Link to="/profile" className={css.link}>
        My Recipes
      </Link>
      <Link to="/favorites" className={css.link}>
        Saved Recipes
      </Link>
    </nav>
  );
}
