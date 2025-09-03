import { useSelector, useDispatch } from "react-redux";
import { setIngredients } from "../../../redux/filters/slice";
import { useMemo } from "react";
import {
  selectFilterData,
  selectSelectedIngredients,
} from "../../../redux/filters/selectors";
import css from "./IngredientsFilter.module.css";
import Select from "react-select";
import { customStyles } from "../selectStyles";

export default function IngredientsFilter() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(selectFilterData);
  const selectedIngredient = useSelector(selectSelectedIngredients); 

  const options = useMemo(
    () => ingredients.map((ing) => ({ value: ing._id, label: ing.name })),
    [ingredients]
  );

  const value = options.find((opt) => opt.value === selectedIngredient);

  const handleChange = (selectedOption) => {
    dispatch(setIngredients(selectedOption?.value || null));
  };

  return (
    <Select
      className={css.select}
      options={options}
      value={value}
      onChange={handleChange}
      placeholder="Ingredients..."
      styles={customStyles}
    />
  );
}
