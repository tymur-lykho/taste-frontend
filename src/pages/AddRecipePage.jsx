import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipePage.module.css";

const validationSchema = Yup.object({
  title: Yup.string().required("Recipe title is required"),
  description: Yup.string().required("Description is required"),
  cookingTime: Yup.number().min(1, "Must be at least 1").required(),
  calories: Yup.number().min(0).required(),
  category: Yup.string().required(),
  ingredients: Yup.array().of(
    Yup.object({
      name: Yup.string().required(),
      amount: Yup.string().required(),
    })
  ),
  instructions: Yup.string().required(),
});

export default function AddRecipePage() {
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

          <div className={styles["general-info"]}>
            <div>
              <h2 className={styles["general-infotitle"]}>
                General Information
              </h2>

              <label>Recipe Title</label>
              <Field
                name="title"
                type="text"
                placeholder="Enter the name of your recipe"
              />
              <ErrorMessage name="title" component="div" className={styles.error} />

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
                    <option value="Soup">Soup</option>
                    <option value="Main dish">Main dish</option>
                    <option value="Dessert">Dessert</option>
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
            <h2>Ingredients</h2>
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <>
                  {values.ingredients.map((_, index) => (
                    <div
                      key={index}
                      className={styles["ingredient-row"]}
                    >
                      <div className={styles["ingredient-col"]}>
                        <label>Name</label>
                        <Field as="select" name={`ingredients[${index}].name`}>
                          <option value="">Select...</option>
                          <option value="Broccoli">Broccoli</option>
                          <option value="Tomato">Tomato</option>
                          <option value="Carrot">Carrot</option>
                        </Field>
                        <ErrorMessage
                          name={`ingredients[${index}].name`}
                          component="div"
                          className={styles.error}
                        />
                      </div>

                      <div className={styles["ingredient-col"]}>
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
                        ✖
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => push({ name: "", amount: "" })}
                    className={styles["add-btn"]}
                  >
                    Add new ingredient
                  </button>
                </>
              )}
            </FieldArray>
          </div>

          {/* Instructions */}
          <div>
            <h2>Instructions</h2>
            <Field
              as="textarea"
              name="instructions"
              placeholder="Enter a text"
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

