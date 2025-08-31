import { useParams, Navigate } from "react-router-dom";

import SectionRecipes from "../components/SectionRecipes/SectionRecipes";

export default function ProfilePage() {
  const { recipeType } = useParams();

  // ✅ захист від неправильних роутів
  if (recipeType !== "own" && recipeType !== "favorites") {
    return <Navigate to="/profile/own" replace />;
  }
  return (
    <>
      <SectionRecipes type={recipeType} />
    </>
  );
}
