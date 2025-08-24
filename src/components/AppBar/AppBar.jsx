// import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import css from "./AppBar.module.css";
import MainLogo from "../MainLogo/MainLogo.jsx";

// import UserMenu from "../UserMenu/UserMenu";

export default function AppBar() {
  return (
    <header className={css.header}>
      <MainLogo />
      <Navigation />
    </header>
  );
}
