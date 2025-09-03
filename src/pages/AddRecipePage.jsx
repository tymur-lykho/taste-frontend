import Container from "../reuseable/Container/Container";
import RecipeForm from "../components/RecipeForm/RecipeForm";
// import { useSelector } from "react-redux";
// import {
//   selectCategories,
//   selectIngredients,
// } from "../redux/filters/selectors";

export default function AddRecipePage() {
  // const categories = useSelector(selectCategories);
  // const ingredients = useSelector(selectIngredients);

  return (
    <Container title="Add Recipe">
      <RecipeForm />
    </Container>
  );
}
