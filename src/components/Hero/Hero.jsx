import SearchBox from "../SearchBox/SearchBox";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className="container">
        <h1>Plan, Cook, and Share Your Flavors</h1>
        <SearchBox />
      </div>
    </section>
  );
}
