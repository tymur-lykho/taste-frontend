import { Outlet } from "react-router-dom";
import NavigationProfile from "../components/NavigationProfile/NavigationProfile";
import Container from "../reuseable/Container/Container";

export default function UserPage() {
  return (
    <Container>
      <NavigationProfile />
        <Outlet />
    </Container>
  );
}
