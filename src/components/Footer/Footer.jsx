import { Link } from "react-router-dom";
import Icon from "../../Icon/Icon";

import Container from "../../reuseable/Container/Container";
import NavigationFooter from "../NavigationFooter/NavigationFooter";

import css from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <Container>
        <Link className={css.link} href="/">
          <Icon name="logo" width={32} height={30} />
          Tasteorama
        </Link>
        <p className={css.copyright}>
          &copy; {currentYear} CookingCompanion. All rights reserved.
        </p>
        <NavigationFooter />
      </Container>
    </footer>
  );
}
