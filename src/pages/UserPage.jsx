import { useParams, Navigate } from "react-router-dom";

import SectionRecipes from "../components/SectionRecipes/SectionRecipes";
import ProfileNavigation from "../components/ProfileNavigation/ProfileNavigation";

export default function ProfilePage() {
  const { recipeType } = useParams();

  // ✅ захист від неправильних роутів
  if (recipeType !== "own" && recipeType !== "favorites") {
    return <Navigate to="/profile/own" replace />;
  }
  return (
    <>
      {/* <ProfileNavigation /> */}
      <SectionRecipes type={recipeType} />
    </>
  );
}
