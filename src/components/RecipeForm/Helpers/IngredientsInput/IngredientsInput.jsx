import { Field, FieldArray } from "formik";
import styles from "./IngredientsInput.module.css";
import { useSelector } from "react-redux";
import { selectFilterData } from "../../../../redux/filters/selectors";
import Icon from "../../../../reuseable/Icon/Icon";

export default function IngredientsInput({ values }) {
  const { ingredients } = useSelector(selectFilterData);

  return (
    <div className={styles.ingredients}>
      <h2 className={styles["title-inf"]}>Ingredients</h2>
      <FieldArray name="ingredients">
        {({ push, remove }) => (
          <div>
            <div className={styles["ingredient-row"]}>
              <div className={styles["ingredient-col"]}>
                <label className={styles.label}>Name</label>
                <Field as="select" name="currentIngredientName">
                  <option value="">Select...</option>
                  {ingredients.map((ing) => {
                    return (
                      <option key={ing._id} value={ing._id}>
                        {ing.name}
                      </option>
                    );
                  })}
                </Field>
              </div>

              <div className={styles["ingredient-col-amount"]}>
                <label className={styles.label}>Amount</label>
                <Field
                  name="currentIngredientAmount"
                  type="text"
                  placeholder="100g"
                />
              </div>
            </div>

            <div className={styles["ingredient-actions"]}>
              <button
                type="button"
                className={styles["add-btn"]}
                onClick={() => {
                  if (
                    values.currentIngredientName !== "" &&
                    values.currentIngredientAmount !== ""
                  ) {
                    push({
                      id: values.currentIngredientName,
                      measure: values.currentIngredientAmount,
                    });
                  }
                }}
              >
                Add new Ingredient
              </button>
            </div>

            {values.ingredients.length > 0 && (
              <table className={styles.ingredientTable}>
                <thead>
                  <tr>
                    <th>Name:</th>
                    <th>Amount:</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {values.ingredients.map((ingredient, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {
                            ingredients.find((ing) => ing._id === ingredient.id)
                              .name
                          }
                        </td>
                        <td>{ingredient.measure}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className={styles["remove-btn"]}
                          >
                            <Icon
                              className={styles.deleteIcon}
                              iconName={"icon-delete"}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </FieldArray>
    </div>
  );
}
