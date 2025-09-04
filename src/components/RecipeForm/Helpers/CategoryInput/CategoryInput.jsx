import { useSelector } from "react-redux";
import { selectFilterData } from "../../../../redux/filters/selectors";
import { Field } from "formik";

export default function CategoryInput({ styles }) {
  const { categories } = useSelector(selectFilterData);

  return (
    <div>
      <label className={styles.label}>Category</label>
      <Field
        as="select"
        name="category"
        className={styles.select}
        placeholder="Category..."
      >
        <option value={""}>Select ...</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </Field>
    </div>
  );
}
