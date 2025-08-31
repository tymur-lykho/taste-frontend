import SearchBox from "../components/SearchBox/SearchBox";
import SectionRecipes from "../components/SectionRecipes/SectionRecipes";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div>
      {/* <Hero /> */}
      <SearchBox />
      <SectionRecipes className={css["section - recipes"]} />
    </div>
  );
}
