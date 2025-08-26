import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button/Button";
import css from "./NotFoundPage.module.css";
import notFoundImg from "../images/not-found.png";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <img src={notFoundImg} alt="Not Found Page" className={css.img} />
      <div className={css.box}>
        <h1 className={css.title}>404</h1>
        <p className={css.text}>Recipe not found</p>
      </div>
      <Button size="large" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </div>
  );
}
