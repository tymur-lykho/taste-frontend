import { Outlet } from "react-router-dom";
import css from "./UserPage.module.css";
import NavigationProfile from "../../components/NavigationProfile/NavigationProfile";
import Container from "../../reuseable/Container/Container";

export default function UserPage() {
  return (
    <section className={css.wrapper}>
      <Container>
        <NavigationProfile />
        <Outlet />
      </Container>
    </section>
  );
}
