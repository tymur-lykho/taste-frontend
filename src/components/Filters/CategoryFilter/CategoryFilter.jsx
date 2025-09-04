import { useDispatch, useSelector } from "react-redux";
import {
  selectFilterData,
  selectSelectedCategories,
} from "../../../redux/filters/selectors";
import Select from "react-select";
import { setCategories } from "../../../redux/filters/slice";
import css from "./CategoryFilter.module.css";
import { customStyles } from "../selectStyles";

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const { categories } = useSelector(selectFilterData);
  const selectedCategories = useSelector(selectSelectedCategories);

  const selectedCategory = categories.find(
    (cat) => cat._id === selectedCategories
  );

  const handleChangeCategory = (selectedOption) => {
    dispatch(setCategories(selectedOption ? selectedOption.value : undefined));
  };

  return (
    <Select
      className={css.select}
      options={categories.map((cat) => ({
        value: cat._id,
        label: cat.name,
      }))}
      value={
        selectedCategory
          ? { value: selectedCategory._id, label: selectedCategory.name }
          : null
      }
      styles={customStyles}
      placeholder="Category..."
      onChange={handleChangeCategory}
    />
  );
}
