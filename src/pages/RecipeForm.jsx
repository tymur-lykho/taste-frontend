import { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipePage.module.css";

import { useSelector, useDispatch } from "react-redux";
import { selectCategories, selectIngredients } from "../redux/filters/selectors";
import { fetchFilters } from "../redux/filters/operations";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters long")
    .required("Recipe title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters long")
    .required("Description is required"),
  cookingTime: Yup.number()
    .typeError("Cooking time must be a number")
    .min(1, "Must be at least 1 minute")
    .max(1440, "Cannot exceed 24 hours")
    .required("Cooking time is required"),
  calories: Yup.number()
    .typeError("Calories must be a number")
    .min(0, "Calories cannot be less than 0")
    .max(5000, "Too many calories :)")
    .required("Calories are required"),
  category: Yup.string()
    .required("Category is required"),
  ingredients: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Ingredient name is required"),
        amount: Yup.string().min(1, "Enter valid amount").required("Amount is required"),
      })
    )
    .min(1, "Please add at least one ingredient"),
  instructions: Yup.string()
    .min(10, "Instructions must be at least 10 characters long")
    .required("Instructions are required"),
});

export default function AddRecipeForm() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);

  const [status, setStatus] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchFilters());
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        cookingTime: "",
        calories: "",
        category: "",
        ingredients: [],
        instructions: "",
        currentIngredientName: "",
        currentIngredientAmount: "",
        photo: null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          // Виклик redux-операції для відправки даних
          // dispatch(addRecipe(values));

          console.log("Recipe data to submit:", values);
          setStatus({ success: "Recipe successfully published!" });
          resetForm();
          setPreview(null);
        } catch (error) {
          console.error(error);
          setStatus({ error: "Something went wrong. Try again." });
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.form}>
          <h1 className={styles.title}>Add Recipe</h1>

          {/* General Information */}
          <fieldset className={styles.fieldset}>
            <legend>General Information</legend>

            <label className={styles.formLabel}>Recipe Title</label>
            <Field name="title" type="text" className={styles.formInput} />
            <ErrorMessage name="title" component="div" className={styles.error} />

            <label className={styles.formLabel}>Description</label>
            <Field as="textarea" name="description" className={styles.formTextarea} />
            <ErrorMessage name="description" component="div" className={styles.error} />

            <label className={styles.formLabel}>Cooking Time (minutes)</label>
            <Field name="cookingTime" type="number" className={styles.formInput} />
            <ErrorMessage name="cookingTime" component="div" className={styles.error} />

            <label className={styles.formLabel}>Calories</label>
            <Field name="calories" type="number" className={styles.formInput} />
            <ErrorMessage name="calories" component="div" className={styles.error} />

            <label className={styles.formLabel}>Category</label>
            <Field as="select" name="category" className={styles.formSelect}>
              <option value="">Select...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </Field>
            <ErrorMessage name="category" component="div" className={styles.error} />
          </fieldset>

          {/* Photo Upload */}
          <fieldset className={styles.fieldset}>
            <legend>Upload Photo</legend>
            <label htmlFor="photo-upload" className={styles.uploadBox}>
              {preview ? (
                <img src={preview} alt="preview" className={styles.previewImg} />
              ) : (
                <span className={styles.plus}>+</span>
              )}
            </label>
            <input
              id="photo-upload"
              name="photo"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                setFieldValue("photo", file);
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setPreview(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </fieldset>

          {/* Ingredients */}
          <fieldset className={styles.fieldset}>
            <legend>Ingredients</legend>
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <div>
                  <div className={styles.ingredientRow}>
                    <div className={styles.ingredientCol}>
                      <label className={styles.formLabel}>Name</label>
                      <Field as="select" name="currentIngredientName" className={styles.formSelect}>
                        <option value="">Select...</option>
                        {ingredients.map((ing) => (
                          <option key={ing.id} value={ing.name}>{ing.name}</option>
                        ))}
                      </Field>
                    </div>
                    <div className={styles.ingredientColAmount}>
                      <label className={styles.formLabel}>Amount</label>
                      <Field
                        name="currentIngredientAmount"
                        type="text"
                        placeholder="100g"
                        className={styles.formInput}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.addBtn}
                    onClick={() => {
                      if (values.currentIngredientName && values.currentIngredientAmount) {
                        push({
                          name: values.currentIngredientName,
                          amount: values.currentIngredientAmount,
                        });
                      }
                    }}
                  >
                    Add new Ingredient
                  </button>

                  {values.ingredients.length > 0 && (
                    <table className={styles.ingredientTable}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Amount</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.ingredients.map((ingredient, index) => (
                          <tr key={index}>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.amount}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className={styles.removeBtn}
                              >
                                🗑
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </FieldArray>
          </fieldset>

          {/* Instructions */}
          <fieldset className={styles.fieldset}>
            <legend>Instructions</legend>
            <Field as="textarea" name="instructions" className={styles.formTextarea} />
            <ErrorMessage name="instructions" component="div" className={styles.error} />
          </fieldset>

          <button type="submit" className={styles.submitBtn}>Publish Recipe</button>

          {status?.success && <div className={styles.success}>{status.success}</div>}
          {status?.error && <div className={styles.error}>{status.error}</div>}
        </Form>
      )}
    </Formik>
  );
}
