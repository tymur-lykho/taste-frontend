import { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterData } from "../redux/filters/selectors.js";
import Select from "react-select";
import { customStyles } from "../components/Filters/selectStyles.js";

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
  const [selectedCategories, setCategories] = useState("");
  // const [ingredients, setIngredients] = useState([]);
  const [status, setStatus] = useState(null);

  const dispatch = useDispatch();
  const { categories, ingredients } = useSelector(selectFilterData);

  const selectedCategory = categories.find(
    (cat) => cat._id === selectedCategories
  );

  const handleChangeCategory = (selectedOption) => {
    dispatch(setCategories(selectedOption ? selectedOption.value : undefined));
  };

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
        ingredients: [],
        instructions: "",
        currentIngredientName: "",
        currentIngredientAmount: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const payload = {
            title: values.title,
            description: values.description,
            cookingTime: values.cookingTime,
            calories: values.calories,
            category: values.category,
            instructions: values.instructions,
            ingredients: values.ingredients,
          };

          const res = await fetch("/api/recipes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            throw new Error("Failed to submit recipe");
          }

          const data = await res.json();
          console.log("Recipe saved:", data);

          setStatus({ success: "Recipe successfully published!" });
          resetForm();
        } catch (error) {
          console.error(error);
          setStatus({ error: "Something went wrong. Try again." });
        }
      }}
    >
      {({ values }) => (
        <Form className={styles.form}>
          <h1 className={styles.title}>Add Recipe</h1>

          <div className={styles["general-info"]}>
            <div>
              <h2 className={styles["title-inf-gen"]}>General Information</h2>

              <label className={styles.label}>Recipe Title</label>
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

              <label className={styles.label}>Recipe Description</label>
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
                <label className={styles.label}>Cooking time in minutes</label>
                <Field name="cookingTime" type="number" placeholder="10" />
                <ErrorMessage
                  name="cookingTime"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles["two-cols"]}>
                <div>
                  <label className={styles.label}>Calories</label>
                  <Field name="calories" type="number" placeholder="150" />
                  <ErrorMessage
                    name="calories"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div>
                  <label className={styles.label}>Category</label>
                  <Select
                    className={styles.select}
                    options={categories.map((cat) => ({
                      value: cat._id,
                      label: cat.name,
                    }))}
                    value={
                      selectedCategory
                        ? {
                            value: selectedCategory._id,
                            label: selectedCategory.name,
                          }
                        : null
                    }
                    styles={customStyles}
                    placeholder="Category..."
                    onChange={handleChangeCategory}
                  />
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
              {({ push, remove }) => (
                <div>
                  <div className={styles["ingredient-row"]}>
                    <div className={styles["ingredient-col"]}>
                      <label className={styles.label}>Name</label>
                      <Field as="select" name="currentIngredientName">
                        <option value="">Select...</option>
                        {ingredients.map((ing) => (
                          <option key={ing.id} value={ing.name}>
                            {ing.name}
                          </option>
                        ))}
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
                          values.currentIngredientName &&
                          values.currentIngredientAmount
                        ) {
                          push({
                            name: values.currentIngredientName,
                            amount: values.currentIngredientAmount,
                          });
                        }
                      }}
                    >
                      Add new Ingredient
                    </button>
                  </div>

                  {values.ingredients.length > 0 && (
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
                  )}
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
              className={styles.instruction}
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

          {/* повідомлення про результат */}
          {status?.success && (
            <div className={styles.success}>{status.success}</div>
          )}
          {status?.error && <div className={styles.error}>{status.error}</div>}
        </Form>
      )}
    </Formik>
  );
}
