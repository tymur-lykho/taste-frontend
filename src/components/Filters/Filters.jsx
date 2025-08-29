import { useDispatch, useSelector } from "react-redux";
import {
  selectFilterData,
  selectSelectedCategories,
} from "../../redux/filters/selectors";
import css from "./Filters.module.css";
import Select from "react-select";
import { setCategories } from "../../redux/filters/slice";
import { fetchFilteredRecipes } from "../../redux/filters/operations";
import { useSearchParams } from "react-router-dom";
import IngredientsSelect from "./IngredientsSelect/IngredientsSelect";

export default function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { categories, ingredients, areas } = useSelector(selectFilterData);
  const selectedCategories = useSelector(selectSelectedCategories);

  const selectedCategory = categories.find(
    (cat) => cat._id === selectedCategories
  );

  const handleChangeCategory = (selectedOption) => {
    const newUrlParams = new URLSearchParams(searchParams);
    if (selectedOption) {
      newUrlParams.set("category", selectedOption.value);
    } else {
      newUrlParams.delete("category");
    }
    setSearchParams(newUrlParams);
    dispatch(setCategories(selectedOption ? selectedOption.value : undefined));
    dispatch(fetchFilteredRecipes());
    console.log("🚀 ~ selectedOption ~ dispatch:", selectedOption);
  };

  return (
    <div>
      <div>
        <label>Category</label>
        <Select
          options={categories.map((cat) => ({
            value: cat._id,
            label: cat.name,
          }))}
          value={
            selectedCategory
              ? { value: selectedCategory._id, label: selectedCategory.name }
              : null
          }
          onChange={handleChangeCategory}
        />
      </div>
      <div>
        <IngredientsSelect />
      </div>
    </div>
  );
}
