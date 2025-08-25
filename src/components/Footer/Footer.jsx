// import css from "./Footer.module.css";

// export default function Footer() {
//   return <footer className={css.footer}></footer>;
// }

import NavigationFooter from "../NavigationFooter/NavigationFooter";
import SvgSprite from "../../SvgSprite/SvgSprite";
import Icon from "../../Icon/Icon";
// import UserMenu from "../UserMenu/UserMenu";
// import AuthNav from "../AuthNav/AuthNav";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Footer.module.css";

export default function Footer() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentYear = new Date().getFullYear();

  // const LogoIcon = () => (
  //   <svg width="32" height="30">
  //     <use href="/sprite.svg#icon-logo" />
  //   </svg>
  // );

  return (
    <div>
      <SvgSprite />

      <footer className={css.footer}>
        <a className={css.link} href="/">
            <Icon name="logo" width={32} height={30} fill="var(--white)" />
            Tasteorama
          </a>
        <p className={css.copyright}>
          &copy; {currentYear} CookingCompanion. All rights reserved.
        </p>
        <NavigationFooter />
        {/* {isLoggedIn ? <UserMenu/> : <AuthNav />} */}
      </footer>
    </div>
  );
}
