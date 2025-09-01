import css from "./NotFoundPage.module.css";
import notFoundImg from "/images/not-found.png";
import Container from "../reuseable/Container/Container";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";

export default function NotFoundPage() {
  return (
    <Container>
      <div className={css.container}>
        <img src={notFoundImg} alt="Not Found Page" className={css.img} />
        <div className={css.box}>
          <p className={css.title}>404</p>
          <h1 className={css.text}>Recipe not found</h1>
        </div>
        <Link to="/" className={css.link}>
          <Icon name="left-short" width={11} height={10} />
          Back to Home
        </Link>
      </div>
    </Container>
  );
}
