import Container from "../components/Container";
import RecipeForm from "../components/RecipeForm";
import { useSelector } from "react-redux";
import { selectCategories, selectIngredients } from "../redux/filters/selectors";

export default function AddRecipePage() {
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);

  return (
    <Container title="Add Recipe">
      <RecipeForm categories={categories} ingredients={ingredients} />
    </Container>
  );
}
