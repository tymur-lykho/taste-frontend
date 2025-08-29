import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { setIngredients } from "../../../redux/filters/slice";
import {
  selectFilterData,
  selectSelectedIngredients,
} from "../../../redux/filters/selectors";
import { fetchFilteredRecipes } from "../../../redux/filters/operations";
import { useSearchParams } from "react-router-dom";

const IngredientsSelect = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(selectFilterData);
  const selectedIngredients = useSelector(selectSelectedIngredients);
  const [searchParams, setSearchParams] = useSearchParams();

  const options = ingredients.map((ing) => ({
    value: ing._id,
    label: ing.name,
  }));

  const value = options.filter((option) =>
    selectedIngredients.includes(option.value)
  );

  const handleChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];

    const newUrlParams = new URLSearchParams(searchParams);
    if (values.length) {
      newUrlParams.set("ingredients", values.join(","));
    } else {
      newUrlParams.delete("ingredients");
    }
    dispatch(setIngredients(values));
    setSearchParams(newUrlParams);
    dispatch(fetchFilteredRecipes());
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      isMulti
      placeholder="Select ingredients..."
    />
  );
};

export default IngredientsSelect;
