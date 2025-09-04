import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./RecipeForm.module.css";
import { useDispatch } from "react-redux";
import PhotoInput from "./Helpers/PhotoInput/PhotoInput.jsx";
import IngredientsInput from "./Helpers/IngredientsInput/IngredientsInput.jsx";
import CategoryInput from "./Helpers/CategoryInput/CategoryInput.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const initialValues = {
  thumb: null,
  title: "",
  description: "",
  cookingTime: "",
  calories: "",
  category: "",
  ingredients: [],
  instructions: "",
};

const validationSchema = Yup.object({
  thumb: Yup.mixed()
    .test("fileSize", "File too large", (value) => {
      return value && value.size <= 2 * 1024 * 1024;
    })
    .test("fileFormat", "Unsupported format", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
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
  category: Yup.string().required("Category is required"),
  ingredients: Yup.array()
    .of(
      Yup.object({
        id: Yup.string().required(),
        measure: Yup.string()
          .min(1, "Enter valid amount")
          .required("Amount is required"),
      })
    )
    .min(1, "Please add at least one ingredient"),
  instructions: Yup.string()
    .min(10, "Instructions must be at least 10 characters long")
    .required("Instructions are required"),
});

const post = async (data) => {
  try {
    console.log(data.thumb, "photo");
    toast.loading("load", { id: "post" });
    const res = await axios.post("/recipes", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res);
    toast.success("Done", { id: "post" });
  } catch (error) {
    console.log(error);
    toast.error("Error", { id: "post" });
  }
};

const chatGPTpost = async (values, { resetForm }) => {
  try {
    const formData = new FormData();
    console.log(values.thumb, "photo");
    // Додаємо текстові поля
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("time", values.cookingTime.toString());
    formData.append("calories", values.calories.toString());
    formData.append("category", values.category);
    formData.append("instructions", values.instructions);

    // Додаємо інгредієнти, якщо це масив
    if (values.ingredients) {
      formData.append("ingredients", JSON.stringify(values.ingredients));
    }

    // Додаємо фото, якщо воно є
    if (values.photo) {
      formData.append("thumb", values.thumb);
    }

    console.log(formData.get("thumb"));

    // Відправляємо на бекенд
    const res = await axios.post("/recipes", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(res);
    resetForm();
    toast.success("Recipe uploaded!", { id: "post" });
  } catch (error) {
    console.error(error);
    toast.error("Upload failed", { id: "post" });
  }
};

export default function RecipeForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      // onSubmit={(values, { resetForm }) => {
      //   const payload = {
      //     title: values.title,
      //     description: values.description,
      //     time: values.cookingTime,
      //     calories: values.calories,
      //     category: values.category,
      //     instructions: values.instructions,
      //     ingredients: values.ingredients,
      //   };
      //   post(payload);
      // }}
      onSubmit={chatGPTpost}
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
                <CategoryInput key={"category"} styles={styles} />
              </div>
            </div>

            <PhotoInput name={"thumb"} />
          </div>

          {/* Ingredients */}
          <IngredientsInput values={values} />

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
        </Form>
      )}
    </Formik>
  );
}
