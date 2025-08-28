import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import css from "./RegistrationPage.module.css";
import Container from "../reuseable/Container/Container";

export default function RegistrationPage() {
  return (
    <Container className={css.containerRegister}>
      <RegistrationForm />
    </Container>
  );
}
