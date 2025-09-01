import Hero from "../components/Hero/Hero";
import SectionRecipes from "../components/SectionRecipes/SectionRecipes";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div>
      {/* <Hero /> */}
      <SectionRecipes className={css["section-recipes"]} />
    </div>
  );
}
