import NavigationFooter from "../NavigationFooter/NavigationFooter";
import css from "./Footer.module.css";
import Container from "../../reuseable/Container/Container";
import MainLogo from "../MainLogo/MainLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <Container className={css.footerContainer}>
        <MainLogo className={css.link} />
        <p className={css.copyright}>
          &copy; {currentYear} CookingCompanion. All rights reserved.
        </p>
        <NavigationFooter />
      </Container>
    </footer>
  );
}
