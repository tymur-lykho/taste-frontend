import { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipePage.module.css";

// Validation schema
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
    .oneOf(["Soup", "Main dish", "Dessert"], "Select a valid category")
    .required("Category is required"),
  ingredients: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Ingredient name is required"),
        amount: Yup.string()
          .min(1, "Enter valid amount")
          .required("Amount is required"),
      })
    )
    .min(1, "Please add at least one ingredient"),
  instructions: Yup.string()
    .min(10, "Instructions must be at least 10 characters long")
    .required("Instructions are required"),
});

export default function AddRecipePage() {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, ingredientsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/ingredients"),
        ]);
        const categoriesData = await categoriesRes.json();
        const ingredientsData = await ingredientsRes.json();
        setCategories(categoriesData);
        setIngredients(ingredientsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        cookingTime: "",
        calories: "",
        category: "",
        ingredients: [{ name: "", amount: "" }],
        instructions: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form data:", values);
      }}
    >
      {({ values }) => (
        <Form className={styles.form}>
          <h1 className={styles.title}>Add Recipe</h1>

          {/* General Info */}
          <div className={styles["general-info"]}>
            <div>
              <h2 className={styles["title-inf-gen"]}>General Information</h2>

              <label>Recipe Title</label>
              <Field
                name="title"
                type="text"
                placeholder="Enter the name of your recipe"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={styles.error}
              />

              <label>Recipe Description</label>
              <Field
                as="textarea"
                name="description"
                placeholder="Enter a brief description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className={styles.error}
              />

              <div>
                <label>Cooking time in minutes</label>
                <Field name="cookingTime" type="number" placeholder="10" />
                <ErrorMessage
                  name="cookingTime"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles["two-cols"]}>
                <div>
                  <label>Calories</label>
                  <Field name="calories" type="number" placeholder="150" />
                  <ErrorMessage
                    name="calories"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div>
                  <label>Category</label>
                  <Field as="select" name="category">
                    <option value="">Select...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className={styles["uploadphoto-title"]}>Upload Photo</h2>
              <div className={styles["photo-upload"]}>📷</div>
            </div>
          </div>

          {/* Ingredients */}
          <div className={styles.ingredients}>
            <h2 className={styles["title-inf"]}>Ingredients</h2>
            <FieldArray name="ingredients">
              {({ push, remove, form: { values } }) => (
                <div>
                  {values.ingredients.map((ingredient, index) => (
                    <div key={index} className={styles["ingredient-row"]}>
                      <div className={styles["ingredient-col"]}>
                        <label>Name</label>
                        <Field as="select" name={`ingredients[${index}].name`}>
                          <option value="">Select...</option>
                          {ingredients.map((ing) => (
                            <option key={ing.id} value={ing.name}>
                              {ing.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name={`ingredients[${index}].name`}
                          component="div"
                          className={styles.error}
                        />
                      </div>
                      <div className={styles["ingredient-col-amount"]}>
                        <label>Amount</label>
                        <Field
                          name={`ingredients[${index}].amount`}
                          type="text"
                          placeholder="100g"
                        />
                        <ErrorMessage
                          name={`ingredients[${index}].amount`}
                          component="div"
                          className={styles.error}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className={styles["remove-btn"]}
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className={styles["add-btn"]}
                    onClick={() => push({ name: "", amount: "" })}
                  >
                    Add new Ingredient
                  </button>

                  {/* Таблиця інгредієнтів */}
                  <table className={styles["ingredient-table"]}>
                    <thead>
                      <tr>
                        <th>Name:</th>
                        <th>Amount:</th>
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
                              className={styles["remove-btn"]}
                            >
                              🗑
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </FieldArray>
          </div>

          {/* Instructions */}
          <div>
            <h2>Instructions</h2>
            <Field
              as="textarea"
              name="instructions"
              placeholder="Enter instructions"
            />
            <ErrorMessage
              name="instructions"
              component="div"
              className={styles.error}
            />
          </div>

          <button type="submit" className={styles["submit-btn"]}>
            Publish Recipe
          </button>
        </Form>
      )}
    </Formik>
  );
}
